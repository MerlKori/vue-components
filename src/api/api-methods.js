import {baseUrl} from './index';
import Data from '@/store/modules/data/index';
import types from '@/store/modules/data/types';

const buildURL = point => `${baseUrl}${point}?token=${Data.state[types.state.USER_TOKEN]}`;

const addParams = (url, params) => {
	let path = `${url}/`;
	const lastIdx = params.length - 1;
	params.forEach((param, idx) => {
		path += lastIdx === idx ? param : `${param};`;
	});
	return path;
};

const request = config => new Promise((resolve, reject) => {
	const url = buildURL(config.url);
	fetch(url, config.options)
		.then(response => {
			if (response.status === 401) location.reload(); // eslint-disable-line
			if (response.status === 200) return response.json();
			if (response.status !== 200 && response.status !== 401) reject(response);
		})
		.then(data => resolve(data))
		.catch(err => reject(err));
});

const setBody = data => JSON.stringify({records: Array.isArray(data) ? data : [data]});

export default {
	addParams,
	request,
	setBody
};
