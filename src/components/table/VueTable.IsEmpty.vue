<template>
	<p class="v-table-is-empty" >Table is empty!</p>
</template>

<script>
export default {
	name: 'Vue_Table_IsEmpty'
};
</script>

<style>
.v-table-is-empty {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 10px 0;
	font-size: 32px;
	color: var(--c-grey-5);
	text-align: center;
	user-select: none;
}
</style>
