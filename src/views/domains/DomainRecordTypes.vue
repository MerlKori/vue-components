<template>
	<TableCollection
		class="domain-records-types-table "
		:scheme="scheme"
		:data="getTableData"
		:api="api"
		:dataTransfer="dataTransfer"
		:loadingProcess="loadingProcess"
	/>
</template>

<script>
/* store */
import {mapGetters} from 'vuex';
import {listStoreModules} from '@/store/index';

/* mixins */
import pageInitDataMixin from '@/mixins/page/init-data';

/* components */
import TableCollection from '@/collections/tables/Table.CRU--Deactivate.vue';

import api from '@/api/index';
import schemes from '@/schemes/index';

export default {
	name: 'RecordTypes_Page',
	mixins: [pageInitDataMixin],
	components: {TableCollection},
	props: {
		dataTransfer: String
	},
	data: () => ({
		api: api.domainRecordTypes,
		scheme: schemes.DomainsRecordTypes
	}),
	computed: {
		...mapGetters(listStoreModules.Data.name, {
			getExtenddData: listStoreModules.Data.types.getters.GET_EXTEND_DATA
		}),
		getTableData () {
			return this.getExtenddData(this.scheme.reconfigMap, this.scheme.entity);
		}
	}
};
</script>

<style>
.domain-records-types-table {
	max-width: 1000px;
	height: calc(100vh - 10px);
	margin: 0 auto;
}
</style>
