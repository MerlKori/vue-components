<template>
	<TableTransfer
		ref="DnsReconfigTable"
		@transfer-to-top="addDomainToReconfig"
		@transfer-to-bottom="removeDomainFromReconfig"
		:tableTopData="getDataForTableDnsReconfig"
		:tableBottomData="getDataForTableAllDomains"
	/>
</template>

<script>
/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

/* mixins */
import DomainTransfer from '@/mixins/domain/transfer';
import InitData from '@/mixins/page/init-data';

/* components */
import TableTransfer from '@/collections/tables/Table.Transfer.vue';

/* other */
import api from '@/api/index';
import schemes from '@/schemes/index';

export default {
	name: 'Domains_DnsReconfig_Transfer',
	components: {
		TableTransfer
	},
	mixins: [
		InitData,
		DomainTransfer
	],
	data: () => ({
		api: api.domainReconfig,
		scheme: schemes.DomainsOnReconfig,
		additionalData: [
			{	/* domains */
				api: api.domains,
				entity: schemes.Domains.entity,
				scheme: schemes.Domains
			}
		]
	}),
	methods: {
		addDomainToReconfig (ids) {
			this.mixin_addToReconfig(ids, this.api, this.scheme.entity, this.$refs.DnsReconfigTable);
		},
		removeDomainFromReconfig (ids) {
			this.mixin_removeFromReconfig(ids, this.api, this.scheme.entity, this.$refs.DnsReconfigTable, this.Store_DomainsOnReconfig);
		}
	},
	computed: {
		...mapState(listStoreModules.Data.name, {
			Store_DomainsOnReconfig: state => state[listStoreModules.Data.types.state.DOMAINS_RECONFIG]
		}),
		/*
			getDomainsGroups
			return object {main, other}
			main - domains in check
			other - all domains without main
		*/
		getDomainsGroups () {
			return this.mixin_splitDomainsOnGroups(this.Store_DomainsOnReconfig);
		},
		getDataForTableDnsReconfig () {
			return {
				data: this.getDomainsGroups.main,
				scheme: this.scheme,
				loadingProcess: this.loadingProcess
			};
		},
		getDataForTableAllDomains () {
			return {
				data: this.getDomainsGroups.other,
				scheme: this.additionalData[0].scheme,
				loadingProcess: this.loadingProcess
			};
		}
	}
};
</script>
