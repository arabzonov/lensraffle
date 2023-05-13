<template>
    <div class="text-center ">
        <div class="mb-2 h4" v-if="!$web3.account.address">
            <div>
                Please connect your wallet
            </div>
            <button type="button" class="btn btn-success btn-lg mx-2 mt-3" @click="$web3.connect()">
                Connect
            </button>
        </div>

        <div class="mb-4" v-if="$web3.account.address">
            <div class="h4">Connected wallet</div>
            <div class="text-break">
                <a :href="`${$web3.network.explorerUrl}address/${$web3.account.address}`" target="_blank" rel="noopener noreferrer">{{$web3.account.address}}</a>
            </div>
            
            <button type="button" class="btn btn-secondary mx-2 mt-3" @click="$web3.disconnect()">
                Disconnect wallet
            </button>
        </div>
        
        <div v-if="$web3.account.address"  class="d-flex justify-content-center flex-column">
            <template v-if="$user.profiles === null">
                <div class="h4">
                    In order to use service <br>  please login with your Lens profile
                </div>
                
                <button type="button" class="btn btn-success btn-lg mx-2 mt-3 mx-auto" @click="loginLens()">
                    Login
                </button>
            </template>

            <template v-if="$user.profiles?.length">
                <div class="h4">
                    Select profile to connect
                </div>
                
                <div class="list-group mx-auto mt-3">
                    <a href="#" @click.prevent="$user.selectProfile(profile, 'lottery')" class="list-group-item list-group-item-action fw-bold px-4" v-for="profile in $user.profiles">
                        <img :src="$user.profilePictureUrl(profile?.picture?.original?.url)" alt=";)" class="_avatar_picture me-2">
                        @{{ profile.handle }}
                    </a>                
                </div>
            </template>
            
            
            <div class="mt-3 h4 " v-if="$user.profiles != null && !$user.profiles.length">
                <div>You don't have Lens account</div>
                <div class="mb-2">Please follow link below and get one</div>                
                <a :href="$web3.chain.isMain ? 'https://claim.lens.xyz' : 'https://testnet.lenster.xyz/new/profile'" target="_blank" rel="noopener noreferrer" v-if="!$web3.chain.isMain">Create profile</a>
            </div>            
        </div>        
    </div>
</template>

<style lang="scss" scoped> 	
	._avatar_picture {
		width: 2rem;
		height: 2rem;
		border-radius: 10rem;
		overflow: hidden;
        object-fit: cover;
		img {
			width: 100%;
			height: 100%;
			
		}

	}
</style>

<script>
export default {
    components: {

    },

    data() {
        return {


        }
    },

    computed: {

    },

    watch: {
		
	},

    async mounted() {
        
    },

    beforeUnmount() {

    },

    methods: {        
        async loginLens() {
			this.gLoaderShow()
			try {
				await this.$user.loginLens(this.$web3)		
            } catch (error) {
                this.$swal({
					icon: 'error',
					title: 'Login error',
					text: this.gParseErrorMessage(error),
					timer: 3000,          
				});
            }
			this.gLoaderHide()
		},	
    },
}
</script>