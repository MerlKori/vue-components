import {
	render,
	editable,
	mandatory,
	reconfig,
	editableSelection,
	sticky,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';
import routesList from '@/router/routesList';

const entity = listStoreModules.Data.types.state.RESOURCES;

const tableLabel = 'Resources';

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
	resourceTypeId: {
		title: 'Resource Type',
		editFieldType: globalTypes.editField.select,
		settings: {
			render,
			editable,
			mandatory,
			reconfig
		},
		additionalEntity: listStoreModules.Data.types.state.RESOURCES_TYPES,
		renderKey: 'resourceTypeName',
		filterType: globalTypes.filter.select,
		filterEntity: listStoreModules.Data.types.state.RESOURCES_TYPES,
		cellType: globalTypes.cell.link,
		route: routesList.trackerResource.types.name,
		placeholder: 'link to resource type'
	},
	rotationPeriod: {
		title: 'Rotation Period',
		editFieldType: globalTypes.editField.select,
		additionalEntity: listStoreModules.Data.types.state.STATIC_TR_RESOURCES_ROTATION_PERIOD,
		settings: {
			render,
			editable,
			mandatory,
			editableSelection
		},
		validations: [{name: globalTypes.validations.inRange, options: {min: 5, max: 10000}}]
	},
	linkTtl: {
		title: 'link TTL',
		editFieldType: globalTypes.editField.select,
		settings: {
			render,
			editable,
			mandatory,
			reconfig
		},
		additionalEntity: listStoreModules.Data.types.state.STATIC_TR_RESOURCES_LINK_TTL,
		renderKey: 'linkTtlLabel',
		getByKey: 'label'
	},
	externalId: {
		title: 'External ID',
		settings: {render, editable}
	}
};

const rowTemplate = '100px repeat(2, minmax(200px, 1fr)) repeat(2, minmax(150px, 1fr)) minmax(270px, 1fr) var(--row-btns-wrapp-size)';

const style = {
	header: {gridTemplateColumns: rowTemplate},
	bodyRow: {gridTemplateColumns: rowTemplate},
	forms: {width: '250px'}
};

export default {
	style,
	tableLabel,
	entity,
	...getSchemeMaps(declaration)
};
