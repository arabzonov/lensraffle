import { defineStore } from 'pinia'

export const lotteryItemsStore = defineStore('lotteryItems', {
	state: () => ({ 
        items: []
	}),
	getters: {
        
	},
	actions: {
		setItems(items) {
			this.items = items
			////console.log('setItems', items)
		},

        startLottery(lottery) {
			const index = this.items.findIndex(item => item.profile.id === lottery.profileId && !item.lottery.id)
			if (index > -1) {
				this.items[index].lottery = lottery
				this.items[index].locked = false
			}
		},
        
		updateLottery(lottery) {
			const index = this.items.findIndex(item => item.lottery.id === lottery.id)
			if (index > -1) {
				this.items[index].lottery = lottery
				this.items[index].locked = false
			}
		},

        removeLottery(lotteryId) {
			const index = this.items.findIndex(item => item.lottery.lotteryId === lotteryId)
			if (index > -1) {
				this.items.splice(index, 1)
			}
		},
                	
		updateFollowers(follow) {
			const pIndex = this.items.findIndex(item => item.lottery.lotteryId === follow.lotteryId)
			if (pIndex > -1) {
				const mIndex = this.items[pIndex].followers.findIndex(f => f.id === follow.id)
				if (mIndex > -1) {
					this.items[pIndex].followers[mIndex] = follow
				} else {
					this.items[pIndex].followers.push(follow)
				}
                this.items[pIndex].profile.isFollowedByMe = true
				this.items[pIndex].locked = false
                this.items[pIndex].isEligible = false
			}
		},
		
		addOptimisticLottery(lottery, profile) {
			const pIndex = this.items.findIndex(item => item.lottery.id === lottery.id)
			if (pIndex == -1) {
				this.items.unshift({
					lottery,
					profile,
					followers: [],
					locked: true
				})
			}			
		},

		setLocked(id, state) {
			const index = this.items.findIndex(item => item.lottery.id === id)
			if (index > -1) this.items[index].locked = state
		},

		setFollowConfirming(profileId, state) {
			this.items.forEach((item, i) => {
				if (item.publication.profile.id === profileId) this.items[i].followConfirming = state
			})
		},
		setFollowing(profileId, state) {
			this.items.forEach((item, i) => {
				if (item.profile.id === profileId) this.items[i].profile.isFollowedByMe = state
			})
		},	
        
	}
})
