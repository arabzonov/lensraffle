<template>
	<div class="fs-5">
		<a v-if="firstLastButton" @click="selectFirstPage()" @keyup.enter="selectFirstPage()" class="text-decoration-none fw-bold mx-3 pointer"
			:class="[firstPageSelected ? disabledClass : '']" tabindex="0" v-html="firstButtonText"></a>
		<a v-if="!(firstPageSelected && hidePrevNext)" @click="prevPage()" @keyup.enter="prevPage()" class="text-decoration-none fw-bold mx-3 pointer"
			:class="[firstPageSelected ? disabledClass : '']" tabindex="0" v-html="prevText"></a>
		<template v-for="(page, index) in pages" :key="'p_page2_'+index">
			<a v-if="page.breakView" class="text-decoration-none fw-bold mx-3 pointer" :class="[page.disabled ? disabledClass : '']" tabindex="0">
				<slot name="breakViewContent">{{ breakViewText }}</slot>
			</a>
			<a v-else-if="page.disabled" class="text-decoration-none fw-bold mx-3 pointer" :class="[page.selected ? activeClass : '', disabledClass]"
				tabindex="0">{{ page.content }}</a>
			<a v-else @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)"
				class="text-decoration-none fw-bold mx-3 pointer" :class="[page.selected ? activeClass : '']" tabindex="0">{{ page.content }}</a>
		</template>
		<a v-if="!(lastPageSelected && hidePrevNext)" @click="nextPage()" @keyup.enter="nextPage()" class="text-decoration-none fw-bold mx-3 pointer"
			:class="[lastPageSelected ? disabledClass : '']" tabindex="0" v-html="nextText"></a>
		<a v-if="firstLastButton" @click="selectLastPage()" @keyup.enter="selectLastPage()" class="text-decoration-none fw-bold mx-3 pointer"
			:class="[lastPageSelected ? disabledClass : '']" tabindex="0" v-html="lastButtonText"></a>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/scss/variables.scss'; 
	._disabled {
		pointer-events: none;
		color: $gray-400;
	}
	._active {
		pointer-events: none;
		color: $gray-400;
	}
</style>

<script>
export default {
	name: "PaginateComponent",
	props: {
		value: {
			type: Number
		},
		pageCount: {
			type: Number,
			required: true
		},
		forcePage: {
			type: Number
		},
		clickHandler: {
			type: Function,
			default: () => { }
		},
		pageRange: {
			type: Number,
			default: 3
		},
		marginPages: {
			type: Number,
			default: 1
		},
		prevText: {
			type: String,
			default: 'Prev'
		},
		nextText: {
			type: String,
			default: 'Next'
		},
		breakViewText: {
			type: String,
			default: '…'
		},

		activeClass: {
			type: String,
			default: '_active'
		},
		disabledClass: {
			type: String,
			default: '_disabled'
		},

		firstLastButton: {
			type: Boolean,
			default: false
		},
		firstButtonText: {
			type: String,
			default: 'First'
		},
		lastButtonText: {
			type: String,
			default: 'Last'
		},
		hidePrevNext: {
			type: Boolean,
			default: false
		}
	},
	beforeUpdate() {
		if (this.forcePage === undefined) return
		if (this.forcePage !== this.selected) {
			this.selected = this.forcePage
		}
	},
	computed: {
		selected: {
			get: function () {
				if (this.forcePage !== this.value) return this.forcePage
				return this.value || this.innerValue
			},
			set: function (newValue) {
				this.innerValue = newValue
			}
		},
		pages: function () {
			let items = {}
			if (this.pageCount <= this.pageRange) {
				for (let index = 0; index < this.pageCount; index++) {
					let page = {
						index: index,
						content: index + 1,
						selected: index === (this.selected - 1)
					}
					items[index] = page
				}
			} else {
				const halfPageRange = Math.floor(this.pageRange / 2)

				let setPageItem = index => {
					let page = {
						index: index,
						content: index + 1,
						selected: index === (this.selected - 1)
					}

					items[index] = page
				}

				let setBreakView = index => {
					let breakView = {
						disabled: true,
						breakView: true
					}

					items[index] = breakView
				}

				// 1st - loop thru low end of margin pages
				for (let i = 0; i < this.marginPages; i++) {
					setPageItem(i);
				}

				// 2nd - loop thru selected range
				let selectedRangeLow = 0;
				if (this.selected - halfPageRange > 0) {
					selectedRangeLow = this.selected - 1 - halfPageRange;
				}

				let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
				if (selectedRangeHigh >= this.pageCount) {
					selectedRangeHigh = this.pageCount - 1;
					selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
				}

				for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
					setPageItem(i);
				}

				// Check if there is breakView in the left of selected range
				if (selectedRangeLow > this.marginPages) {
					setBreakView(selectedRangeLow - 1)
				}

				// Check if there is breakView in the right of selected range
				if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
					setBreakView(selectedRangeHigh + 1)
				}

				// 3rd - loop thru high end of margin pages
				for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
					setPageItem(i);
				}
			}
			return items
		},
		firstPageSelected() {
			return this.selected === 1
		},
		lastPageSelected() {
			return (this.selected === this.pageCount) || (this.pageCount === 0)
		},
	},
	data() {
		return {
			innerValue: 1,
		}
	},
	methods: {
		handlePageSelected(selected) {
			if (this.selected === selected) return

			this.innerValue = selected
			this.$emit('input', selected)
			this.clickHandler(selected)
		},
		prevPage() {
			if (this.selected <= 1) return

			this.handlePageSelected(this.selected - 1)
		},
		nextPage() {
			if (this.selected >= this.pageCount) return

			this.handlePageSelected(this.selected + 1)
		},

		selectFirstPage() {
			if (this.selected <= 1) return

			this.handlePageSelected(1)
		},
		selectLastPage() {
			if (this.selected >= this.pageCount) return

			this.handlePageSelected(this.pageCount)
		}
	}
}
</script>