import {
	render,
	mandatory,
	editable,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';

const entity = listStoreModules.Data.types.state.PROVIDERS_TYPES;

const tableLabel = 'Provider types';

const declaration = {
	id: {
		title: 'id',
		settings: {render}
	},
	name: {
		title: 'name',
		settings: {render, editable, mandatory},
		placeholder: 'Provider type name'
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
