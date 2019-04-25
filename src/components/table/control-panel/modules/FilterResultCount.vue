<template>
	<div class="filters-result-count">{{itemsCounts}} Results</div>
</template>

<script>
export default {
	name: 'FilterResultCount',
	props: {
		itemsCounts: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style>
.filters-result-count {
	min-width: 115px;
	padding: 4px 0;
	border: 1px solid var(--c-grey-5);
	border-radius: 3px;
	color: var(--c-grey-6);
	text-align: center;
}
</style>
