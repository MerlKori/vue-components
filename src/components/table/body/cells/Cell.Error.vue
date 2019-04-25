<template>
	<div
		:class="{'v-table-body__cell-error--disabled' : !value}"
		class="v-table-body__cell-error">
		<span class="v-table-body__cell-error-icon icon-error-2"></span>
		<span class="v-table-body__cell-error-text">{{value}}</span>
	</div>
</template>

<script>
export default {
	name: 'Cell_Error',
	inheritAttrs: false,
	props: {
		value: String
	}
};
</script>

<style>
.v-table-body__cell-error {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0 5px;
	color: var(--c-red-6);
	background-color: var(--c-red-1);
	border: 1px solid var(--c-red-2);
	border-radius: 3px;
}
.v-table-body__cell-error-icon {
	margin: 3px 5px 0 0;
	align-self: flex-start;
	font-size: 1.1em;
	color: inherit;
	opacity: .3;
}
.v-table-body__cell-error-text {
	font-size: .9em;
	color: inherit;
}
.v-table-body__cell-error--disabled {
	background-color: var(--c-grey-1);
	border-color: var(--c-grey-1);
	color: var(--c-grey-4);
}
</style>
