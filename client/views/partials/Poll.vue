<template>    
    <div class="border rounded overflow-hidden mt-2" v-if="proposal">
        <template v-if="isLensterPoll && !hasError">
            <!-- head -->
            <div class="d-flex justify-content-between p-2 border-bottom">
                <div class="d-flex align-items-center fw-bold">  
                    <div class="fw-bold">
                        Poll
                    </div>
                    <div class="small fw-bold text-secondary ms-3">  
                        {{ proposal.scores_total }} vote{{ proposal.scores_total != 1 ? 's' : '' }}
                    </div>
                    <div class="small fw-bold text-secondary ms-3">  
                        {{ timeLeft }}
                    </div>         
                    <div class="small fw-bold text-danger ms-3" v-if="!isActive">  
                        Completed
                    </div>     
                </div>
                <div class="ms-2 text-success fw-bold" v-if="votedPosition">Your vote accepted</div>
            </div>
            <!-- choices -->
            <div class="d-flex align-items-center p-2 _choise  " :class="{ 'pointer' : isActive }" v-for="(choice, index) in proposal.choices" @click="vote(index)">
                <div class="">
                    <div class="_icon_vote me-2" :class="{ 'bg-success' : votedPosition == index + 1 }"></div>
                </div>
                <div class="w-100">
                    <div class="d-flex justify-content-between align-items-center small">                        
                        <div class="fw-bold mb-1">
                            {{ choice.capitalize() }}                        
                        </div>
                        <div class="d-flex mb-1" v-if="proposal.scores_total">
                            <div class="mx-3 text-nowrap" style="width: 3.5rem">{{ proposal.scores[index] }} vote{{ proposal.scores[index] != 1 ? 's' : '' }}</div>
                            <div class="text-end" style="width: 2.5rem">{{ votedPercent(index) }}%</div>
                        </div>
                    </div>
                    <div class="progress"  style="height: .6rem">
                        <div class="progress-bar" role="progressbar" :class="{ 'bg-success' : votedPosition == index + 1 }" aria-label="Basic example" :style="{width: `${votedPercent(index)}%`}" :aria-valuenow="votedPercent(index)" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>    
                </div>                
            </div>    
        </template>   
        <!-- not supported or error -->     
        <div class="fw-bold text-danger" v-else>            
            {{ hasError || 'Poll not supported' }}
        </div>     
    </div>
</template>

<style lang="scss" scoped>
    @import '@/scss/variables.scss';
    ._choise {
        &:hover {
            background-color: $gray-100;
        }
        ._icon_vote{
            height:1.5rem;
            width:1.5rem;
            background-color: $gray-400;
        }    
    }    
</style>

<script>	
    import { snapshotClient, SpaceDocument, SnapshotDocument } from '@/api/snapshot';	
    import { lensClient } from '@/api/lens';	
    import { Wallet } from 'ethers'
    import axios from 'axios';

	export default {
        props: {
            proposalId: { type: String }
        },
		data() {
			return {
				voter: null,
                proposal: null,
                votes: null,
                spaceId: null,
                hasError: null,
            }
		},
        mounted() {
            this.init()
        },
        computed: {
            isActive() {
                return this.$date().isBefore(this.$date.unix(this.proposal.end))
            },
            timeLeft() {
                const end = this.$date.unix(this.proposal.end)
                return `${end.toNow(true)} ${this.$date().isBefore(end) ? 'left' : 'ago'}`;
            },
            votedPercent() { 
                const self = this
                return function (index) {
                    return self.proposal.scores[index] ? parseInt(self.proposal.scores[index] / self.proposal.scores_total * 100) : 0
                }
            },
            votedPosition() {
                return this.votes[0]?.choice || 0
            },
            isLensterPoll() {
                return this.spaceId === LENSTER_POLLS_SPACE
            }
        },        
        methods: {
            async vote(index) {                
                if (!this.isActive) return
                this.gLoaderShow()                
                try {                    
                    await axios({
                        url: `${LENSTER_SNAPSHOT_RELAY_WORKER_URL}/votePoll`,
                        method: 'POST',
                        data: {
                            isMainnet: IS_MAIN_CHAIN,
                            accessToken: (await lensClient.authentication.isAuthenticated()).accessToken,
                            choice: index + 1,
                            profileId: this.$user.profile.id,
                            snapshotId: this.proposalId
                        }
                    });
                    await this.getProposal()
                } catch (error) {
                    console.log(error)
                }
                this.gLoaderHide()  
            },
            async getProposal() {
                try {
                    const snapshotResp = await snapshotClient.query({
                        query: SnapshotDocument,
                        variables: {
                            id: this.proposalId,
                            where: { voter: this.voter, proposal: this.proposalId }						
                        },
                    });
                    this.proposal = snapshotResp.data.proposal
                    this.votes = snapshotResp.data.votes    
                } catch (error) {
                    console.log('getProposal', error)
                    this.hasError = 'Poll load error'
                }                
            },
            async init() {
                try {
                    const spaceResp = await snapshotClient.query({
						query: SpaceDocument,
						variables: {
							id: this.proposalId							
						},
					});
                    this.spaceId = spaceResp.data.proposal.space.id
                    if (this.isLensterPoll) {
                        const encodedSeed = new TextEncoder().encode(`${this.$user.profile.ownedBy}${this.$user.profile.id}${this.proposalId}`);
                        const digest = await crypto.subtle.digest({ name: 'SHA-256' }, encodedSeed);
                        const privateKey = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
                        this.voter = (new Wallet(privateKey)).address                    
                        this.getProposal()
                    } else {
                        this.voter = this.$user.profile.ownedBy
                        // TODO
                    }                    
                } catch (error) {
                    console.log('poll init', error)
                    this.hasError = 'Pool init error'
                }
            },
        },
	}
</script>