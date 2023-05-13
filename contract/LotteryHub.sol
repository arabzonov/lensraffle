// SPDX-License-Identifier: none

pragma solidity ^0.8.19;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

import "hardhat/console.sol";

interface ILensHub {
    struct EIP712Signature {
        uint8 v;
        bytes32 r;
        bytes32 s;
        uint256 deadline;
    }
    struct FollowWithSigData {
        address follower;
        uint256[] profileIds;
        bytes[] datas;
        EIP712Signature sig;
    }
    function getFollowNFT(uint256 profileId) external view returns (address);
    function followWithSig(FollowWithSigData calldata vars) external returns (uint256[] memory);    
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function balanceOf(address account) external view returns (uint256);    
}

contract LotteryHub is Ownable, VRFConsumerBaseV2 {    
    struct Config { 
        uint256 minPrize;   
        uint8 maxWinners;      
        uint32 minDuration; 
        uint32 maxDuration;           
        uint64 vrfSubscriptionId;   
        uint32 vrfCallbackGasLimit;
        bytes32 vrfKeyHash; // see https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#configurations
        uint16 vrfRequestConfirmations;
        uint8 vrfNumWords;
    }
    
    struct Lottery {
        uint256 prize; 
        uint256 winners; 
        uint256 maxParticipants;   
        uint32 duration;
        uint32 startTimestamp;   
        uint32 completedTimestamp; 
    }
    
    ILensHub public lensHub;    
    Config public config;
    mapping(uint256 => Lottery) public lotteries;  
    mapping(uint256 => address[]) public lotteryParticipants; 
    mapping(uint256 => mapping(address => bool)) public lotteryParticipantsEntrances;   
    uint256 public serviceFee;

    struct RequestStatus {
        uint256 profileId;
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists        
    }
    mapping(uint256 => RequestStatus) public requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface vrfCoordinator;
                           
    // --------------------- CONSTRUCT ---------------------
    
    constructor(
        ILensHub lensHub_, 
        uint256 serviceFee_,
        address vrfCoordinator_,
        Config memory config_    
    ) VRFConsumerBaseV2(vrfCoordinator_) {
        lensHub = lensHub_;
        setConfig(config_);
        setServiceFee(serviceFee_);
        vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinator_);
    }

    function setConfig(Config memory config_) public onlyOwner {   
        config = config_;                     
        _emitEvent(EventCode.CONFIG, abi.encode(config));                   
	}

    function setServiceFee(uint256 serviceFee_) public onlyOwner {   
        serviceFee = serviceFee_;                     
        _emitEvent(EventCode.SERVICE_FEE, abi.encode(serviceFee));                   
	}
    
    // --------------------- PUBLIC ---------------------

    function aggregatedData() public view returns (
        Config memory _config,
        uint256 _serviceFee       
	) {
        _config = config;
        _serviceFee = serviceFee;
	}
    
    function start(uint256 profileId_, Lottery calldata lottery_) public payable {
        require(lensHub.ownerOf(profileId_) == msg.sender, "Not own profile");

        require(lottery_.duration >= config.minDuration, "Min duration");
        require(lottery_.duration <= config.maxDuration, "Max duration");
        require(msg.value == lottery_.prize + serviceFee, "Wrong amount supplied");

        require(lottery_.winners <= config.maxWinners, "Max winners");
        require(lottery_.winners >= 1, "Min winners");
        
        if (lottery_.maxParticipants != 0) {
            require(lottery_.maxParticipants >= lottery_.winners, "Max participants");
        }
                                        
        Lottery storage lottery = lotteries[profileId_];
        require(lottery.startTimestamp == 0, "Already started");
        
        lottery.prize = lottery_.prize;    
        lottery.duration = lottery_.duration;   
        lottery.winners = lottery_.winners;  
        lottery.maxParticipants = lottery_.maxParticipants;   
        lottery.startTimestamp = uint32(block.timestamp);

        (bool serviceFeeSuccess, ) = payable(owner()).call{value: serviceFee }("");
        require(serviceFeeSuccess, "Service fee send error");
                                 
        _emitEvent(EventCode.STARTED, abi.encode(profileId_, lottery));
	} 

    function remove(uint256 profileId_) public {
        address profileOwner = lensHub.ownerOf(profileId_);
        require(profileOwner == msg.sender, "Not own profile");
                                               
        Lottery storage lottery = lotteries[profileId_];
        require(lottery.startTimestamp != 0, "Not started");
        require(lottery.completedTimestamp == 0, "Completed");
        require(lotteryParticipants[profileId_].length == 0, "Users entered");
        
        (bool sendSuccess, ) = payable(profileOwner).call{ value: lottery.prize }("");
        require(sendSuccess, "Funds send error");
                                 
        _emitEvent(EventCode.REMOVED, abi.encode(profileId_, lottery.startTimestamp));

        delete lotteries[profileId_];
	}
    
    function follow(ILensHub.FollowWithSigData calldata data_) external {        
        require(data_.follower == msg.sender, "Wrong sender");   
        require(lensHub.balanceOf(msg.sender) != 0, "Not own profile");  // maybe user can not have profile but can follow... 
        require(data_.profileIds.length == 1, "Wrong profileIds");  
                
        uint256 profileId = data_.profileIds[0];
        require(lensHub.ownerOf(profileId) != msg.sender, "Follow self");
                
        Lottery storage lottery = lotteries[profileId];
        require(lottery.startTimestamp != 0, "Not started");        
        require(lottery.startTimestamp + lottery.duration > block.timestamp, "Finished");

        address[] storage participants = lotteryParticipants[profileId];

        if (lottery.maxParticipants != 0) {
            require(participants.length + 1 <= lottery.maxParticipants, "Max participants");
        } 

        address followNft = lensHub.getFollowNFT(profileId);    

        if (followNft != address(0)) {
            require(ILensHub(followNft).balanceOf(msg.sender) == 0, "Already followed");
        } 
        
        require(!lotteryParticipantsEntrances[profileId][msg.sender], "Already participated in past");
        lotteryParticipantsEntrances[profileId][msg.sender] = true;

        participants.push(msg.sender);
        
        lensHub.followWithSig(data_);

        _emitEvent(EventCode.FOLLOWED, abi.encode(profileId, lottery.startTimestamp));

        if ((lottery.maxParticipants != 0 && participants.length == lottery.maxParticipants) 
            || lottery.startTimestamp + lottery.duration == block.timestamp) {
            complete(profileId);
        }
	}
    

    function fulfillRandomWords(
        uint256 requestId_,
        uint256[] memory randomWords_
    ) internal override {
        RequestStatus storage rs = requests[requestId_];
        require(rs.exists, "request not found");
        
        rs.fulfilled = true;
        uint256 randomResult = randomWords_[0];
        console.log('randomResult', randomResult); 

        uint256 profileId = rs.profileId;

        Lottery storage lottery = lotteries[profileId];
        require(lottery.startTimestamp != 0, "Not started");
        require(lottery.completedTimestamp != 0, "Not completed");

        address[] memory participants = lotteryParticipants[profileId];
        address followNft = lensHub.getFollowNFT(profileId);

        uint256 participantsNumber = participants.length;
        console.log('participantsNumber', participantsNumber);

        if (participantsNumber != 0) {
            uint256 numberOfPlaces = lottery.winners;
            // if number of participants lower than number of decided winners set winners number to participants number
            if (participantsNumber < lottery.winners){
                numberOfPlaces = participantsNumber;
            } 

            // final winners array
            address[] memory winners = new address[](numberOfPlaces);                

            // count of valid winners than following profile at this moment     
            uint256 winnersCount = 0;

            uint256 idx = 0;
            while (numberOfPlaces > 0) {                
                uint256 winNumber = uint256(keccak256(abi.encode(randomResult, idx))) % participantsNumber; // TODO
                //uint256 winNumber = (randomResult + idx) % participantsNumber;
                console.log('winNumber', winNumber); 
                address winnerAccount = participants[winNumber];
                
                // winner must follow
                if (ILensHub(followNft).balanceOf(winnerAccount) != 0) {
                    winners[winnersCount] = winnerAccount;
                    console.log('winnerAccount', winnerAccount);                    
                    winnersCount ++;
                    numberOfPlaces --;
                } 
                // exclude him from list 
                participants[winNumber] = participants[participantsNumber - 1];
                participantsNumber --;               
                console.log('participantsNumber', participantsNumber);

                if (participantsNumber == 0) {
                    numberOfPlaces = 0;
                }
                idx ++;
            }
            console.log('winnersCount', winnersCount);

            if (winnersCount != 0) {
                uint256 winAmount = lottery.prize / winnersCount;
                for (uint256 i = 0; i < winnersCount; i++) {
                    (bool winnerSuccess, ) = payable(winners[i]).call{value: winAmount }("");
                    if (winnerSuccess) {
                        lottery.prize -= winAmount;
                        _emitEvent(EventCode.REWARDED, abi.encode(profileId, lottery.startTimestamp, winners[i], winAmount));
                    } 
                }                                
            } 
        }

        if (lottery.prize != 0) {
            address creator = lensHub.ownerOf(profileId); 
            (bool creatorSuccess, ) = payable(creator).call{value: lottery.prize }("");
            if (creatorSuccess) {
                _emitEvent(EventCode.RETURNED, abi.encode(profileId, lottery.startTimestamp, creator, lottery.prize));                    
            } else {
                (bool ownerSuccess, ) = payable(owner()).call{value: lottery.prize }("");
                if (ownerSuccess) {
                    _emitEvent(EventCode.RETURNED, abi.encode(profileId, lottery.startTimestamp, owner(), lottery.prize));
                }
            }
        } 
        
        _emitEvent(EventCode.FINISHED, abi.encode(profileId, lottery.startTimestamp));

        delete lotteryParticipants[profileId];
        delete lotteries[profileId];
    }
    
    function complete(uint256 profileId_) public {       
        Lottery storage lottery = lotteries[profileId_];
                
        require(lottery.startTimestamp != 0, "Not started");
        require(lottery.completedTimestamp == 0, "Already completed");
        
        uint256 requestId = vrfCoordinator.requestRandomWords(
            config.vrfKeyHash,
            config.vrfSubscriptionId,
            config.vrfRequestConfirmations,
            config.vrfCallbackGasLimit,
            config.vrfNumWords
        );

        if (lottery.maxParticipants == 0) {
            require(lottery.startTimestamp + lottery.duration <= block.timestamp, "Not finished by duration");            
        } else {
            require(lottery.startTimestamp + lottery.duration <= block.timestamp || lotteryParticipants[profileId_].length == lottery.maxParticipants, "Not finished");
        }    
     
        requests[requestId] = RequestStatus({
            profileId: profileId_,
            exists: true,
            fulfilled: false
        });

        lottery.completedTimestamp = uint32(block.timestamp);

        _emitEvent(EventCode.COMPLETED, abi.encode(profileId_, lottery.startTimestamp));
	}

    // --------------------- TEST ---------------------

    function completeTest(uint256 profileId_, uint256 requestId) public {       
        Lottery storage lottery = lotteries[profileId_];
                
        require(lottery.startTimestamp != 0, "Not started");
        require(lottery.completedTimestamp == 0, "Already completed");

        requests[requestId] = RequestStatus({
            profileId: profileId_,
            exists: true,
            fulfilled: false
        });

        lottery.completedTimestamp = uint32(block.timestamp);

        _emitEvent(EventCode.COMPLETED, abi.encode(profileId_, lottery.startTimestamp));
	}

    function fulfillTest(
        uint256 requestId_,
        uint256[] memory randomWords_
    ) public {
        fulfillRandomWords(requestId_, randomWords_);
    }

    function recover(uint128 amount_) external onlyOwner returns (bool success) {
        (success,) = payable(owner()).call{ value: amount_ }("");
    }
    
    function _emitEvent(EventCode eventCode, bytes memory data) internal {
		emit Event(eventCode, data, tx.origin, block.timestamp);
	}
    event Event(EventCode indexed eventCode, bytes data, address indexed caller, uint256 indexed timestamp);
    enum EventCode {
        CONFIG,
        SERVICE_FEE,
        STARTED,
        REMOVED,
        FOLLOWED,
        COMPLETED,
        REWARDED,
        FINISHED,
        RETURNED                        
    }
}