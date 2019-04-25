import apiHelpers from '@/api/api-helpers';
import endpoints from '@/api/endpoints';

export default {
	getAll () {
		const requestData = {
			options: {
				method: 'GET'
			},
			url: endpoints.safetyChecking.history
		};
		return new Promise((resolve, reject) => {
			apiHelpers.request(requestData)
				.then(response => resolve(response))
				.catch(err => reject(err));
		});
	}
};
