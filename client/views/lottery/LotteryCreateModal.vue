<template>
	<Modal :modal-id="modalId" :modal-class="`modal-md`">		
		<template v-slot:body>
			<!-- Publication -->
			<div class="d-flex align-items-center justify-content-between mb-2">
				<div class="fw-bold fs-5">Lottery</div>
				<div class="d-flex align-items-center ms-3">
				</div>				
				<button type="button" class="btn-close ms-auto " data-bs-dismiss="modal" aria-label="Close" @click.prevent="closeModal()"></button>	
			</div>	
			
			<div v-if="lottery">
				<!-- Prize fund -->
				
				<div class="small fw-bold mb-1 text-nowrap">
					<span class="text-nowrap" v-tooltip data-bs-title="Prize fund will be equally splitted between all winners when lottery ends">Prize fund</span>							
				</div>
				<div class="d-flex align-items-center p-1 _input" :class="{ '_is_invalid': false }">														
					<input class="form-control form-control-sm font-monospace text-center"
						placeholder="enter prize amount" 
						type="number" min="0" step="1"  
						v-model="lottery.prize"
						:class="{ 'text-danger': false }"
					>
					<select class="form-select form-select-sm border-0" style=" max-width: 8rem; "
						v-model="lottery.prizeToken"
					 	>
						<option v-for="token in prizeTokenList" :value="token.address" :disabled="token.symbol !== 'MATIC'">
							{{ token.symbol }}
						</option>
					</select>
				</div>

				<!-- Duration -->
				<div class="small fw-bold mb-1 mt-2 text-nowrap">
					<span class="text-nowrap" v-tooltip data-bs-title="Duration of lottery in days. Lottery will be completed when time reach or on max participants if set">Duration</span>							
				</div>
				<div class="d-flex align-items-center p-1 _input">														
					<input class="form-control form-control-sm font-monospace text-center" 
						type="number"
						:placeholder="`max 7`" 
						v-model="lottery.duration" 
						min="0" max="30" step="1" 							                          							
					>
					<span class="align-self-center mx-2 text-secondary small">seconds</span>
				</div>
				
				<!-- Winners -->
				<div class="small fw-bold mb-1 mt-2 text-nowrap">
					<span class="text-nowrap" v-tooltip data-bs-title="Number of winners to split prize fund between them">Winners</span>							
				</div>
				<div class="d-flex align-items-center p-1 _input">														
					<input class="form-control form-control-sm font-monospace text-center" 
						type="number"
						:placeholder="`max 10`" 
						v-model="lottery.winners" 
						min="1" max="10" step="1" 						                          							
					>
					<span class="align-self-center mx-2 text-secondary small">users</span>
				</div>

				<!-- Duration -->
				<div class="small fw-bold mb-1 mt-2 text-nowrap">
					<span class="text-nowrap" v-tooltip data-bs-title="Max mumber of participants. If it reached lottery will end even if duration not past">Max participants</span>							
				</div>
				<div class="d-flex align-items-center p-1 _input">														
					<input class="form-control form-control-sm font-monospace text-center" 
						type="number"
						placeholder="any" 
						v-model="lottery.maxParticipants" 
						min="0" step="1" 						                          							
					>
					<span class="align-self-center mx-2 text-secondary small">users</span>
				</div>

				<div class="small text-secondary mt-3 text-end" v-if="serviceFee">
					Additional {{ $filters.formatUnits(serviceFee, selectedPrizeToken.decimals, 2) }} {{ selectedPrizeToken.symbol }} service fee will be deducted from your wallet
				</div>

				<div class="text-end mt-2">
                    <button class="btn btn-outline-danger btn-sm me-2" type="button" @click="closeModal()">Cancel</button>
                    <button class="btn btn-primary btn-sm px-5" type="button" @click="start()" :disabled="isLottryInvalid">Start</button>
                </div>
				
			</div>					
		</template>
	</Modal>
</template>

<style lang="scss" scoped>    
	//@import '@/scss/variables.scss';	
</style>

<script>
	import Modal from '@/views/components/Modal.vue'
	//import { mapWritableState } from 'pinia';    
	//import { web3Store } from '@/store/web3.store'     
	import { lotteryItemsStore } from '@/store/lottery.items.store' 
    import { utils } from 'ethers';

	export default {
		components: {
			Modal,
		},
		data() {
			return {
				lotteryDefault: {
					active: true,
					duration: 600,
					winners: 3,	
					maxParticipants: null,
					prize: 0.01,
					prizeToken: this.$web3.bcConfig.tokens[0].address
				},
				modalId: 'lotteryCreateModal', //promotionCreateModal
				modalOpened: false,							
				lensterUrl: LENSTER_URL,				
				lottery: null,
				oneDay: 60 * 60 * 24,
				serviceFee: null,
				config: null,
			};
		},
		mounted() {
			this.lottery = JSON.parse(JSON.stringify(this.lotteryDefault))
			this.$mitt.on(this.modalId + "::open", this.openModal)
			this.$mitt.on(this.modalId + "::close", this.closeModal)
			
		},
		beforeUnmount() {
			this.$mitt.off(this.modalId + "::open")
			this.$mitt.off(this.modalId + "::close")
		},
		computed: {
			prizeTokenList() { return this.$web3.bcConfig.tokens.filter(t => ['MATIC', 'WMATIC', 'WETH', 'USDC', 'DAI'].includes(t.symbol)) },
            selectedPrizeToken() { return this.prizeTokenList.find(t => t.address === this.lottery.prizeToken) || {} },
			isLottryInvalid() { return false },
			toDeduct() {
				if (!this.lottery.prize || !this.serviceFee) return null
				return parseFloat(utils.formatEther(this.serviceFee)) + this.lottery.prize 
			}
		},
		methods: {
			async openModal() {
				try {
					await this.getConfig()				                
					this.$mitt.emit('modal::open::' + this.modalId)
					this.modalOpened = true	
				} catch (error) {
					console.log(error)				
				}							
			},

			async getConfig() {	
				const ad = await this.$web3.lotteryHub.instance.aggregatedData()			
				this.config = ad._config
				this.serviceFee = ad._serviceFee
			},

			closeModal() {
				this.modalOpened = false
				this.$mitt.emit('modal::close::' + this.modalId)				
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
			
			async start() {
				await this.gCallMethod({
					title: "Lottery start", loader: true, emit: null,
					method: async function () {	
						const lottery = {
							prize: utils.parseUnits(this.lottery.prize.toString(), this.selectedPrizeToken.decimals),
							winners: this.lottery.winners,
							maxParticipants: this.lottery.maxParticipants ? parseInt(this.lottery.maxParticipants) : 0,
							duration: parseInt(this.lottery.duration), // * this.oneDay
							startTimestamp: this.$date().unix(),
							completedTimestamp: 0
						}	
						let tx = await this.$web3.lotteryHub.instance.connect(this.$web3.account.signer).start(this.$user.profile.id, [
							...Object.values(lottery)
						], {
							value: utils.parseEther(this.lottery.prize.toString()).add(this.serviceFee)
						})	
						lotteryItemsStore().addOptimisticLottery(lottery, this.$user.profile)				
						this.closeModal()
						return tx                        
					}.bind(this),
					callback: async function () {
			
					}.bind(this),
				})
			},			
		},
	}
</script>