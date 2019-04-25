import {
	render,
	reconfig,
	sticky,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';
import routesList from '@/router/routesList';

const tableLabel = 'Records reconfig status';

const declaration = {
	id: {
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
	domainRecordTypeId: {
		title: 'Record Type',
		settings: {render, reconfig},
		additionalEntity: listStoreModules.Data.types.state.DOMAINS_RECORDS_TYPES,
		renderKey: 'domainRecordTypeName',
		cellType: globalTypes.cell.link,
		route: routesList.domains.recordTypes.name
	},
	value: {
		title: 'value',
		settings: {render}
	},
	ttl: {
		title: 'TTL',
		settings: {render, reconfig},
		additionalEntity: listStoreModules.Data.types.state.STATIC_DOMAIN_TTL,
		renderKey: 'ttlLabel',
		getByKey: 'label'
	},
	proxied: {
		title: 'protected',
		settings: {render, reconfig},
		additionalEntity: listStoreModules.Data.types.state.STATIC_DOMAIN_REC_PROTECTED,
		renderKey: 'protectedLabel',
		getByKey: 'label'
	},
	date: {
		title: 'date',
		settings: {render},
		filterType: globalTypes.filter.date,
		cellType: globalTypes.cell.date
	}
};

const rowTemplate = '100px minmax(180px, 1fr) 150px minmax(350px, 1fr) 160px minmax(160px, 1fr) 80px 120px minmax(220px, 1fr)';

const style = {
	header: {gridTemplateColumns: rowTemplate},
	bodyRow: {gridTemplateColumns: rowTemplate}
};

export default {
	style,
	tableLabel,
	...getSchemeMaps(declaration)
};
