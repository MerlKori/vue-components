<template>
	<span class="v-table-body__cell-simple">{{value}}</span>
</template>

<script>
export default {
	name: 'Cell_Text',
	inheritAttrs: false,
	props: {
		value: [String, Number, Boolean]
	}
};
</script>

<style>
.v-table-body__cell-simple {
	margin-left: 5px;
}
</style>
