import types from './types';

const s = types.state;
const m = types.mutations;

const state = {
	[s.PRELOADER_VISIBILITY]: false
};

const mutations = {
	[m.SET_VISIBILITY_PRELOADER] (state, visibility) {
		state[s.PRELOADER_VISIBILITY] = visibility;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	types
};
