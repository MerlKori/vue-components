import apiHelpers from '@/api/api-helpers';

const init = endpoint => ({
	getAll () {
		const requestData = {
			options: {
				method: 'GET'
			},
			url: endpoint
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
			url: endpoint
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
			url: endpoint
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
			url: apiHelpers.addParams(endpoint, data)
		};
		return new Promise((resolve, reject) => {
			apiHelpers.request(requestData)
				.then(response => resolve(response))
				.catch(err => reject(err));
		});
	}
});

export default {
	init
};
