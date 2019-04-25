<template>
	<VueTable
		:scheme="scheme"
		:data="safetyCheckingStatuses"
		:loadingProcess="loadingProcess"
		class="container--h100 " />
</template>

<script>
/* mixins */
import InitData from '@/mixins/page/init-data';
import ReconfigRecords from '@/mixins/domain/reconfig-records';

/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';

/* other */
import api from '@/api/index';
import schemes from '@/schemes/index';

export default {
	name: 'Domain_SafetyChecking_Statuses_Page',
	mixins: [
		InitData,
		ReconfigRecords
	],
	components: {
		VueTable
	},
	data: () => ({
		api: api.domainSafetyCheckingStatuses,
		scheme: schemes.DomainsSafetyCheckingStatuses
	}),
	computed: {
		...mapState(listStoreModules.Data.name, {
			safetyCheckingStatuses: listStoreModules.Data.types.state.DOMAINS_SAFETY_CHECKING_STATUSES
		})
	}
};
</script>
