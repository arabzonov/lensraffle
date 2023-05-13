<template>
	<div class="row g-1 row-cols-1" v-if="$web3.account.address && !gIsTxAllowed" :class="{ 'row-cols-sm-2': !$web3.account.chainValid && ($user.wallet && !$filters.compareAddress($user.wallet.owner, $web3.account.address))}">
		<!-- Info -->
		<div class="col">
			<div class="d-grid gap-2">
				<button v-if="!$web3.account.chainValid" type="button"
					class="btn btn-outline-danger btn-sm" @click="gSwitchChain()">
					Wrong chain connected <br> Switch to {{ $web3.chain.name }} chain
				</button>	
			</div>				
		</div>	
		<div class="col">
			<!-- Wallet warning -->
			<div class="d-grid gap-2">
				<button  v-if="$user.wallet && !$filters.compareAddress($user.wallet.owner, $web3.account.address)" type="button"
					class="btn btn-outline-danger btn-sm " @click="gSwitchAccount($user.wallet.owner)">
					Wrong wallet connected <br> Switch to {{ $filters.addressShort($user.wallet.owner) }} 
				</button>	
			</div>								
		</div>		
	</div>	
</template>

<script>
	export default {
				
	};
</script>