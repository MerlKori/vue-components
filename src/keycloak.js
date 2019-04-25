import Data from '@/store/modules/data/index';
import types from '@/store/modules/data/types';

let keycloak = null;

const reduceValueToMilliseconds = () => {
	const res = (((keycloak.tokenParsed.exp - keycloak.tokenParsed.auth_time) / 2) * 1000) - 5000;
	return res > 1 ? (((keycloak.tokenParsed.exp - keycloak.tokenParsed.auth_time) / 2) * 1000) : 0;
};

const reGet = () => {
	keycloak.updateToken(-1)
		.success(refreshed => {
			console.log(`Token refreshed: ${refreshed}`);
			Data.mutations[types.mutations.SET_TOKEN](keycloak.token);
			setTimeout(reGet, reduceValueToMilliseconds());
		})
		.error(() => console.log('Failed to refresh the token, or the session has expired'));
};
const clipKeycloakUrlParam = () => window.history.pushState({homePage: 'home-page'}, '', `${location.origin}${location.pathname}`); // eslint-disable-line

let requestKeycloak = true;

function runKeycloak (routerNext) {
	keycloak.init({onLoad: 'login-required'})
		.success(authenticated => {
			if (authenticated) {
				Data.mutations[types.mutations.SET_TOKEN](keycloak.token);
				setTimeout(reGet, reduceValueToMilliseconds());
				requestKeycloak = false;
				routerNext();
				clipKeycloakUrlParam();
			} else {
				console.log('authenticated failed');
			}
		})
		.error(errorData => console.log(`Failed to load data: ${JSON.stringify(errorData)}`));
}

export function initKeycloak (routerNext) {
	if (requestKeycloak) {
		keycloak = window.Keycloak({
			url: 'https://keycloak.systeamd.com/auth',
			realm: 'SysteamdClientLogin',
			clientId: 'AntivirusLabWeb'
		});
		runKeycloak(routerNext);
	} else {
		routerNext();
	}
}
