<template>
	<input
		tabindex="-1"
		@input="setFilterParams($event.target.value)"
		:class="{'v-table__filter--hidden' : filterConfig.disableFilter}"
		class="v-table__filter"
		type="text"
		name="filter">
</template>

<script>
export default {
	name: 'Table_Header_DataFilter',
	props: {
		filterConfig: Object,
		filterDelayMode: {
			type: Object,
			default: () => ({active: false, delay: 400})
		}
	},
	data: () => ({
		timerName: null
	}),
	methods: {
		sendParams (value) {
			this.$emit('filter', {key: this.filterConfig.key, value});
		},
		setFilterParams (value) {
			if (this.filterDelayMode.active) {
				clearTimeout(this.timerName);

				this.timerName = setTimeout(() => {
					this.sendParams(value);
				}, this.filterDelayMode.delay);
			} else {
				this.sendParams(value);
			}
		}
	}
};
</script>

<style>
.v-table__filter {
	display: block;
	width: 100%;
	max-width: 200px;
}
.v-table__filter--hidden {
	visibility: hidden;
}
</style>
