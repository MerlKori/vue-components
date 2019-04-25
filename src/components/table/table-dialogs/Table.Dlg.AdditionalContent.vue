<template>
	<div class="dlg-additional-content">
		<VueTable
			class="dlg-additional-content__table"
			:scheme="scheme"
			:withActions="true"
			:data="getAddContentData"
			>
			<button
				slot="control-panel-btn-close"
				@click="close"
				class="dlg-additional-content__btn-close btn--red-2 icon-close-2">
			</button>

			<TableBtns
				slot="row-buttons"
				slot-scope="{row}"
				@click.native="linkElement(row)"
				:type="btnType" />
		</VueTable>
	</div>
</template>

<script>
/* store */
import {mapState, mapGetters, mapActions} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';
import TableBtns, {BTNS_LIST} from '@/components/table/Table.Btns.vue';

export default {
	name: 'Dlg_AdditionalContent',
	components: {
		VueTable,
		TableBtns
	},
	data: () => ({
		btnType: BTNS_LIST.link
	}),
	methods: {
		...mapActions(listStoreModules.DlgAddContent.name, {
			close: listStoreModules.DlgAddContent.types.actions.HIDE_ADD_CONTENT,
			linkElement: listStoreModules.DlgAddContent.types.actions.ADD_LINK
		})
	},
	computed: {
		...mapState(listStoreModules.DlgAddContent.name, {
			scheme: listStoreModules.DlgAddContent.types.state.TABLE_SCHEME
		}),
		...mapGetters(listStoreModules.Data.name, {
			getExtenddData: listStoreModules.Data.types.getters.GET_EXTEND_DATA
		}),
		getAddContentData () {
			return this.getExtenddData(this.scheme.reconfigMap, this.scheme.entity);
		}
	}
};
</script>

<style>
.dlg-additional-content {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.dlg-additional-content__btn-close {
	margin-left: auto;
	padding: 3px;
	font-size: 14px;
	border-radius: 3px;
}
.dlg-additional-content__table {
	height: 100%;
}
</style>
