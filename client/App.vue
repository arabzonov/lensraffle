<template>
	<div>		
		<Header class="mb-3 sticky-top"/>
						
		<div class="container px-2">
			<div class="row g-3">
				<div class="col-12 col-lg-5" v-if="$user.profile">
					<Profile/>				
				</div>
				
				<div class="col-12 col-lg-7" :class="{ 'col-lg-12': !$user.profile }">
					<router-view v-slot="{ Component, route }">
						<transition name="fade" mode="out-in">
							<component :is="Component" :key="route.path" />
						</transition>
					</router-view>
				</div>
			</div>	
		</div>		

		<web3-modal ref="web3modal" :theme="theme" :provider-options="providerOptions" cache-provider />
	</div>		    
</template>

<style lang="scss" scoped>	
</style>

<script>
	import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js';
	import Header from '@/views/partials/Header.vue';
	import Profile from '@/views/partials/Profile.vue'

	export default {
		name: "App",
		components: { Header, Profile }, 
		data() {
			return {
				theme: "light",
				providerOptions: {
					walletconnect: {
						package: WalletConnectProvider,	
						options: {
							rpc: {
								[this.$web3.chainId]: this.$web3.rpc,
							},
							chainId: this.$web3.chainId,					
						}				
					}
				},
				timeUpdateIndex: 0,
			};
		},

		async mounted() {
			this.$mitt.on("tx::swall", this.txResultSwall);
			this.$mitt.on("web3::updated", this.updateContractData);
			this.$mitt.on("profile::update", this.updateContractData);
			this.sockets.subscribe('PROFILE', this.updateContractData)
			
			const self = this
			const web3modal = this.$refs.web3modal			
			this.$web3.setWeb3Modal(web3modal);					
			//await this.gWait(100)	
					
			this.$nextTick(async () => {
				this.gLoaderShow()
				try {
					if (web3modal.cachedProvider()) {
						await this.$web3.connect();
						//if (this.$user.) {
						//	
						//} else {
						//	this.$router.push({ name: 'login' })
						//}
					} else {
						await this.$web3.disconnect();
						//this.$router.push({ name: 'login' })
					}	
				} catch (error) {
					////console.log('APP mounted $web3.connect', error)
				}
				this.gLoaderHide()				
			});

			this.$web3.updateTimestamp();
			setTimeout(async function tick() {
				self.$mitt.emit('timer:tick')
				if (self.timeUpdateIndex >= 10) {
					self.$web3.updateTimestamp();					
					self.timeUpdateIndex = 0
				} else {
					self.timeUpdateIndex ++
				}				
				setTimeout(tick, 1000);     
			}, 1000)
		},

		watch: {
			"$user.profile.id": {
				handler(newValue) {
					this.$mitt.emit('profile::update')
					if (newValue) {											
					} else {						
					}					
				}
			},			
			"$web3.account.address": {
				handler(newValue) {
					if (newValue) {
						this.$mitt.emit('web3::updated')											
					} else {
						this.$mitt.emit('web3::disconnected')
					}					
				}
			}
		},
		
		methods: {
			async updateContractData() {		
				try {
					if (this.$user.profile) {
						//const profileId = this.$user.profile?.id || 0
						//const aggregatedData = await this.$web3.hub.instance.aggregatedData(profileId)
						////console.log('aggregatedData', aggregatedData)
						
						
						// this.$user.setWallet({
						// 	...aggregatedData._wallet,
						// 	owner: aggregatedData._owner,
						// 	ethBalance: aggregatedData._ethBalance,
						// 	paymentTokenBalance: aggregatedData._paymentTokenBalance,
						// 	paymentTokenAllowance: aggregatedData._paymentTokenAllowance,	
						// 	mintTimestampOf: profileId ? await this.$web3.lensHub.instance.mintTimestampOf(profileId) : 0
						// })
						// this.$web3.setHubConfig({
						// 	...aggregatedData._config,
						// 	feeBase: aggregatedData._feeBase,
						// 	paymentToken: aggregatedData._paymentToken				
						// })		
						this.$web3.updateTimestamp()
					
						//this.$user.getUserProfiles()	
					}

						
				} catch (error) {
					////console.log(error)
				}
			},		

			async txResultSwall({ tx, msg, emit, callback }) {
				//////console.log({ tx, msg, emit, callback })
				try {
					const result = await tx.wait();
					if (callback) callback();
					if (emit) {
						this.gWait(1000)
						if (typeof emit === 'string') {
							this.$mitt.emit(emit);
						}
						if (Array.isArray(emit)) {
							emit.forEach(e => this.$mitt.emit(e))
						}						
					}
					if (result.status) {
						this.$swal({
							icon: "success",
							title: msg.title || "SUCCESS",
							text: msg.success || "Confirmation successful",
							footer: `<a href="${this.$web3.chain.explorerUrl + "tx/" + result.transactionHash}" target="_blank" class="font-monospace">${this.$filters.txHashShort(result.transactionHash)}</a>`,
							timer: 6000,
          					showConfirmButton: true,
						});
					} else {
						this.$swal({
							icon: "error",
							title: msg.title || "ERROR",
							text: msg.nosuccess || "Confirmation error",
							footer: `<a href="${this.$web3.chain.explorerUrl + "tx/" + result.transactionHash}" target="_blank" class="font-monospace">${this.$filters.txHashShort(result.transactionHash)}</a>`,
							timer: 3000
						});
					}
				} catch (error) {
					this.$swal({
						icon: "error",
						title: msg.title || "ERROR",
						text: "Error: " + (error.data?.message ? error.message + " ... " + error.data?.message : error.message),
						timer: 3000
					});
					console.error("txResultToast", error);
				}
			},
		},
	};
</script>
	