import {
	render,
	reconfig,
	editable,
	mandatory,
	sticky,
	globalTypes,
	getSchemeMaps
} from '@/schemes/scheme-helpers';
import {listStoreModules} from '@/store/index';
import routesList from '@/router/routesList';
import providersTableScheme from '@/schemes/modules/providers/main';

const entity = listStoreModules.Data.types.state.PROVIDERS_ACCOUNT;

const tableLabel = 'Provider Accounts';

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
		placeholder: 'Account name'
	},
	providerId: {
		title: 'Provider',
		editFieldType: globalTypes.editField.link,
		settings: {
			render,
			editable,
			mandatory,
			reconfig
		},
		additionalEntity: listStoreModules.Data.types.state.PROVIDERS,
		linkScheme: providersTableScheme,
		renderKey: 'providerName',
		cellType: globalTypes.cell.link,
		route: routesList.provider.main.name,
		placeholder: 'link to provider'
	},
	accessKey: {
		title: 'Access Key',
		editFieldType: globalTypes.editField.textarea,
		settings: {render, editable, mandatory},
		validations: [{name: globalTypes.validations.isStrMaxLength, options: {max: 60}}]
	},
	password: {
		title: 'Password',
		settings: {render, editable, mandatory}
	},
	email: {
		title: 'Email',
		settings: {render, editable},
		validations: [{name: globalTypes.validations.isEmail}]
	},
	firstName: {
		title: 'First Name',
		settings: {render, editable}
	},
	secondName: {
		title: 'Second Name',
		settings: {render, editable}
	},
	userName: {
		title: 'User Name',
		settings: {render, editable, mandatory}
	}
};

const rowTemplate = '100px minmax(150px, 1fr) 180px minmax(300px, 1fr) minmax(200px, 1fr) minmax(250px, 1fr) repeat(3, minmax(150px, 1fr)) var(--row-btns-wrapp-size)';
// const rowTemplate = '100px repeat(2, 180px) 310px 200px 250px repeat(3, 150px) var(--row-btns-wrapp-size)';

const style = {
	header: {gridTemplateColumns: rowTemplate},
	bodyRow: {gridTemplateColumns: rowTemplate},
	forms: {
		width: '600px',
		display: 'grid',
		gridTemplateAreas: '"name providerId" "accessKey password" "email userName" "firstName secondName"',
		gridTemplateColumns: 'repeat(2 , 290px)',
		gridGap: '0px 10px'
	}
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
