import {
	render,
	editable,
	mandatory,
	reconfig,
	sticky,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';
import routesList from '@/router/routesList';

const entity = listStoreModules.Data.types.state.DOMAINS_RECORDS;

const tableLabel = 'Records';

const declaration = {
	id: {
		title: 'ID',
		settings: {}
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
	domainRecordTypeId: {
		title: 'Record Type',
		editFieldType: globalTypes.editField.radioGroup,
		settings: {
			render,
			editable,
			mandatory,
			reconfig
		},
		additionalEntity: listStoreModules.Data.types.state.DOMAINS_RECORDS_TYPES,
		renderKey: 'domainRecordTypeName',
		filterType: globalTypes.filter.select,
		filterEntity: listStoreModules.Data.types.state.DOMAINS_RECORDS_TYPES,
		cellType: globalTypes.cell.link,
		route: routesList.domains.recordTypes.name
	},
	domainId: {
		title: 'Domain ID',
		settings: {}
	},
	domainName: {
		title: 'Domain name',
		settings: {}
	},
	value: {
		title: 'value',
		settings: {render, editable, mandatory}
	},
	server: {
		title: 'server',
		settings: {render, reconfig},
		additionalEntity: listStoreModules.Data.types.state.SERVERS,
		findByKey: 'ip',
		findByKeyValue: 'value',
		route: routesList.servers.name,
		cellType: globalTypes.cell.link
	},
	ttl: {
		title: 'TTL',
		editFieldType: globalTypes.editField.select,
		settings: {
			render,
			editable,
			mandatory,
			reconfig
		},
		additionalEntity: listStoreModules.Data.types.state.STATIC_DOMAIN_TTL,
		renderKey: 'ttlLabel',
		getByKey: 'label'
	},
	proxied: {
		title: 'protected',
		editFieldType: globalTypes.editField.select,
		settings: {
			render,
			editable,
			reconfig
		},
		additionalEntity: listStoreModules.Data.types.state.STATIC_DOMAIN_REC_PROTECTED,
		renderKey: 'protectedLabel',
		getByKey: 'label'
	},
	date: {
		title: 'date',
		editFieldType: globalTypes.editField.date,
		settings: {render, editable},
		filterType: globalTypes.filter.date,
		cellType: globalTypes.cell.date
	}
};

const rewTemplate = '40px minmax(200px, 1fr) 150px repeat(2, minmax(200px, 1fr)) repeat(2, minmax(110px, 1fr)) minmax(220px, 1fr) 140px';
// const rewTemplate = '40px 200px 150px repeat(2, 200px) 110px 130px 220px 140px';

const style = {
	header: {gridTemplateColumns: rewTemplate},
	bodyRow: {gridTemplateColumns: rewTemplate},
	forms: {
		width: '600px',
		display: 'grid',
		gridTemplateAreas: '"domainRecordTypeId domainRecordTypeId . ." "name name value value" "ttl proxied date date"',
		gridTemplateColumns: 'repeat(4 , 1fr)',
		gridGap: '0px 10px'
	}
};

const classes = {
	rowActionsBtn: 'v-table-body__row-btns--sticky'
};

export default {
	style,
	classes,
	tableLabel,
	entity,
	...getSchemeMaps(declaration)
};
