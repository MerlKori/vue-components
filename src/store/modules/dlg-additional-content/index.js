import types from './types';

const s = types.state;
const m = types.mutations;
const a = types.actions;


const state = {
	[s.VISIBILITY]: false,
	[s.TABLE_SCHEME]: null,
	[s.LINK_ON_ELEMENT]: null,
	[s.FIELD_ID]: null
};

const mutations = {
	[m.SET_VISIBILITY] (state, vis) {
		state[s.VISIBILITY] = vis;
	},
	[m.SET_TABLE_SCHEME] (state, scheme) {
		state[s.TABLE_SCHEME] = scheme;
	},
	[m.SET_LINK_ON_ELEMENT] (state, element) {
		state[s.LINK_ON_ELEMENT] = element;
	},
	[m.SET_FIELD_ID] (state, id) {
		state[s.FIELD_ID] = id;
	}
};

const actions = {
	[a.SHOW_ADD_CONTENT] ({commit}, {scheme, fieldId}) {
		commit(m.SET_TABLE_SCHEME, scheme);
		commit(m.SET_FIELD_ID, fieldId);
		commit(m.SET_VISIBILITY, true);
	},
	[a.HIDE_ADD_CONTENT] ({commit, state}) {
		if (!state[s.VISIBILITY]) return;
		commit(m.SET_TABLE_SCHEME, null);
		commit(m.SET_FIELD_ID, null);
		commit(m.SET_VISIBILITY, false);
	},
	[a.ADD_LINK] ({commit}, linkElement) {
		commit(m.SET_LINK_ON_ELEMENT, linkElement);
		commit(m.SET_VISIBILITY, false);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	types
};
