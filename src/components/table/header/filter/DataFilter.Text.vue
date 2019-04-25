<template>
	<!-- @input="setFilterParams($event.target.value)" -->
	<div class="data-filter-text">
		<span class="data-filter-text__icon icon-search"></span>
		<input
			v-model="setFilter"
			type="text"
			placeholder="..."
			class="data-filter-text__input"
			name="filter"
			autocomplete="off">
	</div>
</template>

<script>
export default {
	name: 'DataFilter_Text',
	inheritAttrs: false,
	props: {
		filterConfig: Object,
		filterData: Object,
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
			this.$emit('filter', {key: this.filterConfig.key, filterData: {value, type: 'text'}});
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
	},
	computed: {
		setFilter: {
			get () {
				return !this.filterData[this.filterConfig.key] ? null : this.filterData[this.filterConfig.key].value;
			},
			set (data) {
				this.setFilterParams(data);
				// console.log(data);
			}
		}
	}
};
</script>

<style>
.data-filter-text {
	position: relative;
}
.data-filter-text__icon {
	position: absolute;
	top: 7px;
	right: 3px;
	font-size: 18px;
	color: var(--c-grey-4);
}
.data-filter-text__input {
	padding: 5px 20px 5px 5px;
}
</style>
