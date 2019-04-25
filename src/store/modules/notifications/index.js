import types from './types';

const s = types.state;
const m = types.mutations;


const state = {
	[s.NOTIFICATIONS_LIST]: []
};

const mutations = {
	[m.CREATE_NOTIFICATIONS] (state, data) {
		data.id = Math.floor(Math.random() * (1000000 - 50)) + 50;
		state[s.NOTIFICATIONS_LIST].push(data);
	},
	[m.REMOVE_NOTIFICATIONS] (state, id) {
		const idx = state[s.NOTIFICATIONS_LIST].findIndex(el => el.id === id);
		if (idx < 0) return;
		state[s.NOTIFICATIONS_LIST].splice(idx, 1);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	types
};
