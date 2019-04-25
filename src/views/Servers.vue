<template>
	<TableCRUD
		:scheme="scheme"
		:data="getTableData"
		:api="api"
		:dataTransfer="dataTransfer"
		:loadingProcess="loadingProcess"
		class="container--h100"
	/>
</template>

<script>
/* store */
import {mapGetters} from 'vuex';
import {listStoreModules} from '@/store/index';

/* mixins */
import pageInitDataMixin from '@/mixins/page/init-data';

/* components */
import TableCRUD from '@/collections/tables/Table.CRU--Deactivate.vue';

import api from '@/api/index';
import schemes from '@/schemes/index';

export default {
	name: 'Servers_Page',
	mixins: [pageInitDataMixin],
	components: {TableCRUD},
	props: {
		dataTransfer: String
	},
	data: () => ({
		api: api.servers,
		scheme: schemes.Servers
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
