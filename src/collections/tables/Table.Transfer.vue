<template>
	<div class="table-transfer" >
		<TableWithCheckboxes
			ref="tableTop"
			@select-items="selectedTopTableItems"
			:scheme="getTopData.scheme"
			:data="getTopData.data"
			:loadingProcess="getTopData.loadingProcess"
			class="table-transfer__top"
		/>

		<MovementButtons
			@moveUp="$emit('transfer-to-top', selectedItemBottom)"
			@moveDown="$emit('transfer-to-bottom', selectedItemTop)"
			:disableUp="selectedItemBottom.length === 0"
			:disableDown="selectedItemTop.length === 0" />

		<TableWithCheckboxes
			ref="tableBottom"
			@select-items="selectedBottomTableItems"
			:scheme="getBottomData.scheme"
			:data="getBottomData.data"
			:loadingProcess="getBottomData.loadingProcess"
			class="table-transfer__bottom"
		/>
	</div>
</template>

<script>
/* components */
import MovementButtons from '@/components/MovementButtons.vue';
import TableWithCheckboxes from '@/collections/tables/Table.WithCheckboxes.vue';

export default {
	name: 'Table_Transfer',
	props: {
		tableTopData: Object,
		tableBottomData: Object
	},
	components: {
		MovementButtons,
		TableWithCheckboxes
	},
	data: () => ({
		selectedItemTop: [],
		selectedItemBottom: []
	}),
	methods: {
		setDefaultData (tableData) {
			if (tableData) return tableData;
			return {
				data: [],
				sheme: {},
				loadingProcess: false
			};
		},

		/* SET selected items */
		selectedTopTableItems (data) {
			this.selectedItemTop = data;
		},
		selectedBottomTableItems (data) {
			this.selectedItemBottom = data;
		},

		/* transfers */
		taransferItemsToTop (ids) {
			this.$refs.tableTop.addSelectedItems(ids);
			this.$refs.tableBottom.mixin_resetCheckboxData();
		},
		taransferItemsToBottom (ids) {
			this.$refs.tableBottom.addSelectedItems(ids);
			this.$refs.tableTop.mixin_resetCheckboxData();
		}
	},
	computed: {
		getTopData () {
			return this.setDefaultData(this.tableTopData);
		},
		getBottomData () {
			return this.setDefaultData(this.tableBottomData);
		}
	}
};
</script>

<style>
.table-transfer__bottom,
.table-transfer__top {
	height: calc(50vh - 26px);
}
</style>
