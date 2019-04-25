<template>
	<TablesGroupMainAndSub
		:mainTable="getDomainsData"
		:subTable="getRecordsData"
	/>
</template>

<script>
/* mixins */
import InitData from '@/mixins/page/init-data';
import ReconfigRecords from '@/mixins/domain/reconfig-records';

/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import TablesGroupMainAndSub from '@/collections/tables/Tables.Group.MainAndSub.vue';

/* other */
import api from '@/api/index';
import schemes from '@/schemes/index';
import utils from '@/utils';

export default {
	name: 'Domain_ReconfigStatus_Page',
	mixins: [
		InitData,
		ReconfigRecords
	],
	components: {
		TablesGroupMainAndSub
	},
	data: () => ({
		api: api.domainReconfigStatus,
		scheme: schemes.DomainsReconfigStatus,
		recordsScheme: schemes.RecordsReconfigStatus
	}),
	methods: {
		setSelectRecords (domain) { /* for props */
			if (!domain || !domain.records) return [];
			const recordsCopy = utils._deepCopy(domain.records);
			recordsCopy.forEach(record => {
				this.mixin_reconfigRecord(record, this.recordsScheme.reconfigMap, this.globalData);
			});
			return recordsCopy;
		}
	},
	computed: {
		...mapState(listStoreModules.Data.name, {
			domainReconfigStatusData: state => state[listStoreModules.Data.types.state.DOMAINS_RECONFIG_STATUS],
			globalData: state => state
		}),
		getDomainsData () {
			return {
				scheme: this.scheme,
				items: this.domainReconfigStatusData,
				defSorting: {key: 'status', value: 'FAILED'},
				loadingProcess: this.loadingProcess
			};
		},
		getRecordsData () {
			return {
				scheme: this.recordsScheme,
				defSorting: {key: 'status', value: 'FAILED'},
				setData: this.setSelectRecords
			};
		}
	}
};
</script>
