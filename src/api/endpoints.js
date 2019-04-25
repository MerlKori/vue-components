const basePaths = {
	general: '/general',
	reconfiguration: '/reconfiguration',
	greenlisting: '/greenlisting',
	safetyChecking: '/safetychecking',
	rotation: '/rotation'
};

export default {
	general: {
		servers: `${basePaths.general}/servers`,
		_domain: {
			domains: `${basePaths.general}/domains`,
			domainInfo: `${basePaths.general}/domains-info`,
			domainInfoById: id => `${basePaths.general}/domains-info/${id}`,
			_record: {
				types: `${basePaths.general}/domain-record-types`,
				records: `${basePaths.general}/domain-records`
			}
		},
		_provider: {
			providers: `${basePaths.general}/providers`,
			types: `${basePaths.general}/provider-types`,
			accounts: `${basePaths.general}/provider-accounts`
		},
		_resource: {
			resources: `${basePaths.general}/resources`,
			types: `${basePaths.general}/resource-types`
		}
	},
	dnsReconfiguration: {
		statuses: `${basePaths.reconfiguration}/domains-records-result`,
		main: `${basePaths.reconfiguration}/domains-for-reconfiguration`
	},
	greenlisting: {
		// statuses: `${basePaths.greenlisting}/domains-records-result`,
		main: `${basePaths.greenlisting}/domains-for-greenlisting`
	},
	safetyChecking: {
		main: `${basePaths.safetyChecking}/domains-for-check`,
		statuses: `${basePaths.safetyChecking}/domains-result`,
		history: `${basePaths.safetyChecking}/domains-for-check-history`
	},
	rotation: {
		main: `${basePaths.rotation}/resource-allocations`
	}
};
