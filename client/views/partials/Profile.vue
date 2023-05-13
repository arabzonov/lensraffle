<template>
	<div class="_profile mb-2" v-if="$user.profile || $user.wallet">
		<!-- Profile -->
		<div class="border rounded mb-2 p-3 bg-white shadow-sm" v-if="$user.profile">
			<div class="row g-1 row-cols-1 row-cols-md-2 row-cols-lg-1">
				<!-- Info -->
				<div class="col d-flex align-items-center"
					>
					<div v-if="$user.profile" class="_avatar_picture align-self-center me-2 position-relative"
						:class="{ '_md': $breakpoint.gte('md'), '_lg': $breakpoint.gte('lg') }">
						<img :src="$user.profilePictureUrl($user.profile?.picture?.original?.url)" alt=";)" class="">
						<a :href="`${lensterUrl}?text=Mirror this post via app.amplicata.xyz and receive rewards!&url=https://app.amplicata.xyz&hashtags=amplicata&via=amplicata`"
							target="_blank" class="position-absolute top-0 start-0" style="width: 100%;height: 100%;">
						</a>
					</div>
					<div class="align-self-center ms-2">
						<div class="mb-0 mb-lg-1 fs-5 d-flex align-items-center" :class="{ 'fs-5': $breakpoint.gte('md') }">
							<a :href="lensterUrl + 'u/' + $user.profile.handle"
								class="text-decoration-none text-dark fw-bold d-flex align-items-center" target="_blank">{{
									$user.profile.handle }}</a>
						</div>

						<div class="mb-0 mb-lg-1 d-flex align-items-center" v-if="$web3.account.address">
							<a :href="`${$web3.network.explorerUrl}address/${$web3.account.address}`"
								class="text-decoration-none d-flex align-items-center" target="_blank" rel="noopener noreferrer"
								:class="{ 'text-danger': $user.wallet && !$filters.compareAddress($user.wallet.owner, $web3.account.address) }"
								>
								{{ $filters.addressShort($web3.account.address) }}
							</a>
						</div>

						<button type="button" v-if="!$web3.account.address" class="btn btn-outline-danger btn-sm mb-2"
							@click="$web3.connect()">
							Connect wallet
						</button>
						
					</div>
					
				</div>
				
			</div>
			
		</div>

		
		
	</div>
</template>

<style lang="scss" scoped> 
	@import '@/scss/variables.scss';
	._wallet_icon {
		min-width: 1.8rem;
		height: 1.8rem;
	}
	._avatar_picture {
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 10rem;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&._md {
			width: 4.5rem;
			height: 4.5rem;
		}
		&._lg {
			width: 6rem;
			height: 6rem;
		}
	}
</style>

<script>
	export default {
		components: {  },
		data() {
			return {
				lensterUrl: LENSTER_URL,
			};
		},
		mounted() {

		},
		beforeUnmount() {

		},
		computed: {
			postsToMirrorsRatio() {
				if (!this.$user.profile) return null
				const totalPostsAndMirrors = this.$user.profile.stats.totalPosts + this.$user.profile.stats.totalMirrors
				return totalPostsAndMirrors > 0 ? Math.ceil(this.$user.profile.stats.totalPosts / (totalPostsAndMirrors / 100)) : 0
			},
			profileAge() {
				if (!this.$user.wallet?.mintTimestampOf) return null
				return this.$web3.timestamp - parseInt(this.$user.wallet.mintTimestampOf)
			},
			profileAgeDays() {
				if (!this.$user.wallet?.mintTimestampOf) return null
				return parseInt((this.$web3.timestamp - parseInt(this.$user.wallet.mintTimestampOf)) / (60 * 60 * 24))
			}
		},
		methods: {

		},
	}
</script>
