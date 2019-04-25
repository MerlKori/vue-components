import types from './types';

const s = types.state;
const m = types.mutations;


const state = {
	[s.FOCUS_FIELD_ID]: null
};

const mutations = {
	[m.SET_FOCUS_FIELD_ID] (state, id) {
		state[s.FOCUS_FIELD_ID] = id;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	types
};
