import Vue from 'vue';
import Vuex from 'vuex';

import Preloader from './modules/preloader/index';
import Notifications from './modules/notifications/index';
import Data from './modules/data/index';
import TableDomains from './modules/table-domains/index';

/* DLG */
import DlgAddContent from './modules/dlg-additional-content/index';
import DlgFocusFields from './modules/dlg-focus-fields/index';

Vue.use(Vuex);

const importList = {
	Data,
	Preloader,
	Notifications,
	TableDomains,
	DlgAddContent,
	DlgFocusFields
};

export const listStoreModules = {};
for (const name in importList) {
	listStoreModules[name] = {
		name,
		types: importList[name].types
	};
}

export default new Vuex.Store((function initModules () {
	const modules = {};
	for (const name in importList) {
		modules[name] = importList[name];
	}
	return {modules};
}()));
