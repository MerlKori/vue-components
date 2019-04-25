<template>
	<div class="v-table__footer">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Table_Footer'
};
</script>

<style>
.v-table__footer {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 40px;
	padding: 0 10px;
	border-top: var(--bd-grey-1);
}
</style>
