<template>
	<div class="v-table__control-panel">
		<h3 class="v-table__label">{{tableLabel || 'Table label'}}</h3>
		<span class="control-panel__components-separator"></span>

		<TableLineHeightToggle />
		<span class="control-panel__components-separator"></span>

		<FilterResultCount :itemsCounts="$attrs.itemsCounts" class="mr-1" />
		<Tooltip
			content="Clear filters"
			placement="bottom">
			<button
				@click="clearFiltersData()"
				:disabled="filtersAreEmpty"
				class="btn-small mx-1 btn--red-2 icon-clear"></button>
		</Tooltip>
		<span class="control-panel__components-separator"></span>

		<Tooltip
			:content="getDataBtnDataDetails.tooltip"
			placement="bottom">
			<button
				@click="toggleDataDetails()"
				:class="getDataBtnDataDetails.class"
				class="btn-small mx-1 icon-file"></button>
		</Tooltip>

		<slot></slot>
		<span class="control-panel__components-separator"></span>

		<slot name="control-panel-btn-close"></slot>
	</div>
</template>

<script>
import TableLineHeightToggle from './modules/Table.LineHeightToggle.vue';
import FilterResultCount from './modules/FilterResultCount.vue';
import Tooltip from '@/components/lib/tooltips/Tooltip.vue';

export default {
	name: 'Table_ControlPanel',
	components: {
		TableLineHeightToggle,
		FilterResultCount,
		Tooltip
	},
	props: {
		tableLabel: String,
		filtersAreEmpty: {
			type: Boolean,
			default: false
		},
		dataDetailsIsShow: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		clearFiltersData () {
			this.$emit('clear-filters');
		},
		toggleDataDetails () {
			this.$emit('toggle-data-details');
		}
	},
	computed: {
		getDataBtnDataDetails () {
			return {
				tooltip: this.dataDetailsIsShow ? 'Hide row details' : 'Show row details',
				class: this.dataDetailsIsShow ? 'btn--orange-1' : 'btn--green-5'
			};
		}
	}
};
</script>

<style>
.v-table__control-panel {
	display: flex;
	align-items: center;
	padding: 5px 15px;
	margin-bottom: 5px;
	border-bottom: 1px solid var(--c-grey-4);
}
.v-table__label {
	font-size: 1.1rem;
	user-select: none;
	color: #232323;
}
.control-panel__components-separator {
	width: 1px;
	height: 95%;
	background-color: var(--c-grey-4);
	margin: 0 10px;
}
</style>
