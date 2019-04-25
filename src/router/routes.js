// routes list
import routesList from './routesList';
// pages
// Servers
import Servers from '@/views/Servers.vue';

// domains
import Domains from '@/views/domains/Domains.vue';
import DomainRecordTypes from '@/views/domains/DomainRecordTypes.vue';
import DomainTransferDnsReconfig from '@/views/domains/dns-reconfig/Transfer.vue';
import DomainDnsReconfigStatuses from '@/views/domains/dns-reconfig/Statuses.vue';
import DomainGreenlistingTransfer from '@/views/domains/greenlisting/Transfer.vue';
import DomainSafetyCheckingTransfer from '@/views/domains/safety-checking/Transfer.vue';
import DomainSafetyCheckingStatuses from '@/views/domains/safety-checking/Statuses.vue';
import DomainSafetyCheckingHistory from '@/views/domains/safety-checking/History.vue';
import DomainRotationVoluumTransfer from '@/views/domains/rotation-voluum/Transfer.vue';

// Provider
import Provider from '@/views/provider/Provider.vue';
import ProviderTypes from '@/views/provider/ProviderTypes.vue';
import ProviderAccount from '@/views/provider/ProviderAccount.vue';

// Resources
import Resources from '@/views/resources/Resources.vue';
import ResourceTypes from '@/views/resources/ResourceTypes.vue';

// 404
import Page404 from '@/views/404.vue';
import TestPage from '@/views/TestPage.vue';

export const servers = [
	{
		path: routesList.root,
		redirect: routesList.servers.path
	},
	{
		path: routesList.servers.path,
		name: routesList.servers.name,
		component: Servers,
		props: route => ({dataTransfer: route.params.dataTransfer})
	}
];
export const provider = [
	{
		path: routesList.provider.main.path,
		name: routesList.provider.main.name,
		component: Provider,
		props: route => ({dataTransfer: route.params.dataTransfer})
	},
	{
		path: routesList.provider.account.path,
		name: routesList.provider.account.name,
		component: ProviderAccount,
		props: route => ({dataTransfer: route.params.dataTransfer})
	},
	{
		path: routesList.provider.types.path,
		name: routesList.provider.types.name,
		component: ProviderTypes,
		props: route => ({dataTransfer: route.params.dataTransfer})
	}
];

export const domains = [
	{
		path: routesList.domains.main.path,
		name: routesList.domains.main.name,
		component: Domains
	},
	{
		path: routesList.domains.recordTypes.path,
		name: routesList.domains.recordTypes.name,
		component: DomainRecordTypes,
		props: route => ({dataTransfer: route.params.dataTransfer})
	},
	{
		path: routesList.domains.DnsReconfig.path,
		name: routesList.domains.DnsReconfig.name,
		component: DomainTransferDnsReconfig
	},
	{
		path: routesList.domains.DnsReconfigStatuses.path,
		name: routesList.domains.DnsReconfigStatuses.name,
		component: DomainDnsReconfigStatuses
	},
	{
		path: routesList.domains.greenlistingTransfer.path,
		name: routesList.domains.greenlistingTransfer.name,
		component: DomainGreenlistingTransfer
	},
	{
		path: routesList.domains.safetyCheckingTransfer.path,
		name: routesList.domains.safetyCheckingTransfer.name,
		component: DomainSafetyCheckingTransfer
	},
	{
		path: routesList.domains.safetyCheckingStatuses.path,
		name: routesList.domains.safetyCheckingStatuses.name,
		component: DomainSafetyCheckingStatuses
	},
	{
		path: routesList.domains.safetyCheckingHistory.path,
		name: routesList.domains.safetyCheckingHistory.name,
		component: DomainSafetyCheckingHistory
	},
	{
		path: routesList.domains.rotationVoluumTransfer.path,
		name: routesList.domains.rotationVoluumTransfer.name,
		component: DomainRotationVoluumTransfer
	}
];

export const resources = [
	{
		path: routesList.trackerResource.main.path,
		name: routesList.trackerResource.main.name,
		component: Resources
	},
	{
		path: routesList.trackerResource.types.path,
		name: routesList.trackerResource.types.name,
		component: ResourceTypes,
		props: route => ({dataTransfer: route.params.dataTransfer})
	}
];

export const page404 = {
	path: routesList.page404,
	component: Page404
};

export const testP = {
	path: '/test',
	component: TestPage
};
