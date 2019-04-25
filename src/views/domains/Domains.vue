<template>
	<div class="domain-page">
		<TableDomain
			class="domain-page__table-domain"
			:loadingProcess="loadingProcess" />
		<TableRecords class="domain-page__table-records"/>
	</div>
</template>

<script>
/* mixins */
import pageInitDataMixin from '@/mixins/page/init-data';

/* components */
import TableDomain from './components/domains/TableDomains.vue';
import TableRecords from './components/records/table/TableRecords.vue';

/* other */
import api from '@/api/index';
import schemes from '@/schemes/index';

export default {
	name: 'Domains_Page',
	mixins: [pageInitDataMixin],
	components: {
		TableDomain,
		TableRecords
	},
	data: () => ({
		api: api.domains,
		scheme: schemes.Domains,
		additionalData: [
			{
				api: api.providers,
				entity: schemes.Providers.entity
			},
			{
				api: api.providerAccounts,
				entity: schemes.ProvidersAccounts.entity
			},
			{
				api: api.domainRecordTypes,
				entity: schemes.DomainsRecordTypes.entity
			},
			{
				api: api.servers,
				entity: schemes.Servers.entity
			}
		]
	})
};
</script>

<style>
.domain-page {
	display: flex;
	flex-direction: column;
	height: 100vh;
	margin: 0 auto;
}
.domain-page__table-domain {
	height: 55vh;
	flex-grow: 1;
	flex-shrink: 0;
	margin: 0 0 15px 0;
}
.domain-page__table-records {
	height: 35vh;
	flex-grow: 1;
	flex-shrink: 0;
	margin: 0 0 10px 0;
}
</style>
