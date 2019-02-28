<template>
	<a
		@dblclick="$router.push({name: data.route, params: {dataTransfer: data.value}})"
		class="v-table-body__link-cell">
		{{data.value}}
	</a>
</template>

<script>
export default {
	name: 'Table_Body_Row_LinkCell',
	inheritAttrs: false,
	props: {
		data: Object
	}
};
</script>

<style>
.v-table-body__link-cell {
	position: relative;
	display: flex;
	align-items: center;
	padding: 5px;
	font-size: inherit;
	font-weight: inherit;
	word-break: break-all;
	color: inherit;
	background-color: rgba(7,244,43, .1);
	outline: 1px solid #fff;
	cursor: pointer;
	overflow: hidden;
	transition: background-color .4s;
}
.v-table-body__link-cell:hover {
	background-color: rgba(7,244,43, .5);
}
</style>
