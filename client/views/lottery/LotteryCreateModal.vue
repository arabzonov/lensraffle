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
