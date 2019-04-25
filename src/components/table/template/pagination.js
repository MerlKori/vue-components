export default {
	data: () => ({
		bodyPages: {
			current: 1,
			itemsCount: 20 /* 20 default items on page */
		}
	}),
	methods: {
		/* resetPaginationData call in module Filtering */
		resetPaginationData () {
			this.bodyPages = {
				current: 1,
				itemsCount: 20 /* 20 default items on page */
			};
		}
	},
	computeds: {
		getSplitDataIntoGroups () {
			const groups = [];
			for (let i = 0; i < this.getBodyPagesCount; i++) {
				const start = i * this.bodyPages.itemsCount;
				const end = i * this.bodyPages.itemsCount + this.bodyPages.itemsCount;
				const group = this.getDataForRender.slice(start, end);
				groups.push(group);
			}
			return groups;
		},
		getBodyPagesCount () {
			return Math.ceil(this.getDataForRender.length / this.bodyPages.itemsCount);
		},
		getBodyPagesList () {
			return Array.from({length: this.getBodyPagesCount}, (value, idx) => idx + 1);
		},
		getItemsCurrentBodyPage () {
			return this.getSplitDataIntoGroups[this.bodyPages.current - 1];
		},
		generateVariantsItemsOnPage () {
			const list = [];
			for (let i = 0; i < 10; i++) {
				const count = 10 + 10 * i;
				list.push({value: count, label: count});
			}
			return list;
		},
		setItemsCountOnPage: {
			get () {
				return {value: this.bodyPages.itemsCount, label: this.bodyPages.itemsCount};
			},
			set (data) {
				this.bodyPages.current = 1;
				this.bodyPages.itemsCount = data.value;
			}
		}
	}
};
