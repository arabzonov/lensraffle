import router from '@/router';
import { defineStore } from 'pinia';
import { lensClient } from '@/api/lens';
import { ipfsUrl } from '@/api/ipfs'
import { web3Store } from '@/store/web3.store'

const selectedProfileIdStorageKey = APP_NAME + '_PROFILE_ID';

export const userStore = defineStore('user', {
	state: () => ({
		userProfile: null,
		userWallet: null,
		userProfiles: null,
		selectedProfileId: localStorage.getItem(selectedProfileIdStorageKey)
	}),

	getters: {
		loggedIn: (state) => !!state.userProfile.id,
		profile: (state) => state.userProfile,
		wallet: (state) => state.userWallet,
		profiles: (state) => state.userProfiles,
		profilePictureUrl: () => {
			return function (originalUrl) {				
				if (!originalUrl) return '/img/profile.webp'
				return ipfsUrl(originalUrl)	
			}
		},
		getLocale: () => navigator?.languages?.length ? navigator.languages[0] : navigator.language,
	},

	actions: {
		setUser(user) {
			this.user = user;
		},
		
		async setWallet(data) {
			this.userWallet = data
		},

		async switchProfile() {
			this.userProfiles = (await lensClient.profile.fetchAll({
				ownedBy: [web3Store().account.address],
			})).items			
			try { 
				router.push({ name: 'login' }) 
			} catch (error) {
				////console.log(error)
			}
		},

		selectProfile(profile, redirect) {
			this.userProfile = profile
			localStorage.setItem(selectedProfileIdStorageKey, profile.id);
			
			if (!redirect) return
			try { 
				router.push({ name: redirect }) 
			} catch (error) {
				////console.log(error)
			}
		},

		async getProfile() {						
			this.userProfiles = (await lensClient.profile.fetchAll({
				ownedBy: [web3Store().account.address],
			})).items

			if (!this.userProfiles.length) return this.logout()
			
			if (this.userProfiles.length == 1) {
				return this.selectProfile(this.userProfiles[0])
			} 
				
			if (this.selectedProfileId) {
				const profile = this.userProfiles.find(p => p.id === this.selectedProfileId)
				if (profile) {
					this.selectProfile(profile)
				} else {
					this.selectProfile(this.userProfiles[0])
				}
			}			
		},

		async loginLens() {
			const address = web3Store().account.address;
			const challengeResp = await lensClient.authentication.generateChallenge(address)			
			const signature = await web3Store().signMessage(challengeResp);
			await lensClient.authentication.authenticate(address, signature)
			
			this.userProfiles = (await lensClient.profile.fetchAll({
				ownedBy: [web3Store().account.address],
			})).items
			if (this.userProfiles.length == 1) {
				this.selectProfile(this.userProfiles[0], 'lottery')
			}
		},
		
		async logout() {
			this.userWallet = null;
			this.userProfile = null;
			this.userProfiles = null;

			localStorage.removeItem(selectedProfileIdStorageKey);

			const lensCredentialsStorageKey = `lens.${IS_MAIN_CHAIN ? 'production' : 'development'}.credentials`
			localStorage.removeItem(lensCredentialsStorageKey)
			
			localStorage.removeItem('lens-lit-authsig')
			try { 
				router.push({ name: 'login' }) 				
			} catch (error) { 
				////console.log(error)				
			}
			location.reload()			
		},

		
	},
});
