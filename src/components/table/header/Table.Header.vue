<template>
	<div @scroll="sendScrollEvent"
		:class="{'v-table-header--disabled' : disabled}"
		class="v-table-header">
		<div
			ref="tableHeaderRow"
			:style="headerStyle"
			class="v-table-header__row">

			<!-- @slot Use this slot header-checkbox -->
			<slot name="header-checkbox"></slot>

			<!-- TH-Cells -->
			<div
				ref="headerCell"
				v-for="(item, idx) in renderMap"
				:key="idx"
				:data-key="item.key"
				:class="setClasses(item)"
				:style="setPositionLeft(item.key)"
				class="v-table-header__cell">
				<div class="v-table-header__cell-hero">
					<span class="v-table-header__cell-label">{{item.title}}</span>
					<TableHeaderDataSorting
						@sort="proxySortingEvent"
						:activeSortData="$attrs.activeSortData"
						:sortingComfig="item" />
				</div>
				<TableHeaderDataFilter
					@filter="proxyFilterEvent"
					:filterConfig="item"
					:scrollEvent="scrollEvent"
					:dateResetEvent="$attrs.filterDateResetEvent"
					:filterDelayMode="$attrs.filterDelayMode"
					:filterData="$attrs.filterData" />
			</div>

			<div
				v-if="showActionsLabel"
				class="v-table-header__column-actions">data actions</div>
		</div>
	</div>
</template>

<script>
/* components */
import TableHeaderDataFilter from './filter/Table.Header.DataFilter.vue';
import TableHeaderDataSorting from './Table.Header.DataSorting.vue';

export default {
	name: 'Table_Header',
	components: {
		TableHeaderDataSorting,
		TableHeaderDataFilter
	},
	inheritAttrs: false,
	props: {
		renderMap: Array,
		disabled: Boolean,
		headerStyle: Object,
		showActionsLabel: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		scrollEvent: false, /* for transfer header scroll event */
		stickyCellsPositions: []
	}),
	mounted () {
		this.calculatePositionsLeft();
	},
	methods: {
		/* transfer header scroll event */
		sendScrollEvent () {
			this.scrollEvent = !this.scrollEvent;
		},

		/* FOR STICKY */
		calculatePositionsLeft () {
			if (!this.isStickyRow) return;
			const rowChilds = [...this.$refs.tableHeaderRow.children];

			const cellsPositions = rowChilds.map(child => ({
				left: `${child.offsetLeft}px`,
				key: child.getAttribute('data-key')
			}));

			this.setCellsPositions(cellsPositions);
		},
		setCellsPositions (positions) {
			this.stickyCellsPositions = positions;
			this.$emit('set-cells-position', this.stickyCellsPositions);
		},
		setPositionLeft (cellKey) {
			const position = this.stickyCellsPositions.find(poitionData => poitionData.key === cellKey);
			return !position ? null : {left: position.left};
		},
		setClasses (item) {
			return {
				'v-table-header__cell--sticky': item.sticky,
				'v-table-header__cell--sticky-last': item.title === this.getNameLastStyky
			};
		},

		/* PROXY METHODS */
		proxySortingEvent (params) {
			this.$emit('sort', params);
		},
		proxyFilterEvent (params) {
			this.$emit('filter', params);
		}
	},
	computed: {
		getNameLastStyky () {
			if (!this.renderMap) return null;
			let name;
			this.renderMap.forEach(el => {
				if (!el.sticky) return;
				name = el.title;
			});
			return name;
		},
		isStickyRow () {
			if (!this.renderMap) return false;
			return this.renderMap.some(config => config.sticky);
		}
	}
};
</script>

<style>
.v-table-header {
	position: relative;
	display: grid;
	font-size: var(--row-fz);
	margin-bottom: 10px;
	background-color: #fff;
	overflow: hidden;
	transition: box-shadow .25s;
}
.v-table-header--disabled::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	/* width: var(--row-width); */
	width: 100%;
	height: 100%;
	background-color: rgba(255,255,255, .4);
	z-index: 52;
}
.v-table-header__row {
	/* width: var(--row-width); */
	display: grid;
}
.v-table-header .v-cbx {
	background-color: #fff;
}
.v-table-header__cell {
	font-size: 14px;
	text-transform: capitalize;
	margin-bottom: 10px;
	padding: 0 10px;
	background-color: #fff;
}
.v-table-header__cell:first-child {
	padding-left: 15px;
}
/* .v-table-header__cell {
	--sticky-left: 0;
} */
.v-table-header__cell--sticky {
	position: sticky;
	/* left: var(--sticky-left); */
	z-index: 50;
}
.v-table-header__cell--sticky-last::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--sticky-bs-left);
	transition: box-shadow .25s;
}

.v-table-header__cell-hero {
	display: flex;
	align-items: center;
	padding: 0 5px 8px;
}
.v-table-header__cell-label {
	font-size: 14px;
	white-space: nowrap;
}

/* Actions */
.v-table-header__column-actions {
	position: sticky;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	border-left: 1px solid var(--c-grey-4);
	font-size: 1rem;
	color: #232323;
	text-transform: capitalize;
	user-select: none;
	z-index: 50;
}
.v-table-header__column-actions::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--sticky-bs-right);
	transition: box-shadow .25s;
}
</style>
