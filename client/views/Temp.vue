<template>
	<div>

		<div class="mb-2">
			<button type="button" class="btn btn-primary btn-lg">Large button</button>
			<button type="button" class="btn btn-outline-primary btn-lg">Primary</button>
		</div>
		<div class="mb-2">

		</div>
		<div class="mb-2">
			<button type="button" class="btn btn-primary btn-sm">Large button</button>
			<button type="button" class="btn btn-outline-primary btn-sm">Large button</button>
		</div>

		<div class="mb-2">
			<button type="button" class="btn btn-danger btn">Large button</button>
			<button type="button" class="btn btn-outline-danger btn">Large button</button>
		</div>

		<div class="mb-2">
			<button type="button" class="btn btn-warning btn">Large button</button>
			<button type="button" class="btn btn-outline-warning btn">Large button</button>
		</div>

		<div class="mb-2">
			<button type="button" class="btn btn-secondary text-dark btn">Large button</button>
			<button type="button" class="btn btn-outline-secondary text-dark btn">Large button</button>

		</div>

		<div class=" mb-4">
			<span class="badge rounded-pill text-bg-success px-4 py-2">Success</span>

		</div>

		<div class=" mb-4">
			<span class="badge rounded-pill text-bg-warning px-4 py-2">Success</span>

		</div>

		<div class=" mb-4">
			<span class="badge rounded-pill text-bg-danger px-4 py-2">Success</span>
		</div>

		<div class="form-check form-switch">
			<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
			<label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
		</div>

		<!--div>
			<div class="d-flex justify-content-between">
				<div class="align-self-center">
					Current time
				</div>
				<div class="ms-2 align-self-center">
					{{ $web3.timestamp }} / {{ $date.unix($web3.timestamp).format('YY-MM-DD HH:mm:ss') }}
				</div>
			</div>	
			
			<div class="d-flex justify-content-between">
				<div class="align-self-center">
					Time travel
				</div>
				<div class="ms-2 align-self-center">
					<a href="#" class="mx-2 text-danger" @click.prevent="$web3.increaseTime(60 * 60)">Hour</a>
					<a href="#" class="mx-2 text-danger" @click.prevent="$web3.increaseTime(60 * 60 * 24)">Day</a>			
					<a href="#" class="mx-2 text-danger" @click.prevent="$web3.increaseTime(60 * 60 * 24 * 7)">Week</a>			
				</div>
			</div>
			
		</div-->

	</div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
	components: {},

	data() {
		return {

		};
	},
	async mounted() {

	},
	beforeUnmount() {

	},
	computed: {},
	methods: {

	},
};
</script>
