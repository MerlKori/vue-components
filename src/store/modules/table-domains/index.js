import types from './types';

const s = types.state;
const m = types.mutations;


const state = {
	[s.SELECT_DOMAINS]: [],
	[s.MODE_MULTIPLE]: false
};

const mutations = {
	[m.SET_LIST_SELECT_DOMAINS] (state, list) {
		state[s.SELECT_DOMAINS] = list;
	},
	[m.SET_MODE_MULTIPLE] (state, mode) {
		state[s.MODE_MULTIPLE] = mode;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	types
};
