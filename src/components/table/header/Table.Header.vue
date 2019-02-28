<template>
	<div
		:style="headerStyle"
		:class="{'v-table__header--disabled' : disabled}"
		class="v-table__header">

		<!-- @slot Use this slot header-checkbox -->
		<slot name="header-checkbox"></slot>

		<!-- TH-Cells -->
		<div
			v-for="(item, idx) in renderMap"
			:key="idx"
			class="v-table-header-cell">
			<div class="v-table-header-cell__hero">
				<span class="v-table-header-cell__label">{{item.title}}</span>
				<TableHeaderDataSorting
					@sort="proxySortingEvent"
					:activeSortData="$attrs.activeSortData"
					:sortingComfig="item" />
			</div>
			<TableHeaderDataFilter
				@filter="proxyFilterEvent"
				:filterConfig="item"
				:filterDelayMode="$attrs.filterDelayMode" />
		</div>

		<!-- buttons to switch heights body rows -->
		<TableLineHeightToggle />
	</div>
</template>

<script>
/* components */
import TableLineHeightToggle from './Table.Header.LineHeightToggle.vue';
import TableHeaderDataFilter from './Table.Header.DataFilter.vue';
import TableHeaderDataSorting from './Table.Header.DataSorting.vue';

export default {
	name: 'Table_Header',
	components: {
		TableHeaderDataSorting,
		TableHeaderDataFilter,
		TableLineHeightToggle
	},
	inheritAttrs: false,
	props: {
		renderMap: Array,
		disabled: Boolean,
		headerStyle: Object
	},
	methods: {
		proxySortingEvent (params) {
			this.$emit('sort', params);
		},
		proxyFilterEvent (params) {
			this.$emit('filter', params);
		}
	}
};
</script>

<style>
.v-table__header {
	position: relative;
	display: grid;
	grid-gap: 10px;
	width: 100%;
	font-size: var(--row-fz);
	padding: 0 0 0 1em;
	margin-bottom: 10px;
	background-color: #fff;
	overflow: hidden;
	transition: box-shadow .25s;
}
.v-table__header--disabled::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255,255,255, .4);
	z-index: 25;
}
.v-table-header-cell {
	font-size: 14px;
	text-transform: capitalize;
	margin-bottom: 10px;
}
.v-table-header-cell__hero {
	display: flex;
	align-items: center;
	padding: 0 5px 8px;
}
.v-table-header-cell__label{
	font-size: 14px;
	white-space: nowrap;
}
</style>
