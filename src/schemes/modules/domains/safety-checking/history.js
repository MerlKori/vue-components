import {
	render,
	reconfig,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';

const entity = listStoreModules.Data.types.state.DOMAINS_SAFETY_CHECKING_HISTORY;

const tableLabel = 'Safety checking history';

const declaration = {
	domainId: {
		title: 'ID',
		settings: {render}
	},
	name: {
		title: 'name',
		settings: {render, reconfig},
		additionalEntity: listStoreModules.Data.types.state.DOMAINS,
		createKey: 'name',
		findByKeyValue: 'domainId'
	},
	result: {
		title: 'Result',
		settings: {render},
		filterType: globalTypes.filter.select,
		filterEntity: listStoreModules.Data.types.state.STATIC_SAFELY_CHECKING_STATUSES,
		cellType: globalTypes.cell.status
	},
	date: {
		title: 'Last check',
		settings: {render},
		filterType: globalTypes.filter.date,
		cellType: globalTypes.cell.date,
		dateFormat: globalTypes.dateFormats.dateTime
	}
};

const rowTemplate = '120px repeat(3, minmax(220px, 1fr))';

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
