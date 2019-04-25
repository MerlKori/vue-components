import types from './types';
import staticData from '@/store/modules/data/static-data';
import utils from '@/utils';

const s = types.state;
const g = types.getters;
const m = types.mutations;
const a = types.actions;

const checkStaticData = name => {
	const reg = /^STATIC_/;
	return reg.test(name);
};

const state = (function initState () {
	const temp = {};
	for (const name in s) {
		temp[s[name]] = checkStaticData(name) ? staticData[name] : [];
	}
	return temp;
}());

const getters = {
	/**
	 * reconfigMap - configuration for data extension
	 * entity - extend data name
	 * returns an array of data extended by data from another data state
	 */
	[g.GET_EXTEND_DATA]: state => (reconfigMap, entity) => {
		if (reconfigMap.length === 0) {
			return state[entity];
		}
		const copyData = utils._deepCopy(state[entity]);
		let findEl;
		copyData.forEach(i => { /* i - items */
			reconfigMap.forEach(c => { /* c - config */
				findEl = state[c.additionalEntity].find(el => el[c.findByKey] === i[c.findByKeyValue]);
				i[c.createKey] = findEl === undefined ? null : findEl[c.getByKey];
			});
		});
		return copyData;
	},
	[g.GET_DOMAINS]: state => reconfigMap => {
		const domains = [];
		const addReconfigDomain = domain => {
			const reconfigDomain = {};
			reconfigMap.forEach(config => {
				reconfigDomain[config.addedKey] = utils._getValueByPath(domain, config.path);
			});
			domains.push(reconfigDomain);
		};

		state[s.DOMAINS].forEach(domain => {
			addReconfigDomain(domain);
		});
		return domains;
	}
};

const mutations = {
	[m.SET_DATA] (state, {entity, data}) {
		state[entity] = data;
	},
	[m.SET_TOKEN] (token) {
		state[s.USER_TOKEN] = token;
	}
};

const actions = {
	[a.DOWNLOAD_DATA] ({commit}, {api, entity}) {
		return new Promise((resolve, reject) => {
			api.getAll()
				.then(response => {
					commit(m.SET_DATA, {entity, data: response.result});
					resolve();
				})
				.catch(err => reject(err));
		});
	},
	[a.SEND_DATA_CHANGES] ({commit}, {api, entity, action, data}) { // eslint-disable-line
		const requestData = data || null;
		return new Promise((resolve, rejected) => {
			api[action](requestData)
				.then(result => {
					if (!result.success) {
						rejected(result);
						return;
					}
					api.getAll()
						.then(response => {
							commit(m.SET_DATA, {entity, data: response.result});
							resolve();
						});
				});
		});
	}
};

mutations[m.SET_TOKEN] = mutations[m.SET_TOKEN].bind(state);

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
	types
};
