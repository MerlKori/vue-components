// submodules
import types from './resources.types';

import endpoints from '@/api/endpoints';
import apiTemplate from '@/api/api-template';

const resources = apiTemplate.init(endpoints.general._resource.resources);

export default {
	resources,
	types
};
