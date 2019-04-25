import {listStoreModules} from '@/store/index';
import schemeDomains from '@/schemes/modules/domains/main';
import schemeResources from '@/schemes/modules/tracker-resource/main';

const entity = listStoreModules.Data.types.state.DOMAINS_ROTATION_VOLUUM;

const tableLabel = 'Domains for rotation voluum';

const rowTemplate = '40px 100px repeat(5, minmax(220px, 1fr)) 140px';

const style = {
	header: {gridTemplateColumns: rowTemplate},
	bodyRow: {gridTemplateColumns: rowTemplate}
};

const rowTemplateForBinding = {
	domains: '40px 100px repeat(5, minmax(220px, 1fr))',
	resources: '100px repeat(2, minmax(200px, 1fr)) repeat(2, minmax(150px, 1fr)) minmax(200px, 1fr)'
};

const styleForBinding = {
	domains: {
		header: {gridTemplateColumns: rowTemplateForBinding.domains},
		bodyRow: {gridTemplateColumns: rowTemplateForBinding.domains}
	},
	resources: {
		header: {gridTemplateColumns: rowTemplateForBinding.resources},
		bodyRow: {gridTemplateColumns: rowTemplateForBinding.resources}
	}
};

const subSchemesForBindingTables = {
	domains: {
		style: styleForBinding.domains,
		tableLabel: 'Select domains for resources',
		renderMap: schemeDomains.renderMap
	},
	resources: {
		style: styleForBinding.resources,
		tableLabel: 'Select resource',
		renderMap: schemeResources.renderMap
	}
};

export default {
	style,
	entity,
	tableLabel,
	reconfigMap: [],
	subSchemesForBindingTables,
	renderMap: schemeDomains.renderMap
};
