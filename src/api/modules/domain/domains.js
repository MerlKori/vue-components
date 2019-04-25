// submodules
import records from './domains.records';
import domainReconfig from './dns-reconfig/transfer';
import domainReconfigStatus from './dns-reconfig/statuses';
import domainGreenlisting from './greenlisting/transfer';
import domainSafetyChecking from './safety-shecking/transfer';
import domainSafetyCheckingStatuses from './safety-shecking/statuses';
import domainSafetyCheckingHistory from './safety-shecking/history';
import domainRotationVoluume from './rotation/transfer';

import endpoints from '@/api/endpoints';
import apiHelpers from '@/api/api-helpers';

const domains = {
	getAll () {
		const requestData = {
			options: {
				method: 'GET'
			},
			url: endpoints.general._domain.domainInfo
		};
		return new Promise((resolve, reject) => {
			apiHelpers.request(requestData)
				.then(response => resolve(response))
				.catch(err => reject(err));
		});
	},
	create (data) {
		const requestData = {
			options: {
				method: 'POST',
				body: apiHelpers.setBody(data)
			},
			url: endpoints.general._domain.domains
		};
		return new Promise((resolve, reject) => {
			apiHelpers.request(requestData)
				.then(response => resolve(response))
				.catch(err => reject(err));
		});
	},
	edit (data) {
		const requestData = {
			options: {
				method: 'PUT',
				body: apiHelpers.setBody(data)
			},
			url: endpoints.general._domain.domains
		};
		return new Promise((resolve, reject) => {
			apiHelpers.request(requestData)
				.then(response => resolve(response))
				.catch(err => reject(err));
		});
	},
	remove (data) {
		const requestData = {
			options: {
				method: 'DELETE'
			},
			url: apiHelpers.addParams(endpoints.general._domain.domains, data)
		};
		return new Promise((resolve, reject) => {
			apiHelpers.request(requestData)
				.then(response => resolve(response))
				.catch(err => reject(err));
		});
	}
};

export default {
	domains,
	records,
	domainReconfig,
	domainReconfigStatus,
	domainGreenlisting,
	domainSafetyChecking,
	domainSafetyCheckingStatuses,
	domainSafetyCheckingHistory,
	domainRotationVoluume
};
