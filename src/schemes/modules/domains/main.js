import {
	render,
	editable,
	mandatory,
	sticky,
	fillRenderMap,
	fillEditMap,
	globalTypes
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';
import routesList from '@/router/routesList';
import providersAccountsTableScheme from '@/schemes/modules/providers/accounts';

const entity = listStoreModules.Data.types.state.DOMAINS;

const tableLabel = 'Domains All';

const declaration = {
	id: {
		title: 'ID',
		settings: {render, sticky}
	},
	name: {
		title: 'name',
		settings: {
			render,
			editable,
			mandatory,
			sticky
		}
	},
	dnsProviderAccountId: {
		title: 'DNS provider account',
		editFieldType: globalTypes.editField.link,
		settings: {
			render,
			editable,
			mandatory
		},
		additionalEntity: listStoreModules.Data.types.state.PROVIDERS_ACCOUNT,
		linkScheme: providersAccountsTableScheme,
		renderKey: 'dnsProviderAccountName',
		cellType: globalTypes.cell.link,
		route: routesList.provider.account.name
	},
	registrarAccountId: {
		title: 'registrar account',
		editFieldType: globalTypes.editField.link,
		settings: {
			render,
			editable,
			mandatory
		},
		additionalEntity: listStoreModules.Data.types.state.PROVIDERS_ACCOUNT,
		linkScheme: providersAccountsTableScheme,
		renderKey: 'registrarAccountName',
		cellType: globalTypes.cell.link,
		route: routesList.provider.account.name
	},
	dnsProviderId: {
		title: 'DNS Provider ID',
		settings: {}
	},
	registerDate: {
		title: 'Register Date',
		editFieldType: globalTypes.editField.date,
		settings: {render, editable, mandatory},
		filterType: globalTypes.filter.date,
		cellType: globalTypes.cell.date
	},
	registerPeriod: {
		title: 'register period',
		editFieldType: globalTypes.editField.select,
		settings: {render, editable, mandatory},
		additionalEntity: listStoreModules.Data.types.state.STATIC_DOMAIN_REGISTER_PERIOD
	}
};

export const reconfigMap = [
	{
		addedKey: 'id',
		path: ['id']
	},
	{
		addedKey: 'name',
		path: ['name']
	},
	{
		addedKey: 'dnsProviderAccountName',
		path: ['dnsProviderAccountInfo', 'name']
	},
	{
		addedKey: 'dnsProviderAccountId',
		path: ['dnsProviderAccountInfo', 'id']
	},
	{
		addedKey: 'dnsProviderId',
		path: ['dnsProviderAccountInfo', 'providerId']
	},
	{
		addedKey: 'registrarAccountId',
		path: ['registrarAccountInfo', 'id']
	},
	{
		addedKey: 'registrarAccountName',
		path: ['registrarAccountInfo', 'name']
	},
	{
		addedKey: 'registerDate',
		path: ['registerDate']
	},
	{
		addedKey: 'registerPeriod',
		path: ['registerPeriod']
	},
	{
		addedKey: 'recordsInfo',
		path: ['recordsInfo']
	}
];

const rowTemplate = '100px repeat(5, minmax(220px, 1fr)) 140px';
const rowTemplateModeMultiple = '40px 100px repeat(5, minmax(220px, 1fr)) 140px';

const rowTemplateForTransfer = '40px 100px repeat(5, minmax(220px, 1fr))';

const style = {
	header: {gridTemplateColumns: rowTemplate},
	bodyRow: {gridTemplateColumns: rowTemplate},
	forms: {width: '300px'}
};
const styleModeMultiple = {
	header: {gridTemplateColumns: rowTemplateModeMultiple},
	bodyRow: {gridTemplateColumns: rowTemplateModeMultiple},
	forms: {width: '300px'}
};

const getSchemeMaps = scheme => {
	const [renderMap, editMap] = [[], []];
	for (const key in scheme) {
		fillRenderMap(renderMap, scheme, key);
		fillEditMap(editMap, scheme, key);
	}
	return {renderMap, reconfigMap, editMap};
};

const stylesForTransfer = {
	header: {gridTemplateColumns: rowTemplateForTransfer},
	bodyRow: {gridTemplateColumns: rowTemplateForTransfer}
};

export default {
	style,
	styleModeMultiple,
	tableLabel,
	entity,
	rowTemplate,
	rowTemplateModeMultiple,
	reconfigMap,
	stylesForTransfer,
	...getSchemeMaps(declaration)
};
