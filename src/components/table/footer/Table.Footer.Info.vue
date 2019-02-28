<template>
	<span
		:class="{'v-table__footer-info--active' : isActive}"
		class="v-table__footer-info">Selected items - {{selectedCount}}</span>
</template>

<script>
export default {
	name: 'Table_Footer_Info',
	props: {
		selectedCount: {
			type: Number,
			default: 0
		}
	},
	computed: {
		isActive () {
			return this.selectedCount > 0;
		}
	}
};
</script>

<style>
.v-table__footer-info {
	color: var(--c-grey-5);
	user-select: none;
	transition: color .3s;
}
.v-table__footer-info--active {
	color: var(--c-blue-8);
	transition: color .3s;
}
</style>
