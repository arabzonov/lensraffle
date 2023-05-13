<template>
	<div class="modal fade " :id="modalId" tabindex="-1" :aria-labelledby="modalId" aria-hidden="true" ref="modal" :class="modalClass" data-bs-backdrop="static">
		<div class="modal-dialog mx-2 mx-md-auto" :class="{ 'modal-dialog-scrollable': scrollable }">
			<div class="modal-content shadow">
				<div class="modal-header" v-if="$slots.header">
					<slot name="header"></slot>
				</div>
				<div class="modal-body overflow-hidden">
					<slot name="body"></slot>
				</div>
				<div class="modal-footer" v-if="$slots.footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
</style>

<script>
	import { Modal } from 'bootstrap';
	export default {
		props: {
			modalId: { type: String, required: true },
			title: { type: String },
			scrollable: { type: Boolean, default: false },
			modalClass: { type: String, default: 'modal-lg' },
		},
		data() {
			return {
				modal: null,
				emitNext: null
			}
		},
		methods: {
			async openModal() {
				this.modal.show()				
				//setTimeout(function(){
				//	var c = document.querySelectorAll(".modal-backdrop");
				//	for (var i = 0; i < c.length; i++) {						
				//		c[i].style.zIndex =  1050 + i * 20  ;
				//	}
				//	var d = document.querySelectorAll(".modal.fade.multi.opened");					
				//	for(var i = 0; i<d.length; i++){						
				//		d[i].style.zIndex = 1055 + i * 20;
				//	}
				//}, 1);
			},
			async closeModal(emitNext) {
				this.modal.hide()
				this.emitNext = emitNext
			}
		},
		computed: {
			hasFooterSlot() {
				return !!this.$slots.footer;
			}
		},
		mounted() {
			this.modal = new Modal('#' + this.modalId, {
				keyboard: false,
				focus: false
			})
			const self = this
			this.$refs.modal.addEventListener('hidden.bs.modal', event => {
				if (self.emitNext) {					
					self.$mitt.emit(self.emitNext);
					self.emitNext = null											
				}				
			})
			this.$mitt.on("modal::open::" + this.modalId, this.openModal);
			this.$mitt.on("modal::close::" + this.modalId, this.closeModal);
		},
		beforeUnmount() {
			this.$mitt.off("modal::open::" + this.modalId);
			this.$mitt.off("modal::close::" + this.modalId);
		}
	}
</script>


