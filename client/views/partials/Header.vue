<template>
	<header class="border-bottom bg-white shadow-sm py-1">
		<div class="container d-flex justify-content-between  px-3">
			<!-- Left side -->
			<div class="d-flex justify-content-center align-self-center fs-5">
				<div class="align-self-center" v-if="$user.profile">
					<router-link to="/lottery" class="mx-2 text-decoration-none fs-6 text-dark fw-bold px-6 py-1 d-block align-self-center">Lottery</router-link>
				</div>

				<!--div>
					{{ $breakpoint.current }}
				</div-->
			</div>   
			
			<!-- Right side -->
			<div class="d-flex" v-if="$user.profile">
				<!-- Toggle -->
				<div class="dropdown dropstart align-self-center">				
					<div class="_toggler align-self-center" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,10">            
						<div><span></span><span></span><span></span><span></span></div>            
					</div>
									
					<ul class="dropdown-menu ">
						<li>
							<a class="dropdown-item" :href="lensterUrl + 'u/' + $user.profile.handle" target="_blank">								
								<div class="small mb-1">Logged in as</div>
								<div class="fw-bold">@{{ $user.profile.handle }}</div>
							</a>							
						</li>

						<li><hr class="dropdown-divider"></li>

						<li v-if="$user.profiles.length > 1">
							<a class="dropdown-item fw-bold fs-6 d-flex align-items-center " href="#" @click.prevent="$user.switchProfile()">								
								<div class="_icon_switch bg-primary me-2"></div>								
								Switch profile
							</a>
						</li>

						<li>
							<a class="dropdown-item fw-bold fs-6 d-flex align-items-center " href="#" @click.prevent="$user.logout()">								
								<div class="_icon_sign_out bg-primary me-2"></div>	
								Logout
							</a>							
						</li>																
					</ul>
				</div>
			</div> 	
		</div>
					
	</header>			
</template>

<style lang="scss" scoped>
	@import '@/scss/variables.scss';
	._toggler {
		border: none;
		padding-right: 0;
		z-index: 1000;	
		display: flex;	
		div {
			align-self: center;
			width: 22px;  
			height: 18px;
			position: relative;        
			transform: rotate(0deg);      
			transition: .5s ease-in-out;
			cursor: pointer;
			span {
				display: block;
				position: absolute;
				height: 2px;
				width: 100%;
				background: $dark;
				border-radius: 2px;
				opacity: 1;
				left: 0;        
				transform: rotate(0deg);        
				transition: .25s ease-in-out;
				&:nth-child(1) { top: 0px; }
				&:nth-child(2), &:nth-child(3) { top: 8px; }
				&:nth-child(4) { top: 16px; }        
			}
			&.open {
				span{
					&:nth-child(1) {
						//top: 6px;
						width: 0%;
						left: 50%;
					}
					&:nth-child(2) {
						transform: rotate(45deg);
					}
					&:nth-child(3) {
						transform: rotate(-45deg);
					}
					&:nth-child(4) {
						//top: 14px;
						width: 0%;
						left: 50%;
					}
				}
			}
		}
	}
    a {
		padding: .4rem .8rem;
		&.router-link-active {
			pointer-events: none;
			// opacity: .5;
			background-color: darken($body-bg, 5) ;
			border-radius: 8px;
			//
		}
	}
	._logo {
		max-height: 3rem;
    	padding: 0.3rem;
	}   
</style>

<script>
	export default {
		data() {
			return {
				profiles: [],
				menuOpened: false,
				lensterUrl: LENSTER_URL
			};
		},
		mounted() {
			//this.$mitt.on("web3::connected", this.updateProfiles);			
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
	};
</script>
