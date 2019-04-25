import {listStoreModules} from '@/store/index';
import schemeDomains from '@/schemes/modules/domains/main';

const entity = listStoreModules.Data.types.state.DOMAINS_GREENLISTING;

const tableLabel = 'Domains for Greenlisting';

export default {
	style: schemeDomains.stylesForTransfer,
	entity,
	tableLabel,
	reconfigMap: [],
	renderMap: schemeDomains.renderMap
};
