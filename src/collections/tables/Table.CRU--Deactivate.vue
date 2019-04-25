<template>
	<div>
		<VueTable
			:scheme="scheme"
			:loadingProcess="$attrs.loadingProcess"
			:data="getTableData"
			:withActions="true"
			:highlightRow="getHighlightRow" >

			<!-- Constrol Panel -->
			<template slot="table-control-panel">
				<Tooltip
					content="Create new element"
					placement="bottom">
					<button
						@click="mixin_showDlgCreate()"
						class="btn-small mx-1 btn--blue-2 icon-plus"></button>
				</Tooltip>
				<Tooltip
					:content="getDataBtnForModeRenderAll.tooltip"
					placement="bottom">
					<button
						@click="toggleModeRenderAll()"
						:class="getDataBtnForModeRenderAll.class"
						class="btn-small mx-1"></button>
				</Tooltip>
			</template>

			<!-- ROW -->
			<template
				slot-scope="{row}"
				slot="row-buttons">
				<TableBtns
					v-if="row.active"
					@click.native="mixin_showDlgEdit(row)"
					:type="BTNS_LIST.edit" />
				<TableBtns
					v-if="row.active"
					@click.native="showDlgDeactivate(row)"
					:type="BTNS_LIST.deactivate" />
				<TableBtns
					v-if="!row.active"
					@click.native="activate(row)"
					:type="BTNS_LIST.activate" />
			</template>
		</VueTable>

	<!-- DIALOGS -->
	<TableDlgWrapper
		@close-dlg="mixin_hideDlg"
		:visibility="dlg.visibility">
		<TableDlgContent
			@close-dlg="mixin_hideDlg"
			@save="mixin_handlerDlgEvent(arguments[0], data)"
			:type="dlg.type"
			:data="dlg.data"
			:dlgStyle="scheme.style.forms" />
	</TableDlgWrapper>
	</div>
</template>

<script>
/* store */
import {mapMutations, mapActions} from 'vuex';
import {listStoreModules} from '@/store/index';

/* mixins */
import TableDialogs from '@/mixins/table/table-dialogs';
import TableActionEdit from '@/mixins/table/actions/edit';
import TableActionCreate from '@/mixins/table/actions/create';
import TableActionSendChanges from '@/mixins/table/actions/send-changes';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';
import TableBtns, {BTNS_LIST} from '@/components/table/Table.Btns.vue';
import Tooltip from '@/components/lib/tooltips/Tooltip.vue';

export default {
	name: 'Table_CRU_Deactivate',
	mixins: [
		TableDialogs,
		TableActionEdit,
		TableActionCreate,
		TableActionSendChanges
	],
	components: {
		VueTable,
		TableBtns,
		Tooltip
	},
	props: {
		api: Object,
		scheme: Object,
		data: Array,
		dataTransfer: String
	},
	data: () => ({
		BTNS_LIST,
		activeItems: [],
		inActibeItems: [],
		modeRenderAll: false
	}),
	created () {
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.deactivate, this.deactivate);
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.create, this.mixin_create);
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.edit, this.mixin_edit);
	},
	methods: {
		...mapActions(listStoreModules.Data.name, {
			sendDataChanges: listStoreModules.Data.types.actions.SEND_DATA_CHANGES
		}),
		...mapMutations(listStoreModules.Notifications.name, {
			showNotification: listStoreModules.Notifications.types.mutations.CREATE_NOTIFICATIONS
		}),

		toggleModeRenderAll () {
			this.modeRenderAll = !this.modeRenderAll;
		},

		/* dectivate/activate item */
		showDlgDeactivate (element) {
			const type = this.dlg.LIST_DLG.deactivate;
			const data = {
				title: 'Deactivate this element?',
				subtitle: 'Are you sure want to deactivate this element ? Later this element can be restored.',
				element
			};
			this.mixin_showDlg(type, data);
		},
		deactivate () {
			const deactivateEl = Object.assign({}, this.dlg.data.element);
			/* 0 = false */
			deactivateEl.active = 0;
			this.sendDataChanges({
				api: this.api,
				entity: this.scheme.entity,
				action: 'edit',
				data: deactivateEl
			})
				.then(() => {
					this.mixin_hideDlg();
				});
		},
		activate (element) {
			const el = Object.assign({}, element);
			el.active = 1; /* 1 - key true */
			this.sendDataChanges({
				api: this.api,
				entity: this.scheme.entity,
				action: 'edit',
				data: el
			})
				.then(() => {
					this.mixin_hideDlg();

					this.showNotification({
						title: 'Success',
						msg: 'Item activated.',
						type: 'success'
					});
				});
		},

		/* separation of data into active and inactive */
		separationData () {
			this.activeItems = [];
			this.inActibeItems = [];
			this.data.forEach(i => {
				if (!i.active) {
					this.inActibeItems.push(i);
				} else {
					this.activeItems.push(i);
				}
			});
		}
	},
	computed: {
		getTableData () {
			return this.modeRenderAll ? [...this.activeItems, ...this.inActibeItems] : this.activeItems;
		},
		getHighlightRow () {
			return this.data.find(row => row.name === this.dataTransfer);
		},
		getDataBtnForModeRenderAll () {
			return {
				tooltip: this.modeRenderAll ? 'Hide inactive items' : 'Show inactive items',
				class: this.modeRenderAll ? ['btn--orange-1', 'icon-hide'] : ['btn--green-5', 'icon-eye']
			};
		}
	},
	watch: {
		data: {
			handler () {
				this.separationData();
			},
			immediate: true
		},
		dataTransfer: {
			handler () {
				if (!this.getHighlightRow || this.getHighlightRow.active !== 0) return; /* .active === 0 it`s deactive item */
				this.modeRenderAll = true;
			},
			immediate: true
		}
	}
};
</script>
