import utils from '@/utils';

export default {
	data: () => ({
		mixin_cellsPositions: []
	}),
	methods: {
		mixin_clearFilters () {
			this.$refs.TableHeader.sendDateResetEvent();
			this.mixin_clearFilters();
		},
		mixin_setRowsData (row) {
			const SCROLL_BAR_WIDTH = 18;
			this.cellsPositions = row.cellsPositions;
			this.$refs.Table.$el.style.setProperty('--row-width', `${row.width - SCROLL_BAR_WIDTH}px`);
		}
	},
	computed: {
		mixin_getDataForRender () {
			const copyData = utils._deepCopy(this.items);
			const filteredData = this.mixin_getFilteredData(copyData);
			return this.mixin_sortingData(filteredData);
		},
		mixin_isEmpty () {
			return this.items.length === 0;
		}
	}
};
