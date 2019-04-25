/* Servers */
import Servers from './modules/servers';

/* Provider */
import Providers from './modules/providers/main';
import ProvidersTypes from './modules/providers/types';
import ProvidersAccounts from './modules/providers/accounts';

/* Domain */
import Domains from './modules/domains/main';
import DomainsRecords from './modules/domains/records';
import DomainsRecordTypes from './modules/domains/record-types';
import DomainsOnReconfig from './modules/domains/on-reconfig';
import DomainsReconfigStatus from './modules/domains/reconfig-status/domain';
import RecordsReconfigStatus from './modules/domains/reconfig-status/records';
import DomainsGreenlistingTransfer from './modules/domains/greenlisting/transfer';
import DomainsSafetyCheckingTransfer from './modules/domains/safety-checking/transfer';
import DomainsSafetyCheckingStatuses from './modules/domains/safety-checking/statuses';
import DomainsSafetyCheckingHistory from './modules/domains/safety-checking/history';
import DomainsRotationVoluumTransfer from './modules/domains/rotation-voluum/transfer';

/* Resources */
import Resources from './modules/tracker-resource/main';
import ResourcesTypes from './modules/tracker-resource/types';

export default {
	/* Servers */
	Servers,

	/* Provider */
	Providers,
	ProvidersTypes,
	ProvidersAccounts,

	/* Domain */
	Domains,
	DomainsRecords,
	DomainsRecordTypes,
	DomainsOnReconfig,
	DomainsReconfigStatus,
	RecordsReconfigStatus,
	DomainsGreenlistingTransfer,
	DomainsSafetyCheckingTransfer,
	DomainsSafetyCheckingStatuses,
	DomainsSafetyCheckingHistory,
	DomainsRotationVoluumTransfer,

	/* Resources */
	Resources,
	ResourcesTypes
};
