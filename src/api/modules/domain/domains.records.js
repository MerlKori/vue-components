// submodule
import types from './domains.record.types';
import endpoints from '@/api/endpoints';
import apiTemplate from '@/api/api-template';

const records = apiTemplate.init(endpoints.general._domain._record.records);

export default {
	records,
	types
};
