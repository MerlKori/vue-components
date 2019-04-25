<template>
	<div class="container--h100">
		<VueTable
			@reset-cbx="mixin_resetCheckboxData"
			:scheme="scheme"
			:data="getTableData"
			:loadingProcess="loadingProcess"
			:withActions="true">

			<!-- Constrol Panel -->
			<template slot="table-control-panel">
				<Tooltip
					content="Add to rotaion voluum"
					placement="bottom">
					<button
						@click="setVisibilityBindingData(true)"
						class="btn-small mx-1 btn--blue-2 icon-plus"></button>
				</Tooltip>
				<Tooltip
					content="Remove from rotaion voluum"
					placement="bottom">
					<button
						@click="mixin_showDlgDeleteAll(getSelectedDomains)"
						:disabled="mixin_checkbox.list.length < 2"
						class="btn-small btn--red-2 icon-trash mx-1"></button>
				</Tooltip>
			</template>

			<VueCheckbox
				slot="header-checkbox"
				v-model="mixin_toggleAllCeckboxes"
				:disabled="mixin_checkboxIsDisable"
				class="v-table-cell--sticky-left"
			/>
			<TableBodyCheckbox
				slot="row-checkbox"
				slot-scope="{row}"
				@select="mixin_select(row.id)"
				@deselect="mixin_deselect(row.id)"
				:checked="mixin_isChecked(row.id)"
				class="v-table-cell--sticky-left"
			/>
			<TableBtns
				slot="row-buttons"
				slot-scope="{row}"
				@click.native="mixin_showDlgDelete(row)"
				:type="BTNS_LIST.delete" />

			<!-- TABLE FOOTER -->
			<TableFooterInfo
				slot="table-footer"
				class="ml-4"
				:selectedCount="mixin_checkbox.list.length" />
		</VueTable>

		<!-- DIALOGS -->
		<TableDlgWrapper
			@close-dlg="mixin_hideDlg"
			:visibility="dlg.visibility">
			<TableDlgContent
				@close-dlg="mixin_hideDlg"
				@save="mixin_handlerDlgEvent(arguments[0], getTableData)"
				:type="dlg.type"
				:data="dlg.data"
				:dlgStyle="scheme.style.forms"
			/>
		</TableDlgWrapper>

		<!-- Binding Domains with Resources -->
		<DataBinding
			ref="dataBinding"
			@send-on-rotate="sendOnRotation"
			@close-popup="setVisibilityBindingData(false)"
			:visibility="visibilityBindingData"
			:domains="getDomainsGroups.other"
			:resources="getResources" />
	</div>
</template>

<script>
/* store */
import {mapState, mapGetters, mapActions} from 'vuex';
import {listStoreModules} from '@/store/index';

/* mixins */
import InitData from '@/mixins/page/init-data';
import TableCheckbox from '@/mixins/table/checkboxes';
import TableDialogs from '@/mixins/table/table-dialogs';
import TableActionDelete from '@/mixins/table/actions/delete';
import TableActionDeleteAll from '@/mixins/table/actions/delete-all';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';
import TableBtns, {BTNS_LIST} from '@/components/table/Table.Btns.vue';
import TableFooterInfo from '@/components/table/footer/Table.Footer.Info.vue';
import DataBinding from '../components/rotation-voluum/DataBinding.vue';
import Tooltip from '@/components/lib/tooltips/Tooltip.vue';

/* other */
import api from '@/api/index';
import schemes from '@/schemes/index';
import utils from '@/utils';

export default {
	name: 'Domains_Rotation_Voluum_Transfer',
	components: {
		VueTable,
		TableBtns,
		TableFooterInfo,
		DataBinding,
		Tooltip
	},
	mixins: [
		InitData,
		TableCheckbox,
		TableDialogs,
		TableActionDelete,
		TableActionDeleteAll
	],
	data: () => ({
		BTNS_LIST,
		api: api.domainRotationVoluume,
		scheme: schemes.DomainsRotationVoluumTransfer,
		additionalData: [
			{	/* domains */
				api: api.domains,
				entity: schemes.Domains.entity
			},
			{	/* resources */
				api: api.resources,
				entity: schemes.Resources.entity
			},
			{
				api: api.resourceTypes,
				entity: schemes.ResourcesTypes.entity
			}
		],
		visibilityBindingData: false
	}),
	created () {
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.delete, this.removeFromRotation);
		this.mixin_subscribeOnDlgEvents(this.dlg.LIST_DLG.deleteAll, this.removeFromRotationGroup);
	},
	methods: {
		...mapActions(listStoreModules.Data.name, {
			Action_SendDataChanges: listStoreModules.Data.types.actions.SEND_DATA_CHANGES
		}),

		/* For Binding Data */
		setVisibilityBindingData (isVisibility) {
			this.visibilityBindingData = isVisibility;
		},

		/* TRANSFER */
		sendOnRotation (data) {
			if (data.length === 0) return;
			this.Action_SendDataChanges({
				api: this.api,
				entity: this.scheme.entity,
				action: 'create',
				data
			})
				.then(() => {
					this.setVisibilityBindingData(false);
					this.$refs.dataBinding.resetData();
				});
		},
		removeFromRotation () {
			this.remove([this.dlg.data.element.id]);
		},
		removeFromRotationGroup () {
			const ids = this.dlg.data.elementsList.map(el => el.id);
			this.remove(ids);
		},
		remove (selectedIds) {
			if (selectedIds.length === 0) return;
			const removeIds = [];
			let removeEl;
			selectedIds.forEach(id => {
				removeEl = this.State_DomainsOnRotationVoluum.find(domain => domain.domainId === id);
				if (removeEl) {
					removeIds.push(removeEl.id);
				}
			});

			this.Action_SendDataChanges({
				api: this.api,
				entity: this.scheme.entity,
				action: 'remove',
				data: removeIds
			})
				.then(() => this.mixin_hideDlg());
		}
	},
	computed: {
		...mapState(listStoreModules.Data.name, {
			State_DomainsOnRotationVoluum: state => state[listStoreModules.Data.types.state.DOMAINS_ROTATION_VOLUUM]
		}),
		...mapGetters(listStoreModules.Data.name, {
			Getter_getDomains: listStoreModules.Data.types.getters.GET_DOMAINS,
			Getter_getExtendData: listStoreModules.Data.types.getters.GET_EXTEND_DATA
		}),
		/*
			getDomainsGroups
			return object {main, other}
			main - domains in check
			other - all domains without main
		*/
		getDomainsGroups () {
			const domains = this.Getter_getDomains(schemes.Domains.reconfigMap);
			const dataOnReconfigIds = this.State_DomainsOnRotationVoluum.map(d => d.domainId);
			return utils._splitDataByIds(domains, dataOnReconfigIds);
		},
		/* getTableData is required for mixin_toggleAllCeckboxes */
		getTableData () {
			return this.getDomainsGroups.main;
		},
		getSelectedDomains () {
			return this.getTableData.filter(domain => this.mixin_checkbox.list.includes(domain.id));
		},
		getResources () {
			return this.Getter_getExtendData(schemes.Resources.reconfigMap, schemes.Resources.entity);
		}
	}
};
</script>
