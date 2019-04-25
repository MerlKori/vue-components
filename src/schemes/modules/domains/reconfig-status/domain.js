import {
	render,
	sticky,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import routesList from '@/router/routesList';
import {listStoreModules} from '@/store/index';

const entity = listStoreModules.Data.types.state.DOMAINS_RECONFIG_STATUS;

const tableLabel = 'Domain reconfig statuses';

const declaration = {
	domainId: {
		title: 'ID',
		settings: {render, sticky}
	},
	name: {
		title: 'name',
		settings: {render, sticky}
	},
	status: {
		title: 'status',
		settings: {render},
		filterType: globalTypes.filter.select,
		filterEntity: listStoreModules.Data.types.state.STATIC_RECONFIG_STATUSES,
		cellType: globalTypes.cell.status
	},
	errorDescription: {
		title: 'Error description',
		settings: {render},
		cellType: globalTypes.cell.error
	},
	dnsProviderAccountName: {
		title: 'DNS provider account',
		settings: {render},
		cellType: globalTypes.cell.link,
		route: routesList.provider.account.name
	},
	registrarAccountName: {
		title: 'registrar account',
		settings: {render},
		cellType: globalTypes.cell.link,
		route: routesList.provider.account.name
	},
	registerDate: {
		title: 'register date',
		settings: {render},
		filterType: globalTypes.filter.date,
		cellType: globalTypes.cell.date
	},
	registerPeriod: {
		title: 'register period',
		settings: {render}
	}
};

const rowTemplate = '100px minmax(180px, 1fr) 150px minmax(350px, 1fr) repeat(3, minmax(220px, 1fr)) 170px';

const style = {
	header: {gridTemplateColumns: rowTemplate},
	bodyRow: {gridTemplateColumns: rowTemplate}
};

export default {
	style,
	entity,
	tableLabel,
	...getSchemeMaps(declaration)
};
