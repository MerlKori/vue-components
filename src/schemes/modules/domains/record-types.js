import {
	render,
	mandatory,
	editable,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';

const entity = listStoreModules.Data.types.state.DOMAINS_RECORDS_TYPES;

const tableLabel = 'Domain record types';

const declaration = {
	id: {
		title: 'id',
		settings: {render}
	},
	name: {
		title: 'name',
		settings: {render, editable, mandatory},
		placeholder: 'Record type name',
		editFieldType: globalTypes.editField.select,
		additionalEntity: listStoreModules.Data.types.state.STATIC_RECORD_TYPES
	}
};

const rewTemplate = '100px 1fr var(--row-btns-wrapp-size)';

const style = {
	header: {gridTemplateColumns: rewTemplate},
	bodyRow: {gridTemplateColumns: rewTemplate},
	forms: {width: '250px'}
};

export default {
	style,
	tableLabel,
	entity,
	...getSchemeMaps(declaration)
};
