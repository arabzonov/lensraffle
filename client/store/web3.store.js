import { ethers, utils } from "ethers";
import { defineStore } from "pinia";
import dayjs from 'dayjs';
import { userStore } from '@/store/user.store'
import { lensClient } from '@/api/lens'
import bcConfig_all from '../../bcConfig_all.json';
const bcConfig = bcConfig_all[CHAIN_ID]

////console.log(bcConfig)

export const rpc = new ethers.providers.JsonRpcProvider(CHAIN_RPC_URL, CHAIN_ID)

export const web3Store = defineStore("web3", {	
	state: () => ({		
		web3Modal: null,		
        wallet: {
            address: null,
            signer: null,
            chainId: null
        },
        network: {
            id: CHAIN_ID,
            name: CHAIN_NAME,            
            explorerUrl: CHAIN_EXPLORER_URL,
            symbol: CHAIN_CURRENCY,
            isMain: IS_MAIN_CHAIN
        },
        //rpc, 
        bcConfig: bcConfig,
        timestamp: parseInt(dayjs().valueOf() / 1000),       
        hubConfig: null,        
	}),

	getters: {        	
		account(state) {
			return { 
                ...state.wallet,
                chainValid: state.wallet.chainId === state.network.id 
            };
		},        
        chain(state) {
            return {
                ...state.network,
                rpc: new ethers.providers.JsonRpcProvider(CHAIN_RPC_URL, CHAIN_ID)
            }
		},  
        lensHub(state) {
            return {
                instance: new ethers.Contract(bcConfig.lensHub.address, bcConfig.lensHub.abi, rpc),
                address: bcConfig.lensHub.address,                
            }
        },   
        
        lotteryHub() {
            return {
                instance: new ethers.Contract(bcConfig.lotteryHub.address, bcConfig.lotteryHub.abi, rpc),
                address: bcConfig.lotteryHub.address,
            } 
        },
       
        paymentToken() {
            return {
                instance: new ethers.Contract(bcConfig.paymentToken.address, bcConfig.paymentToken.abi, rpc),
                symbol: bcConfig.paymentToken.symbol,
                decimals: bcConfig.paymentToken.decimals
            } 
        },
                                   
	},

    actions: {
        
        setWeb3Modal(web3Modal) {
            //////console.log(`setWeb3`, web3);
            this.web3Modal = web3Modal
        },

        async updateTimestamp() {
            try {
                //const blockNum = await rpc.getBlockNumber();					
			    //const block = await rpc.getBlock(blockNum);
                this.timestamp = parseInt(dayjs().valueOf() / 1000)  // block.timestamp
            } catch (error) {
                ////console.log(error)
            }            
        },

        async increaseTime(secondsToGo) {
            await rpc.send('evm_increaseTime', [secondsToGo]);
            await rpc.send('evm_mine');
            this.updateTimestamp()	
        },

        async signMessage(msg) {
            return await this.wallet.signer.signMessage(msg)
        },
        
        async connect() {
            //////console.log(`connect`);
            try {
                const providerWeb3 = await this.web3Modal.connect();          
                this.wallet.provider = new ethers.providers.Web3Provider(providerWeb3, "any")
                this.wallet.signer = await this.wallet.provider.getSigner()
                
                const network = await this.wallet.provider.getNetwork()
            
                this.wallet.chainId = parseInt(network.chainId) 
                
                const accounts = await this.wallet.provider.listAccounts()
                
                if (accounts.length > 0) {                
                    this.wallet.address = accounts[0]     
                    
                    if (await lensClient.authentication.isAuthenticated()) {
                        await userStore().getProfile()	
                    } 
                } else {
                    this.disconnect()
                }
                
                providerWeb3.on("connect", async (info) => {
                    //////console.log(`providerWeb3.on connect`, info);                
                    this.wallet.chainId = parseInt(info.chainId)                
                });
        
                providerWeb3.on("accountsChanged", async (accounts) => { 
                    console.log(`providerWeb3.on accountsChanged`, accounts);       
                    
                    if (this.wallet.address) {
                        await this.disconnect()
                        await userStore().logout()
                    }
                    if (accounts.length > 0) {
                        this.wallet.address = accounts[0]  
                        //if (await lensClient.authentication.isAuthenticated()) {
                        //    await userStore().getProfile()	
                        //}                         
                    }      
                });
        
                providerWeb3.on("chainChanged", async (chainId) => {
                    //////console.log(`providerWeb3.on chainChanged`, this.wallet.chainId, parseInt(chainId));
                    this.wallet.chainId = parseInt(chainId)            
                });
        
                providerWeb3.on("network", (newNetwork, oldNetwork) => {
                    // https://github.com/ethers-io/ethers.js/issues/866
                    // When a Provider makes its initial connection, it emits a "network"
                    // event with a null oldNetwork along with the newNetwork. So, if the
                    // oldNetwork exists, it represents a changing network
                    //////console.log(`providerWeb3.on network`, newNetwork, oldNetwork);                
                });    
            } catch (error) {
                console.log(`connect error`, error);
                this.disconnect()
            }
            
        },

        async disconnect() { 
            //////console.log(`disconnect`);
            this.wallet.address = null
            this.wallet.signer = null
            this.wallet.chainId = null                           
            try {
                await this.web3Modal.clearCachedProvider();
                //localStorage.clear(); 
            } catch (error) {
                //console.error(error)
            } 
                             
        },
    },
});
