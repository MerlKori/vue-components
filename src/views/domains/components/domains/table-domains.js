/* mixins */
import TableCheckbox from '@/mixins/table/checkboxes';
import TableDialogs from '@/mixins/table/table-dialogs';
import TableActionEdit from '@/mixins/table/actions/edit';
import TableActionCreate from '@/mixins/table/actions/create';
import TableActionDelete from '@/mixins/table/actions/delete';
import TableActionDeleteAll from '@/mixins/table/actions/delete-all';
import TableActionSendChanges from '@/mixins/table/actions/send-changes';

/* store */
import {mapState, mapGetters, mapMutations} from 'vuex';
import {listStoreModules} from '@/store';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';
import TableBtns, {BTNS_LIST} from '@/components/table/Table.Btns.vue';
import TableFooterInfo from '@/components/table/footer/Table.Footer.Info.vue';
import Tooltip from '@/components/lib/tooltips/Tooltip.vue';

/* other */
import api from '@/api';
import schemes from '@/schemes';
import utils from '@/utils';

export default {
	name: 'Table_Domains',
	mixins: [
		TableCheckbox,
		TableDialogs,
		TableActionEdit,
		TableActionCreate,
		TableActionDelete,
		TableActionDeleteAll,
		TableActionSendChanges
	],
	components: {
		VueTable,
		TableBtns,
		TableFooterInfo,
		Tooltip
	},
	inheritAttrs: false,
	data: () => ({
		BTNS_LIST,
		api: api.domains,
		scheme: schemes.Domains,
		selectedRowId: null
	}),
	created () {
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.create, this.mixin_create);
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.edit, this.mixin_edit);
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.delete, this.mixin_delete);
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.deleteAll, this.mixin_deleteAll);
	},
	destroyed () {
		this.resetDomainsTable();
	},
	methods: {
		...mapMutations(listStoreModules.TableDomains.name, {
			selectDomains: listStoreModules.TableDomains.types.mutations.SET_LIST_SELECT_DOMAINS,
			setModeMultiple: listStoreModules.TableDomains.types.mutations.SET_MODE_MULTIPLE
		}),

		/* select row */
		selectBodyRow (row) {
			if (this.multipleMode) return; /* disable fn on multipleMode */

			this.selectedRowId = row.id;
			this.selectDomains([row]); /* for table records */
		},
		// isSelectedRow (rowId) {
		// 	return this.selectedRowId === rowId;
		// },
		resetDomainsTable () {
			this.setModeMultiple(false);
			this.selectDomains([]);
		},
		setPositionsCells (positions) {
			const positionsCopy = utils._deepCopy(positions);
			const CbxWidth = 40;
			const handler = position => {
				position.left = this.multipleMode ? `${parseInt(position.left, 10) + CbxWidth}px` : `${parseInt(position.left, 10) - CbxWidth}px`;
			};
			positionsCopy.forEach(p => handler(p));

			return positionsCopy;
		},
		setRowsStyle () {
			const styleScheme = utils._deepCopy(this.scheme);

			styleScheme.style.bodyRow = this.multipleMode ? schemes.Domains.styleModeMultiple.bodyRow : schemes.Domains.style.bodyRow;
			styleScheme.style.header = this.multipleMode ? schemes.Domains.styleModeMultiple.header : schemes.Domains.style.header;
			this.scheme = styleScheme;
		},
		toggleTableMode () {
			this.setModeMultiple(!this.multipleMode);
			this.selectDomains([]);

			this.$refs.Table.rewriteCellsPositionsLeft(this.setPositionsCells);

			this.setRowsStyle();

			if (this.multipleMode) {
				this.selectedRowId = null;
			} else {
				this.mixin_resetCheckboxData();
			}
		}
	},
	computed: {
		...mapState(listStoreModules.TableDomains.name, {
			multipleMode: listStoreModules.TableDomains.types.state.MODE_MULTIPLE
		}),
		...mapGetters(listStoreModules.Data.name, {
			Getter_getDomains: listStoreModules.Data.types.getters.GET_DOMAINS
		}),
		getTableData () {
			return this.Getter_getDomains(this.scheme.reconfigMap);
		},
		getSelectedDomains () { /* only for multipleMode */
			return this.getTableData.filter(domain => this.mixin_checkbox.list.includes(domain.id));
		},
		actionDeleteAllIsDisable () {
			return !this.multipleMode || this.mixin_checkbox.list.length < 2;
		},
		getStyleBtnDeleteAll () {
			return {
				tooltip: this.multipleMode ? 'Enable multiple mode' : 'Disabled multiple mode',
				class: this.multipleMode ? 'btn--orange-1' : 'btn--green-5'
			};
		}
	},
	watch: {
		getSelectedDomains () {
			this.selectDomains(this.getSelectedDomains);
		},
		getTableData () {
			if (this.multipleMode) {
				this.selectDomains(this.getSelectedDomains);
				return;
			}

			if (!this.selectedRowId) return;
			const domain = this.getTableData.find(el => el.id === this.selectedRowId);
			this.selectDomains([domain]);
		}
	}
};
