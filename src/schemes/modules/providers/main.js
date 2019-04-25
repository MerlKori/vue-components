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

const entity = listStoreModules.Data.types.state.PROVIDERS;

const tableLabel = 'Providers';

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
		},
		placeholder: 'Provider name'
	},
	providerTypeId: {
		title: 'Provider Type',
		editFieldType: globalTypes.editField.select,
		settings: {
			render,
			editable,
			mandatory,
			reconfig
		},
		additionalEntity: listStoreModules.Data.types.state.PROVIDERS_TYPES,
		renderKey: 'providerTypeName',
		filterType: globalTypes.filter.select,
		filterEntity: listStoreModules.Data.types.state.PROVIDERS_TYPES,
		cellType: globalTypes.cell.link,
		route: routesList.provider.types.name
	},
	apiUrl: {
		title: 'Api Url',
		settings: {render, editable},
		validations: [{name: globalTypes.validations.isURL}]
	},
	apiWrapper: {
		title: 'Api Wrapper',
		settings: {render, editable}
	},
	url: {
		title: 'Website',
		settings: {render, editable},
		validations: [{name: globalTypes.validations.isURL}]
	}
};

const rowTemplate = '100px minmax(200px, 1fr) 200px repeat(3, minmax(300px, 1fr)) var(--row-btns-wrapp-size)';
// const rowTemplate = '100px repeat(2, 199px) repeat(3, 300px) var(--row-btns-wrapp-size)';

const style = {
	header: {gridTemplateColumns: rowTemplate},
	bodyRow: {gridTemplateColumns: rowTemplate},
	forms: {width: '300px'}
};

const classes = {
	rowActionsBtn: 'v-table-body__row-btns--sticky',
	headerLHToggle: 'line-height-toggle__wrapp--sticky'
};

export default {
	style,
	classes,
	tableLabel,
	entity,
	...getSchemeMaps(declaration)
};
