import servers from './modules/servers';
import domain from './modules/domain/domains';
import provider from './modules/provider/providers';
import resource from './modules/resource/resources';

// export const baseUrl = 'http://172.17.253.159:8080/api';
export const baseUrl = 'http://172.17.254.101:8080/api';

export default {
	// servers
	servers,
	// domain
	domains: domain.domains,
	domainRecords: domain.records.records,
	domainRecordTypes: domain.records.types,
	domainReconfig: domain.domainReconfig,
	domainReconfigStatus: domain.domainReconfigStatus,
	domainGreenlisting: domain.domainGreenlisting,
	domainSafetyChecking: domain.domainSafetyChecking,
	domainSafetyCheckingStatuses: domain.domainSafetyCheckingStatuses,
	domainSafetyCheckingHistory: domain.domainSafetyCheckingHistory,
	domainRotationVoluume: domain.domainRotationVoluume,
	// provider
	providers: provider.providers,
	providerAccounts: provider.accounts,
	providerTypes: provider.types,
	// resource
	resources: resource.resources,
	resourceTypes: resource.types
};
