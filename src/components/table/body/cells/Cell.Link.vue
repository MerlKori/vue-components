<template>
	<a
		@dblclick="$router.push({name: route, params: {dataTransfer: value}})"
		:class="{'v-table-body__cell-link--disabled' : !value}"
		class="v-table-body__cell-link"
	>{{value}}</a>
</template>

<script>
export default {
	name: 'Cell_Date',
	inheritAttrs: false,
	props: {
		value: String,
		route: String
	}
};
</script>

<style>
.v-table-body__cell-link {
	position: relative;
	margin: 0 .5em;
	min-width: 10px;
	font-size: inherit;
	font-weight: inherit;
	word-break: break-all;
	color: var(--c-blue-2);
	border-bottom: 1px solid var(--c-blue-2);
	cursor: pointer;
	overflow: hidden;
	transition: color .35s, border-color .35s;
	z-index: 1;
}

.v-table-body__cell-link:hover {
	border-bottom-color: var(--c-green-4);
	color: var(--c-green-4);
}
.v-table-body__cell-link--disabled {
	pointer-events: none;
	border-bottom: 1px solid var(--c-grey-4);
}
</style>
