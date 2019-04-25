import {listStoreModules} from '@/store/index';
import schemeDomains from '@/schemes/modules/domains/main';

const entity = listStoreModules.Data.types.state.DOMAINS_RECONFIG;

const tableLabel = 'Domains on DNS reconfiguration';

export default {
	style: schemeDomains.stylesForTransfer,
	entity,
	tableLabel,
	reconfigMap: [],
	renderMap: schemeDomains.renderMap
};
