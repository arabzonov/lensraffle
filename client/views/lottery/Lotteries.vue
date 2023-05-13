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
