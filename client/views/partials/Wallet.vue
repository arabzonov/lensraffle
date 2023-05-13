<template>
	<div v-if="$user.wallet">
		<!-- Payments -->
		<div >
			<!-- wallet balance -->
			<div class="mb-3">
				<div class="mb-2 fw-bold _head_text_line">
					Wallet balance
				</div>				
				<div class="row row-cols-2 row-cols-sm-4 row-cols-lg-2 row-cols-xl-4 small text-center">
					<div class="col d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-column mb-2 justify-content-start">
						<div  class=" fw-bold" :class="{ 'text-danger': $user.wallet.ethBalance.eq(0) }">
							{{ $filters.formatUnits($user.wallet.ethBalance, 18, 2) }}
						</div>
						<div class="text-secondary text-uppercase mx-2">{{ $web3.chain.symbol }}</div>						
					</div>
					<div class="col d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-column mb-2 justify-content-start">
						<div  class=" fw-bold" :class="{ 'text-danger': $user.wallet.paymentTokenBalance.eq(0) }">
							{{ $filters.formatUnits($user.wallet.paymentTokenBalance, $web3.paymentToken.decimals, 3) }}
						</div>
						<div class="text-secondary text-uppercase mx-2">{{ $web3.paymentToken.symbol }}</div>						
					</div>					
				</div>
			</div>

			<!-- campaing balance -->
			<div class=" mb-2">
				<div class="mb-2  _head_text_line">
					<span class="fw-bold">Campaigns balance</span>
					<span class="ms-2 text-secondary">{{ $web3.paymentToken.symbol }}</span>
				</div>				
				<div class="row row-cols-2 row-cols-sm-4 row-cols-lg-2 row-cols-xl-4 small text-center">
					<div class="col d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-column mb-2 justify-content-start">
						<div  class="fw-bold" :class="{ 'text-danger': $user.wallet.balance.sub($user.wallet.locked).eq(0) }">
							{{ $filters.formatUnits($user.wallet.balance.sub($user.wallet.locked), $web3.paymentToken.decimals, 2) }}
						</div>
						<div class="text-secondary text-uppercase mx-2">Available</div>						
					</div>
					<div class="col d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-column mb-2 justify-content-start">
						<div  class="fw-bold">
							{{ $filters.formatUnits($user.wallet.locked, $web3.paymentToken.decimals, 3) }}
						</div>
						<div class="text-secondary text-uppercase mx-2">Locked</div>						
					</div>
					<div class="col d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-column mb-2 justify-content-start">
						<div  class="fw-bold">
							{{ $filters.formatUnits($user.wallet.rewards, $web3.paymentToken.decimals, 3) }}
						</div>
						<div class="text-secondary text-uppercase mx-2">Rewards</div>						
					</div>
					<div class="col d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-column mb-2 justify-content-start">
						<div  class="fw-bold">
							{{ $filters.formatUnits($user.wallet.serviceFees, $web3.paymentToken.decimals, 3) }}
						</div>
						<div class="text-secondary text-uppercase mx-2">fees</div>						
					</div>
				</div>
			
                <!-- Budget warning -->
				<div class="p-2 text-center text-danger mb-1" v-if="$user.wallet.balance.sub($user.wallet.locked).eq(0)">
					Don't forget to refill budget to have your campaigns running
				</div>

				<!-- deposit -->
				<div class="row g-2 align-items-center mt-2 justify-content-between">
					<div class="col-9 col-md-4 col-lg-8">
						<div class="d-flex align-items-center p-1 _input" :class="{ '_is_invalid' : isInvalidDeposit > 1 && depositAmount }">
							<span class="align-self-center mx-2 text-secondary">{{ $web3.paymentToken.symbol }}</span>							
							<input class="form-control form-control-sm font-monospace text-center" 
								type="number"
								placeholder="amount" 
								v-model="depositAmount" 
								min="0.1" max="100000" step="0.1" 
                                @change="depositDirty = true"
                                @keyup="depositDirty = true"
								:class="{ 'text-danger': isInvalidDeposit > 1 && depositAmount }"  								
							>
							<a href="#" class="mx-2 text-decoration-none text-primary" @click.prevent="depositMax()">MAX</a>
						</div>						
					</div>
					<div class="col-3 col-md-2 col-lg-4">
						<div class="d-grid gap-2">
							<button class="btn btn-warning btn-lg _btn fw-normal fs-6" v-if="approveRequired" type="button" :disabled="!gIsTxAllowed" @click="approve('MAX')">Approve</button>
							<button class="btn btn-primary btn-lg _btn fw-normal fs-6" type="button" v-if="!approveRequired" :disabled="!gIsTxAllowed || isInvalidDeposit != 1 || depositLocked || !$web3.account.chainValid" @click="deposit()">
								<span class="d-none d-sm-block">Deposit</span>
								<div class="_btn_icon _icon_deposit bg-white d-block d-sm-none"></div>
							</button>
						</div>
					</div>
					<!-- withdraw -->
					<div class="col-9 col-md-4 col-lg-8" v-if="$filters.compareAddress($user.wallet.owner, $web3.account.address)">
						<div class="d-flex  align-items-center p-1 _input" :class="{ '_is_invalid' : isInvalidWithdraw > 1 && withdrawAmount }">
							<span class="align-self-center mx-2 text-secondary">{{ $web3.paymentToken.symbol }}</span>
							<input class="form-control form-control-sm font-monospace text-center" 
								type="number"								
								placeholder="amount" 
								v-model="withdrawAmount" 
								min="0.1" max="100000" step="0.1"
                                @change="withdrawDirty = true" 
                                @keyup="withdrawDirty = true"
								:class="{ 'text-danger': isInvalidWithdraw > 1 && withdrawAmount }" 
							>
							<a href="#" class="mx-2 text-decoration-none text-primary" @click.prevent="withdrawMax()">MAX</a>
						</div>	
					</div>
					<div class="col-3 col-md-2 col-lg-4" v-if="$filters.compareAddress($user.wallet.owner, $web3.account.address)">
						<div class="d-grid gap-2">
							<button class="btn btn-danger btn-lg _btn fw-normal fs-6" type="button" :disabled="!gIsTxAllowed || isInvalidWithdraw != 1 || withdrawLocked || !$web3.account.chainValid" @click="withdraw()">
								<span class="d-none d-sm-block">Withdraw</span>
								<div class="_btn_icon _icon_withdraw bg-white d-block d-sm-none"></div>
							</button>
						</div>
					</div>
				</div> 

                <!-- Fees warning -->
				<div class="text-warning mb-2 small mt-2">
					Deposits don't incur any fee. Available deposit can be withdrawn at any time.
					<br> 
					Rewards are subject to {{ $web3.hubConfig.serviceFee / $web3.hubConfig.feeBase.toString() * 100 }}% service fee
				</div>
			</div>
             <!-- Alpha software warning -->
			<div class="badge bg-warning text-wrap rounded-2 text-warning text-center p-3 mt-2 bg-opacity-25  shadow-sm">
				Alpha software warning: the system might behave unstable. 
                <br>
                Use with caution!
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped> 
    //@import '@/scss/variables.scss';    
    ._btn_icon{
        height: 1.5rem;
    }
</style>

<script>
    import { ethers, utils } from 'ethers';
    export default {
        data() {
            return {
                depositAmount: null,
                depositDirty: false,
                depositLocked: false,
                
                withdrawAmount: null,
                withdrawDirty: false,
                withdrawLocked: false,
            };
        },
        mounted() {
            this.$mitt.on("approve", this.approve)

        },
        beforeUnmount() {
            this.$mitt.off("approve")
        },
        computed: {
            approveRequired() {
                if (!this.$user.wallet) return false
                if (!this.depositAmount) return false
                const depositAmount = utils.parseUnits(this.depositAmount.toString(), this.$web3.paymentToken.decimals)
                if (this.$user.wallet?.paymentTokenAllowance.lt(depositAmount)) return true
            },	
            isInvalidDeposit() {
                if (!this.depositDirty) return 0
                if (!this.depositAmount) return 2
                const amountBn = utils.parseUnits(this.depositAmount.toString(), this.$web3.paymentToken.decimals)
                if (amountBn.gt(this.$user.wallet.paymentTokenBalance)) return 3
                return 1
            },
            isInvalidWithdraw() {
                if (!this.withdrawDirty) return 0
                if (!this.withdrawAmount) return 2
                const amountBn = utils.parseUnits(this.withdrawAmount.toString(), this.$web3.paymentToken.decimals)
                if (amountBn.gt(this.$user.wallet.balance.sub(this.$user.wallet.locked))) return 3
                return 1
            }
        },
        methods: {
            async approve(amount) {
                if (amount === 'MAX') {
                    amount = ethers.constants.MaxUint256
                } else {
                    amount = utils.parseUnits(amount.toString(), this.$web3.paymentToken.decimals)
                }
                await this.gCallMethod({
                    title: "Approve", loader: true, emit: 'profile::update',
                    method: async function () {
                        return await this.$web3.paymentToken.instance.connect(this.$web3.account.signer).approve(this.$web3.hub.address, amount)
                    }.bind(this)
                })
            },
            depositMax() {
                this.depositAmount = utils.formatUnits(this.$user.wallet.paymentTokenBalance, this.$web3.paymentToken.decimals)
                this.depositDirty = true
            },        
            withdrawMax() {
                this.withdrawAmount = utils.formatUnits(this.$user.wallet.balance.sub(this.$user.wallet.locked), this.$web3.paymentToken.decimals)
                this.withdrawDirty = true
            },
            async deposit() {
                await this.gCallMethod({
                    title: "Deposit", loader: true, emit: 'profile::update',
                    method: async function () {
                        const depositAmount = utils.parseUnits(this.depositAmount.toString(), this.$web3.paymentToken.decimals)
                        const tx = await this.$web3.hub.instance.connect(this.$web3.account.signer).deposit(this.$user.profile.id, depositAmount)
                        this.depositLocked = true
                        return tx
                    }.bind(this),
                    callback: async function () {
                        this.depositAmount = null
                        this.depositDirty = false
                        this.depositLocked = false
                    }.bind(this),
                })
            },
            async withdraw() {
                await this.gCallMethod({
                    title: "Withdraw", loader: true, emit: 'profile::update',
                    method: async function () {
                        const withdrawAmount = utils.parseUnits(this.withdrawAmount.toString(), this.$web3.paymentToken.decimals)
                        const tx = await this.$web3.hub.instance.connect(this.$web3.account.signer).withdraw(this.$user.profile.id, withdrawAmount, { gasLimit: '1000000' })
                        this.withdrawLocked = true
                        return tx
                    }.bind(this),
                    callback: async function () {
                        this.withdrawAmount = null
                        this.withdrawDirty = false
                        this.withdrawLocked = false
                    }.bind(this),
                })
            },
        },
    };
</script>
