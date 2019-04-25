<template>
	<div class="table-group">
		<!-- Main Table-->
		<VueTable
			@select-row="setSubTableItems"
			:scheme="mainTable.scheme"
			:data="getMainItems"
			:loadingProcess="mainTable.loadingProcess"
			class="table-group__tables" />

		<!-- Sub Table -->
		<VueTable
			:scheme="subTable.scheme"
			:data="getSubItems"
			class="table-group__tables" />
	</div>
</template>

<script>
/* components */
import VueTable from '@/components/table/template/VueTable.vue';

/* other */
import utils from '@/utils';

export default {
	name: 'Tables_Group_Main_Sub',
	components: {VueTable},
	props: {
		mainTable: {
			type: Object,
			default: () => ({
				scheme: {},
				items: [],
				defSorting: null,
				loadingProcess: false
			})
		},
		subTable: {
			type: Object,
			default: () => ({
				scheme: {},
				defSorting: null,
				setData (data) {
					return data;
				}
			})
		}
	},
	data: () => ({
		subTableItems: []
	}),
	methods: {
		setSubTableItems (row) {
			this.subTableItems = this.subTable.setData(row);
		},
		getSortingItems (items, defSorting) {
			if (!items) return [];
			if (!defSorting || !defSorting.key || !defSorting.value) return items;

			return utils._dataSortingByKey(items, defSorting.key, defSorting.value);
		}
	},
	computed: {
		getMainItems () {
			const itemsCopy = utils._deepCopy(this.mainTable.items);
			return this.getSortingItems(itemsCopy, this.mainTable.defSorting);
		},
		getSubItems () {
			return this.getSortingItems(this.subTableItems, this.subTable.defSorting);
		}
	}
};
</script>

<style>
.table-group {
	display: flex;
	flex-direction: column;
	height: 100vh;
}
.table-group__tables {
	flex-grow: 1;
	flex-shrink: 0;
	margin: 0 0 15px 0;
	height: calc(50vh - 40px);
}
</style>
