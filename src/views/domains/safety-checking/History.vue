<template>
	<VueTable
		:scheme="scheme"
		:data="getHistoryData"
		:loadingProcess="loadingProcess"
		class="container--h100 safety-check-table" />
</template>

<script>
/* mixins */
import InitData from '@/mixins/page/init-data';
import ReconfigRecords from '@/mixins/domain/reconfig-records';

/* store */
import {mapGetters} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';

/* other */
import api from '@/api/index';
import schemes from '@/schemes/index';

export default {
	name: 'Domain_SafetyChecking_history',
	mixins: [
		InitData,
		ReconfigRecords
	],
	components: {
		VueTable
	},
	data: () => ({
		api: api.domainSafetyCheckingHistory,
		scheme: schemes.DomainsSafetyCheckingHistory,
		additionalData: [
			{
				api: api.domains,
				entity: schemes.Domains.entity
			}
		]
	}),
	computed: {
		...mapGetters(listStoreModules.Data.name, {
			Getter_getExtenddData: listStoreModules.Data.types.getters.GET_EXTEND_DATA
		}),
		getHistoryData () {
			return this.Getter_getExtenddData(this.scheme.reconfigMap, this.scheme.entity);
		}
	}
};
</script>

<style>
.safety-check-table {
	width: 1300px;
}
</style>
