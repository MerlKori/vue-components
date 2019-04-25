import {
	render,
	sticky,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import routesList from '@/router/routesList';
import {listStoreModules} from '@/store/index';

const entity = listStoreModules.Data.types.state.DOMAINS_SAFETY_CHECKING_STATUSES;

const tableLabel = 'Domain Safety Checking Statuses';

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
		title: 'statuses',
		settings: {render},
		filterType: globalTypes.filter.select,
		filterEntity: listStoreModules.Data.types.state.STATIC_SAFELY_CHECKING_STATUSES,
		cellType: globalTypes.cell.status
	},
	updateDate: {
		title: 'Last check',
		settings: {render},
		filterType: globalTypes.filter.date,
		cellType: globalTypes.cell.date,
		dateFormat: globalTypes.dateFormats.dateTime
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

const rowTemplate = '100px minmax(180px, 1fr) 150px repeat(4, minmax(220px, 1fr)) 170px';

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
