import Vue from 'vue';
import Router from 'vue-router';
import * as routesConf from './routes';
import {initKeycloak} from '@/keycloak';

Vue.use(Router);

const router = new Router({
	routes: [
		...routesConf.servers,
		...routesConf.domains,
		...routesConf.provider,
		...routesConf.resources,
		routesConf.testP
		// routesConf.page404
	],
	mode: 'history'
});

router.beforeEach((to, from, next) => {
	initKeycloak(next);
});

export default router;
