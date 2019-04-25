<template>
	<TableCollection
		:scheme="scheme"
		:data="getTableData"
		:api="api"
		:loadingProcess="loadingProcess"
		class="resources-table"
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
	name: 'Resources_Page',
	mixins: [pageInitDataMixin],
	components: {TableCollection},
	data: () => ({
		api: api.resources,
		scheme: schemes.Resources,
		additionalData: [
			{
				api: api.resourceTypes,
				entity: schemes.ResourcesTypes.entity
			}
		]
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
.resources-table {
	/* max-width: 1270px; */
	height: calc(100vh - 10px);
	margin: 0 auto;
}
</style>
