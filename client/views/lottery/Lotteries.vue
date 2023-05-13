<template>
	<div v-if="$user.profile ">
		<!-- lottery -->
		<div class="d-flex justify-content-between mb-2">

			<div class="d-flex ">
				<button class="btn btn-outline-primary d-flex align-items-center me-2" @click="setMode('my')" :class="{ 'btn-outline-secondary' : query.mode === 'my' }">
					My lotteries
				</button>
				<button class="btn btn-outline-primary d-flex align-items-center" @click="setMode('exp')" :class="{ 'btn-outline-secondary' : query.mode === 'exp' }">
					Explore
				</button>
				
			</div>
			<button class="btn btn-primary d-flex align-items-center" @click="$mitt.emit('lotteryCreateModal::open')" v-if="query.mode === 'my' && !createDisabled">
				<div class="_icon_lottery _icon_btn bg-white me-2"></div>
				Create
			</button>
		</div>
		
		<div class="d-flex align-items-center justify-content-between mb-2">
			<div class="d-flex">
				<select class="form-select form-select-sm border-0 pointer fw-bold"  v-model="query.select" @change="setPage(1)">
					<option class="fw-bold " v-for="option in selectFilters" :value="option.value">
						{{ option.text }}
					</option>
				</select>
			</div>
			
			<div class="d-flex align-items-center">
				<div class="_icon_reload bg-primary pointer ms-2 me-2" @click.prevent="get()"></div>
			</div>
		</div>
		
		<LotteryItem v-for="item in items" :item="item" :mode="query.mode"/>

		<div  class="d-flex align-items-center justify-content-center">
			<div class="small align-self-center mb-3 mt-3" v-if="query.select === 'amp' && totalPages > 1">
				<Paginate :page-count="parseInt(totalPages)" :click-handler="setPage"
					:force-page="parseInt(query.page)" :prev-text="'...'" :next-text="'...'">
				</Paginate>
			</div>
			<div class="align-self-center small fw-bold mb-3 mt-3" v-if="query.select === 'all' && pagination">
				<a href="#" class="text-decoration-none" @click.prevent="getAll('next')" v-if="pagination.pageInfo.next">Load more</a>
			</div>
		</div>
				
		<LotteryCreateModal/>
		<FollowersListModal/>		
	</div>
</template>

<style lang="scss" scoped>
	
</style>

<script>
	import { lensClient } from '@/api/lens';
	import { amplicataApi } from '@/api/amplicata'	
	import { mapState } from 'pinia'
	import { lotteryItemsStore } from '@/store/lottery.items.store' 
	import Paginate from '@/views/components/Paginate.vue'
	import LotteryItem from '@/views/lottery/LotteryItem.vue'
	import LotteryCreateModal from '@/views/lottery/LotteryCreateModal.vue'
	import FollowersListModal from '@/views/lottery/FollowersListModal.vue'

	export default {
		components: {
			LotteryCreateModal,
			FollowersListModal,
			LotteryItem,			
			Paginate,
		},

		data() {
			return {
				query: {
					page: 1,
					select: 'all',	
					mode: 'my'				
				},
				limit: 5,
				totalPages: 0,
				totalResults: 0,				
				selectFilters: [
					{ text: 'All', value: 'all' },
				],	
							
				lensterUrl: LENSTER_URL,				
				pagination: null
			}
		},

		computed: {
			...mapState(lotteryItemsStore, ['items']),
			createDisabled() {
				return lotteryItemsStore().items.find(i => !i.lottery.finishedTimestamp)
			}
		},

		watch: {
			"$user.profile.id": {
				handler(newValue) {
					if (newValue) {
						this.get()
					}
				}
			},
		},

		created() {
            lotteryItemsStore().$reset()
        },
		
		async mounted() {			
			this.query = this.queryValues(this.$route.query)
			if (this.$user.profile?.id) this.setPage()
			
			//this.$mitt.on("campaigns::publications::reload", this.setPage)			
			//this.$mitt.on("optimisticPublication", itemsStore().addOptimisticPublication)
			
			this.sockets.subscribe('STARTED', lotteryItemsStore().startLottery)
			this.sockets.subscribe('REMOVED', lotteryItemsStore().removeLottery)
			this.sockets.subscribe('FOLLOWED', lotteryItemsStore().updateFollowers)
			this.sockets.subscribe('COMPLETED', lotteryItemsStore().updateLottery)
			this.sockets.subscribe('REWARDED', lotteryItemsStore().updateFollowers)
			this.sockets.subscribe('FINISHED', lotteryItemsStore().updateLottery)
			//this.sockets.subscribe('RETURNED', lotteryItemsStore().updateMirror)
		},

		beforeUnmount() {			
			this.sockets.unsubscribe('STARTED');
			this.sockets.unsubscribe('FOLLOWED');
			this.sockets.unsubscribe('COMPLETED');
			this.sockets.unsubscribe('REWARDED');
			this.sockets.unsubscribe('FINISHED');
			this.sockets.unsubscribe('RETURNED');
		},

		methods: {
			queryValues(q) { return Object.fromEntries( Object.entries(q).filter(([key, value]) => { return value !== null && value !== undefined && value !== '' && this.query.hasOwnProperty(key) }) ) },
			setQuery() { try { this.$router.push({ name: this.$route.name, query: this.queryValues(this.query) }) } catch (error) { } },
			setPage(page = 1) {
				if (!this.query.select) this.query.select = 'all'	
				if (!this.query.mode) this.query.mode = 'my'			
				this.query.page = page || 1	
				this.get()
			},
			setMode(mode) {
				this.query.mode = mode
				this.get()
			},
						
			async get() {
				this.gLoaderShow()				
				try {
					const lotteriesResp = await amplicataApi.get('/lottery', {
						params: {
							...this.queryValues(this.query),
							limit: this.limit,
							profileId: this.$user.profile.id,
							wallet: this.$user.profile.ownedBy,
						}
					})

					let items = [] 					
					if (lotteriesResp.data.results.length) {							
						if (this.query.mode === 'exp') {
							//const doesFollowResp = await lensClient.profile.doesFollow({
							//	followInfos: lotteriesResp.data.results.map(item => {
							//		return {
							//			followerAddress: this.$user.profile.ownedBy,
							//			profileId: item.lottery.profileId
							//		}
							//	})								
							//})
							const profilesResp = await lensClient.profile.fetchAll({
								profileIds: [...new Set(lotteriesResp.data.results.map(item => item.lottery.profileId))] 
							}, this.$user.profile.id);
							
							items = lotteriesResp.data.results.map(item => {
								return {
									lottery: item.lottery,
									followers: item.followers,											
									isEligible: item.isEligible,
									profile: profilesResp.items.find(p => p.id === item.lottery.profileId),	
									locked: false,									
								}
							})
						} else {
							items = lotteriesResp.data.results.map(item => {
								return {
									lottery: item.lottery,
									followers: item.followers,											
									isEligible: item.isEligible,
									profile: this.$user.profile,	
									locked: false,									
								}
							})
						}						
					}

					lotteryItemsStore().setItems(items)
					this.totalPages = lotteriesResp.data.totalPages
					this.totalResults = lotteriesResp.data.totalResults
					
					window.scrollTo({ top: 0, behavior: 'smooth' });
				} catch (err) {
					console.log(err)
				}
				
				this.setQuery()

				this.gLoaderHide()
			}
		},
	}
</script>
