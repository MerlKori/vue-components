// submodules
import accounts from './providers.accounts';
import types from './providers.types';

import endpoints from '@/api/endpoints';
import apiTemplate from '@/api/api-template';

const providers = apiTemplate.init(endpoints.general._provider.providers);

export default {
	providers,
	accounts,
	types
};
