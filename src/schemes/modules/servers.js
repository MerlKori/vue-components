import {
	render,
	editable,
	mandatory,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';

const entity = listStoreModules.Data.types.state.SERVERS;

const tableLabel = 'Servers';

const declaration = {
	id: {
		title: 'id',
		settings: {render}
	},
	name: {
		title: 'name',
		settings: {render, editable, mandatory},
		placeholder: 'server name'
	},
	ip: {
		title: 'ip',
		settings: {render, editable, mandatory},
		validations: [{name: globalTypes.validations.isIP}],
		placeholder: 'IPv4 address'
	},
	host: {
		title: 'host',
		settings: {render, editable, mandatory},
		placeholder: 'host name'
	}
};

const rewTemplate = '100px repeat(3, 1fr) var(--row-btns-wrapp-size)';

const style = {
	header: {gridTemplateColumns: rewTemplate},
	bodyRow: {gridTemplateColumns: rewTemplate},
	forms: {width: '300px'}
};

export default {
	style,
	tableLabel,
	entity,
	...getSchemeMaps(declaration)
};
