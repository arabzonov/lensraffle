<template>
	<Modal :modal-id="modalId" :scrollable="true">		
		<template v-slot:header>
			<!-- Publication -->
			<div class="d-flex align-items-center justify-content-between w-100" v-if="item">
				<div class="fw-bold fs-5 flex-grow-1">Participants</div>					
                <div class="d-flex me-3" v-if="false">
                    <select class="form-select form-select-sm border-0 pointer fw-bold"  v-model="listMode">
                        <option class="fw-bold " v-for="option in listFilter" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>			
				<button type="button" class="btn-close ms-auto " data-bs-dismiss="modal" aria-label="Close" @click.prevent="closeModal()"></button>	
			</div>		
		</template>

		<template v-slot:body>
			<!-- Settings -->			
            <div class="small" v-if="item">
                <div class="border-bottom mb-2 pb-2 d-flex align-items-center justify-content-between" v-for="(follower, index) in item.followers">
                    
					<div class="">
						<a :href="`${$web3.network.explorerUrl}address/${follower.wallet}`"
							class="text-decoration-none d-flex align-items-center" target="_blank" rel="noopener noreferrer"
							>
							{{ $filters.addressShort(follower.wallet) }}
						</a>
						<div class="fw-bold text-success" v-if="follower.prize !== '0'">
							Winner of {{ $filters.formatUnits(follower.prize, 18, 3) }} MATIC
						</div>
					</div>
					<div class="text-secondary">{{ $date.unix(follower.followedAt).format('DD MMM YYYY HH:mm') }}</div>
                </div>                       
            </div>
		</template>
	</Modal>
</template>

<style lang="scss" scoped>    
	@import '@/scss/variables.scss';
	._list {
		overflow-y: auto;
		max-height: 100vh;
	}
</style>

<script>    
	import Modal from '@/views/components/Modal.vue'		
	export default {
		components: {
			Modal			
		},
		data() {
			return {
				modalId: 'followersListModal',
				modalOpened: false,
				item: null,							
			};
		},
		mounted() {
			this.$mitt.on(this.modalId + "::open", this.openModal)
			this.$mitt.on(this.modalId + "::close", this.closeModal)
		},
		beforeUnmount() {
			this.$mitt.off(this.modalId + "::open")
			this.$mitt.off(this.modalId + "::close")
		},
		computed: {
            			
		},
		methods: {					
			openModal(item) {
				this.item = item
				this.$mitt.emit('modal::open::' + this.modalId)
				this.modalOpened = true
			},
			closeModal() {
				this.$mitt.emit('modal::close::' + this.modalId)
				this.item = null
			},			
		},
	}
</script>