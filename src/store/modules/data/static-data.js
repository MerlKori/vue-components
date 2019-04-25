import types from '@/store/modules/data/types';

const s = types.state;

export default {
	[s.STATIC_DOMAIN_REC_PROTECTED]: [{id: 1, label: true}, {id: 0, label: false}],
	[s.STATIC_PROVIDER_API_WRAPP]: ['AWS', 'CloudFlair'],
	[s.STATIC_DOMAIN_REGISTER_PERIOD]: [1, 2, 3, 4, 5],
	[s.STATIC_DOMAIN_TTL]: [{id: 0, label: 'auto'}, {id: 1, label: 1}, {id: 2, label: 2}, {id: 3, label: 3}, {id: 4, label: 4}, {id: 5, label: 5}],
	[s.STATIC_TR_RESOURCES_ROTATION_PERIOD]: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
	[s.STATIC_TR_RESOURCES_LINK_TTL]: [{id: 1, label: true}, {id: 0, label: false}],
	[s.STATIC_RECONFIG_STATUSES]: [{value: null, label: 'all'}, {value: 'failed', label: 'failed'}, {value: 'done', label: 'done'}, {value: 'processing', label: 'processing'}],
	[s.STATIC_SAFELY_CHECKING_STATUSES]: [{value: null, label: 'all'}, {value: 'unsafe', label: 'unsafe'}, {value: 'safe', label: 'safe'}, {value: 'processing', label: 'processing'}],
	[s.STATIC_RECORD_TYPES]: ['A', 'AAAA', 'CNAME', 'TXT', 'SRV', 'LOC', 'MX', 'NS', 'SPF', 'CERT', 'DNSKEY', 'DS', 'NAPTR', 'SMIMEA', 'SSHFP', 'TLSA', 'URI']
};
