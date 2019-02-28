<template>
	<p v-show="IsEmpty" class="v-table-is-empty" >Table is empty</p>
</template>

<script>
export default {
	name: 'Table_IsEmpty',
	props: {
		IsEmpty: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style>
.v-table-is-empty {
	padding: 10px 0;
	font-size: 24px;
	color: var(--grey-dark);
	text-align: center;
	user-select: none;
}
</style>
