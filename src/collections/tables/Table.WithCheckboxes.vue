<template>
	<VueTable
		@reset-cbx="mixin_resetCheckboxData"
		:scheme="scheme"
		:loadingProcess="$attrs.loadingProcess"
		:data="getTableData">

		<VueCheckbox
			slot="header-checkbox"
			v-model="mixin_toggleAllCeckboxes"
			:disabled="mixin_checkboxIsDisable"
			class="v-table-cell--sticky-left" />

		<TableBodyCheckbox
			slot="row-checkbox"
			slot-scope="{row}"
			@select="mixin_select(row.id)"
			@deselect="mixin_deselect(row.id)"
			:checked="mixin_isChecked(row.id)"
			class="v-table-cell--sticky-left" />

		<!-- TABLE FOOTER -->
		<TableFooterInfo
			slot="table-footer"
			:selectedCount="mixin_checkbox.list.length" />
	</VueTable>
</template>

<script>
/* mixins */
import TableCheckbox from '@/mixins/table/checkboxes';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';
import TableFooterInfo from '@/components/table/footer/Table.Footer.Info.vue';

export const tableEvents = {
	reset: 'reset-selected-items',
	select: 'add-selected-items'
};

export default {
	name: 'Table_With_Checkboxes',
	mixins: [TableCheckbox],
	components: {
		VueTable,
		TableFooterInfo
	},
	props: {
		scheme: {
			type: Object,
			default: () => ({})
		},
		data: Array
	},
	methods: {
		addSelectedItems (list) {
			this.mixin_checkbox.list = [...this.mixin_checkbox.list, ...list];
		}
	},
	computed: {
		getSelectedList () { /* only for watch */
			return this.mixin_checkbox.list;
		},
		getTableData () { /* for mixin checkbox */
			return this.data;
		}
	},
	watch: {
		getSelectedList () {
			this.$emit('select-items', this.getSelectedList);
		}
	}
};
</script>
