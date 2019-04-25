export default {
	root: '/',
	servers: {
		path: '/servers',
		name: 'servers'
	},
	provider: {
		main: {
			path: '/provider',
			name: 'provider'
		},
		account: {
			path: '/provider/account',
			name: 'provider-account'
		},
		types: {
			path: '/provider/types',
			name: 'provider-types'
		}
	},
	domains: {
		main: {
			path: '/domains',
			name: 'domains'
		},
		recordTypes: {
			path: '/record/types',
			name: 'record-types'
		},
		DnsReconfig: {
			path: '/domains-reconfigurations',
			name: 'domains-reconfigurations'
		},
		DnsReconfigStatuses: {
			path: '/domains-reconfigurations-status',
			name: 'domains-reconfigurations-status'
		},
		greenlistingTransfer: {
			path: '/domains-greenlisting',
			name: 'domains-greenlisting'
		},
		safetyCheckingTransfer: {
			path: '/domains-safety-checking',
			name: 'domains-safety-checking'
		},
		safetyCheckingStatuses: {
			path: '/domains-safety-checking-statuses',
			name: 'domains-safety-checking-statuses'
		},
		safetyCheckingHistory: {
			path: '/domains-safety-checking-history',
			name: 'domains-safety-checking-history'
		},
		rotationVoluumTransfer: {
			path: '/domains-rotation-voluum',
			name: 'domains-rotation-voluum'
		}
	},
	trackerResource: {
		main: {
			path: '/tracker-resource',
			name: 'tracker-resource'
		},
		types: {
			path: '/tracker-resource/types',
			name: 'tracker-resource-types'
		}
	},
	page404: '*'
};
