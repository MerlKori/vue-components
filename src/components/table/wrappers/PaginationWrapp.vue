<template>
	<div class="pagination-wrapp ml-auto">
		<div class="pagination-wrapp__pagination">
			<slot name="pagination"></slot>
		</div>

		<span class="pagination-wrapp__items-count-label">Show:</span>
		<div class="pagination-wrapp__items-count mr-4">
			<slot name="items-count"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Pagination_Wrapp'
};
</script>

<style>
.pagination-wrapp {
	display: flex;
	align-items: center;
}
/* .control-panel__pagination {
	display: flex;
	justify-content: center;
} */

.pagination-wrapp__items-count-label {
	margin: 0 10px;
	font-size: 15px;
	color: var(--c-grey-6);
}
.pagination-wrapp__items-count {
	width: 60px;
}
</style>
