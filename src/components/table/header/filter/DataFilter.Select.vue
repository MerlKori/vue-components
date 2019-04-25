<template>
	<VueSelect
		v-model="select"
		:fixedBody="true"
		:scrollEvent="$attrs.scrollEvent"
		:options="getOptions"/>
</template>

<script>
/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

import VueSelect from '@/components/VueSelect.vue';

export default {
	name: 'DataFilter_Select',
	components: {VueSelect},
	inheritAttrs: false,
	props: {
		filterConfig: Object,
		filterData: Object
	},
	data: () => ({
		bodyStyle: {}
	}),
	computed: {
		...mapState(listStoreModules.Data.name, {
			GLOBAL_DATA: state => state
		}),
		getOptions () {
			const data = this.GLOBAL_DATA[this.filterConfig.filterEntity];

			if (!data[0] || Object.prototype.hasOwnProperty.call(data[0], 'value')) return data;

			/* if data isn`t format [{value: value, label: value}], for types */
			const options = data.map(item => ({value: item.name, label: item.name}));
			options.unshift({value: null, label: 'all'});

			return options;
		},
		select: {
			get () {
				const filter = this.filterData[this.filterConfig.key];
				if (!filter) {
					return this.getOptions[0];
				}
				return {
					value: filter.value,
					label: filter.value === null ? 'all' : filter.value
				};
			},
			set (data) {
				this.$emit('filter', {key: this.filterConfig.key, filterData: {value: data.value, type: 'select'}});
			}
		}
	}
};
</script>
