<template>
	<div class="px-2 px-sm-3 py-3 mb-2 border rounded bg-white shadow-sm" v-if="lottery" :class="{ '_disabled' : locked }">		
        
        <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2" v-if="mode === 'exp' && profile">
			<div class="d-flex align-items-center small ">
				<!-- Avatar img -->
				<div class="_avatar_picture me-2">
					<img :src="$user.profilePictureUrl(profile?.picture?.original?.url)">
				</div>
				
				<!-- PubId / profile -->
				<div class="d-flex flex-column justify-content-center align-items-center me-2">
					<div v-if="mode === 'exp' && profile" class="align-self-start">
						{{ profile.name }} 						
						<a :href="`${lensterUrl}u/${profile.handle}`" class="text-dark text-decoration-none fw-bold d-flex align-items-center" target="_blank">{{ profile.handle }} </a>
					</div>					
				</div>
			</div>

			<!-- Follower Actions -->
			<div v-if="!locked" class=" align-self-center">
				
                <button type="button" class="btn btn-primary btn-sm ms-2" @click="follow()" v-if="!isPartisipated && !profile.isFollowedByMe && item.isEligible">
                    Follow and participate
                </button>

                <button type="button" class="btn btn-primary btn-sm ms-2" @click="unfollow()" v-if="false && profile.isFollowedByMe">
                    Unfollow
                </button>	
                
                <div class="fw-bold text-secondary" v-if="!isPartisipated && !item.isEligible">
                    NOT ELIGIBLE
                </div>

                <div class="fw-bold text-info" v-if="!isPartisipated && item.isEligible && profile.isFollowedByMe">
                    FOLLOWED
                </div>

                <div class="fw-bold text-success" v-if="isPartisipated">
                    PARTICIPATED
                </div>
                
                <button type="button" class="btn btn-primary btn-sm ms-2 " @click="complete()" v-if="!isRemoveAllowed && isAwaitingCompletion">
                    Complete
                </button>
			</div>
			
			<span v-else class="text-secondary">
				Confirming...
			</span>
		</div>

        <div class="d-flex justify-content-between align-items-center mb-2 " v-if="lottery.lotteryId">
            <div class="d-flex align-items-center">
                <a :href="`${$location.origin}/lottery?id=${lottery.lotteryId}`" class="text-decoration-none d-flex align-items-center fw-bold" target="_blank">{{ lottery.lotteryId }}</a>						
                <div class="_icon_copy bg-secondary mx-2 pointer" @click.prevent="gCopyToClipboard(`${$location.origin}/lottery?id=${lottery.lotteryId}`)" title="Click to copy lottery link"></div>
            </div>

            <div class="d-flex align-items-center">
                <!-- Pub status -->
                <div class="d-flex align-items-center text-center">
                    <div class="rounded-pill text-success bg-success bg-opacity-10 p-2" v-if="isRunning">
                        <span class="d-none d-sm-block text-uppercase fw-bold">Running</span>
                        <div class="_icon_play _icon_btn bg-success d-block d-sm-none"></div>
                    </div>

                    <div class="rounded-pill text-warning bg-warning bg-opacity-10 p-2" v-if="isAwaitingCompletion">
                        <span class="d-none d-sm-block text-uppercase fw-bold">Awaiting for completion</span>
                        <div class="_icon_timeout _icon_btn bg-warning d-block d-sm-none"></div>
                    </div>

                    <div class="rounded-pill text-info bg-info bg-opacity-10 p-2" v-if="isCompleted">
                        <span class="d-none d-sm-block text-uppercase fw-bold">Determining winners</span>
                        <div class="_icon_timeout _icon_btn bg-info d-block d-sm-none"></div>
                    </div>

                    <div class="rounded-pill text-danger bg-danger bg-opacity-10 p-2 " v-if="isFinished">
                        <span class="d-none d-sm-block text-uppercase fw-bold">Finished</span>
                        <div class="_icon_timeout _icon_btn bg-danger d-block d-sm-none"></div>
                    </div>
                </div>	
                
                <button type="button" class="btn btn-danger btn-sm ms-2" @click="remove()" v-if="mode === 'my' && profile && isRemoveAllowed">
                    {{ locked ? 'Confirming...' : 'Remove' }}
                </button>
            </div>
        </div>

        <div class="text-end mb-2 " v-if="!lottery.lotteryId">
            Confirming...
        </div>

        

        <div>
            <div>
                Started: {{ $date.unix(lottery.startTimestamp).format('DD MMM YYYY HH:mm') }} for {{ lottery.duration }} seconds
            </div>            
            <div>
                Ends at: {{ $date.unix(lottery.startTimestamp + lottery.duration).format('DD MMM YYYY HH:mm') }} in {{ (lottery.startTimestamp + lottery.duration) - $web3.timestamp }} seconds
            </div>
            <div>
                Prize fund: {{ $filters.formatUnits(lottery.prize, 18, 2) }} MATIC
            </div>
            <div>
                Winners: {{ lottery.winners }}
            </div>
            <div>
                Max participants: {{ lottery.maxParticipants || 'not limited' }}
            </div>
            <div>
                Participants:  {{ followers.length }} 
                <a href="#" class="text-decoration-none" @click.prevent="showFollowers()">show all</a>                
            </div>

            <div v-if="mode === 'exp'">
                Followed by me: {{ profile.isFollowedByMe ? 'yes' : 'no' }}
            </div>

            <div v-if="mode === 'exp'">
                Eligible: {{ item.isEligible ? 'yes' : 'no' }}
            </div>

            <div v-if="winnersList" class="mt-2 small">
                🏆 Winners list
                <div class="border-top mt-1 pt-1 d-flex align-items-center justify-content-between" v-for="(follower, index) in winnersList">
                    <div class="">
                        <a :href="`${$web3.network.explorerUrl}address/${follower.wallet}`"
                            class="text-decoration-none d-flex align-items-center font-monospace" target="_blank" rel="noopener noreferrer"
                            >
                            {{ follower.wallet }} 
                            <span class="fw-bold text-danger ms-3" v-if="$web3.account?.address === follower.wallet">
                                YOU!
                            </span>
                        </a>
                        <div class="fw-bold text-success">
                            Winner of {{ $filters.formatUnits(follower.prize, 18, 3) }} MATIC
                        </div>
                    </div>
                    <div class="text-secondary">{{ $date.unix(follower.followedAt).format('DD MMM YYYY HH:mm') }}</div>
                </div>    
            </div>

            <div v-if="mode === 'my'" class="d-flex justify-content-end mt-2  border-top pt-2">
                <button type="button" class="btn btn-primary btn-sm ms-2 " @click="completeTest()">
                    Complete test
                </button>  
                <button type="button" class="btn btn-primary btn-sm ms-2 " @click="fulfillTest()">
                    Fullfill test
                </button>
            </div>

            <div v-if="mode === 'exp'" class="d-flex justify-content-end mt-2 border-top pt-2">
                <button type="button" class="btn btn-primary btn-sm ms-2 " @click="followNormal()">
                    Follow
                </button>  
                <button type="button" class="btn btn-primary btn-sm ms-2 " @click="unfollow()">
                    Unfollow
                </button>
            </div>
        </div>		
	</div>
</template>

<style lang="scss" scoped>
	@import '@/scss/variables.scss';
	._item_action{
		border-radius: 10rem;
		padding: .3rem;
		&:hover{
			background-color: #f1f1f1;
		}		
	}
	.btn {
		._icon_btn{
			margin: .1rem .3rem;			
		}
		&:hover {
			._icon_btn{
				transition: background-color 0.15s ease-in-out;
				background-color: $white !important;
			}				
		}
	}	
</style>

<script>	
	import { lensClient, ReactionTypes } from '@/api/lens';
	import { BigNumber, utils } from "ethers";
	import { amplicataApi } from '@/api/amplicata'	
	import { lotteryItemsStore } from '@/store/lottery.items.store' 
	
	export default {
		props: {
			item: { type: Object, required: true },
			pastMirrors: { type: Object, default: {} },
            mode: { type: String, required: true },
		},
		components: {
			
		},
		data() {
			return {
				cache: null,
				contentExpanded: false,
				DAY: 60 * 60 * 24,
				mirrorsForLastDurations: [
					{ text: 'any duration', value: 0 },
					{ text: '1 week', value: 7 },
					{ text: '2 weeks', value: 14 },
					{ text: '3 weeks', value: 21 },
					{ text: '4 weeks', value: 28 },
				],
				detailsExpanded: false,
				lensterUrl: LENSTER_URL,
			};
		},
		async mounted() {
			if (this.$route.query.id) {
				this.detailsExpanded = true	
			}
		},
		beforeUnmount() {

		},
		computed: {
			lottery() { return this.item.lottery },
            profile() { return this.item.profile},
			followers() { return this.item.followers || [] },
			locked() { return this.item.locked },
            isPartisipated() {
                return this.followers.find(f => f.wallet === this.$web3.account.address)
            },
			followersStats() {				
				return {
					awaiting: this.mirrors.filter(m => ['NONE', 'DISTRIBUTE', 'PROCESSING'].includes(m.status)),
					rewarded: this.mirrors.filter(m => ['REWARD'].includes(m.status)), 
					withheld: this.mirrors.filter(m => ['UNLOCK', 'RETURN', 'ERROR'].includes(m.status)),
					totalCount: this.mirrors.length
				}
			},
            isRemoveAllowed() { return this.followers.length == 0 },

            isRunning() { 
                return this.$date.unix(this.lottery.startTimestamp).add(this.lottery.duration, 'seconds') > this.$date.unix(this.$web3.timestamp) && !this.lottery.completedTimestamp 
            }, 
            isCompleted() { return this.lottery.completedTimestamp && !this.lottery.finishedTimestamp }, 
            isFinished() { return this.lottery.finishedTimestamp }, 
            isAwaitingCompletion() { return !this.isRunning && !this.isCompleted && !this.isFinished },
           
			
			durationEligible() {
				if (!this.lottery) return false
				return this.$date.unix(this.lottery.startTimestamp).add(this.lottery.duration, 'seconds') > this.$date.unix(this.$web3.timestamp)
			},
			
			isEligible() {
				return false
			},	
            
            winnersList() {
                if (this.lottery.finishedTimestamp) return this.followers.filter(f => f.prize !== '0')
            }
		},
		methods: {			
			showFollowers() {
				this.$mitt.emit('followersListModal::open', this.item )
			},

            async remove() {
				await this.gCallMethod({
					title: "Lottery remove", loader: true, emit: null,
					method: async function () {		
						let tx = await this.$web3.lotteryHub.instance.connect(this.$web3.account.signer).remove(this.lottery.profileId)						
						lotteryItemsStore().setLocked(this.lottery.id, true)
						return tx                        
					}.bind(this),
					callback: async function () {
				
					}.bind(this),
				})				
			},

            async complete() {
				await this.gCallMethod({
					title: "Lottery complete", loader: true, emit: null,
					method: async function () {		
						let tx = await this.$web3.lotteryHub.instance.connect(this.$web3.account.signer).complete(this.lottery.profileId, { gasLimit: 1000000 })						
						lotteryItemsStore().setLocked(this.lottery.id, true)
						return tx                        
					}.bind(this),
					callback: async function () {
						this.$mitt.emit("profile::update")				
					}.bind(this),
				})				
			},

            async completeTest() {
				await this.gCallMethod({
					title: "Complete Test", loader: true, emit: null,
					method: async function () {		
						let tx = await this.$web3.lotteryHub.instance.connect(this.$web3.account.signer).completeTest(this.lottery.profileId, '1')						
						lotteryItemsStore().setLocked(this.lottery.id, true)
						return tx                        
					}.bind(this),
					callback: async function () {
						this.$mitt.emit("profile::update")				
					}.bind(this),
				})				
			},

            async fulfillTest() {
				await this.gCallMethod({
					title: "Fulfill Test", loader: true, emit: null,
					method: async function () {		
						let tx = await this.$web3.lotteryHub.instance.connect(this.$web3.account.signer).fulfillTest('1', [ BigNumber.from(utils.randomBytes(32)) ])						
						lotteryItemsStore().setLocked(this.lottery.id, true)
						return tx                        
					}.bind(this),
					callback: async function () {
						this.$mitt.emit("profile::update")				
					}.bind(this),
				})				
			},

               

            async follow() {
                await this.gCallMethod({
					title: "Follow", loader: true, emit: null,
					method: async function () {	
						const followTypedDataResult = await lensClient.profile.createFollowTypedData({
                            follow: [{ profile: this.lottery.profileId }]
                        })
                        const typedData = followTypedDataResult.unwrap().typedData;
                        const signature = await this.$web3.wallet.signer._signTypedData(
                            typedData.domain, 
                            typedData.types, 
                            typedData.value
                        );
                        const { v, r, s } = utils.splitSignature(signature); 
                        let tx = await this.$web3.lotteryHub.instance.connect(this.$web3.account.signer).follow([
                            this.$web3.account.address,
                            typedData.value.profileIds,
                            typedData.value.datas,            
                            [ v, r, s, typedData.value.deadline ]
                        ])	
						lotteryItemsStore().setLocked(this.lottery.id, true)                        
						return tx                        
					}.bind(this),
					callback: async function () {
						this.$mitt.emit("profile::update")	                        	
					}.bind(this),
				})						
			},

			async followNormal() {
				this.gLoaderShow()
                try { 
					const followTypedDataResult = await lensClient.profile.createFollowTypedData({
						follow: [{ profile: this.lottery.profileId }]
					})
					const followTypedData = followTypedDataResult.unwrap();
					const signedTypedData = await this.$web3.wallet.signer._signTypedData(
						followTypedData.typedData.domain, 
						followTypedData.typedData.types, 
						followTypedData.typedData.value
					);
					const broadcastResult = await lensClient.transaction.broadcast({
						id: followTypedData.id,
						signature: signedTypedData,
					});		
					
					this.gLoaderHide()		

					if (broadcastResult?.value?.txId) {
						lotteryItemsStore().setLocked(this.lottery.id, true)
						const waitForIsIndexedResult = await lensClient.transaction.waitForIsIndexed(broadcastResult.value.txId)
						lotteryItemsStore().setLocked(this.lottery.id, false)
						if (waitForIsIndexedResult?.value?.indexed) {
							lotteryItemsStore().setFollowing(this.lottery.id, true)	
						} else {
							throw new Error('Tx not indexed')
						}						
					} else {
						throw new Error('Tx not broadcasted')
					}

                } catch (error) {                    
                    this.$swal({ icon: "error", title: 'Like', text: error.toString() });
                }                
                this.gLoaderHide()				
			},

			async unfollow() {
				this.gLoaderShow()				
                try { 
					const unfollowTypedDataResult = await lensClient.profile.createUnfollowTypedData({
						profile: this.lottery.profileId
					})
					const unfollowTypedData = unfollowTypedDataResult.unwrap();
					const signedTypedData = await this.$web3.wallet.signer._signTypedData(
						unfollowTypedData.typedData.domain, 
						unfollowTypedData.typedData.types, 
						unfollowTypedData.typedData.value
					);
					const broadcastResult = await lensClient.transaction.broadcast({
						id: unfollowTypedData.id,
						signature: signedTypedData,
					});									
					this.gLoaderHide()	
					if (broadcastResult?.value?.txId) {
						lotteryItemsStore().setLocked(this.lottery.id, true)
						const waitForIsIndexedResult = await lensClient.transaction.waitForIsIndexed(broadcastResult.value.txId)
						lotteryItemsStore().setLocked(this.lottery.id, false)
						if (waitForIsIndexedResult?.value?.indexed) {
							lotteryItemsStore().setFollowing(this.lottery.profileId, false)							
						} else {
							throw new Error('Tx not indexed')
						}						
					} else {
						throw new Error('Tx not broadcasted')
					}									
				} catch (error) {                    
                    this.$swal({ icon: "error", title: 'Unfollow', text: error.toString() });					
                } 
                this.gLoaderHide()		
				lotteryItemsStore().setLocked(this.lottery.id, false)				
			},
		},
	}
</script>