<template>
	<component
		@filter="proxiFilterEvent"
		:is="getFilterType"
		:filterConfig="filterConfig"
		:scrollEvent="$attrs.scrollEvent"
		:filterDelayMode="$attrs.filterDelayMode"
		:dateResetEvent="$attrs.dateResetEvent"
		:filterData="$attrs.filterData"
		:class="{'v-table__filter--hidden' : filterConfig.disableFilter}"
		class="v-table__filter">
	</component>
</template>

<script>
import DataFilterText from './DataFilter.Text.vue';
import DataFilterSelect from './DataFilter.Select.vue';
import DataFilterDate from './DataFilter.Date.vue';

export const filterTypes = {
	text: 'text',
	select: 'select',
	date: 'date'
};

export default {
	name: 'Table_Header_DataFilter',
	inheritAttrs: false,
	components: {
		DataFilterText,
		DataFilterSelect,
		DataFilterDate
	},
	props: {
		filterConfig: Object
	},
	methods: {
		proxiFilterEvent (data) {
			this.$emit('filter', data);
		}
	},
	computed: {
		getFilterType () {
			switch (this.filterConfig.filterType) {
				case filterTypes.text: return 'DataFilterText';
				case filterTypes.select: return 'DataFilterSelect';
				case filterTypes.date: return 'DataFilterDate';
			}
		}
	}
};
</script>

<style>
.v-table__filter {
	display: block;
	width: 100%;
	max-width: 220px;
}
.v-table__filter--hidden {
	visibility: hidden;
}
</style>
