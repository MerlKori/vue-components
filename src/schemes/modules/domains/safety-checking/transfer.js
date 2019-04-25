import {listStoreModules} from '@/store/index';
import schemeDomains from '@/schemes/modules/domains/main';

const entity = listStoreModules.Data.types.state.DOMAINS_SAFETY_CHECKING;

const tableLabel = 'Domains for safety checking';

export default {
	style: schemeDomains.stylesForTransfer,
	entity,
	tableLabel,
	reconfigMap: [],
	renderMap: schemeDomains.renderMap
};
