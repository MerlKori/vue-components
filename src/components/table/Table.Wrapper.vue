<template>
	<div class="v-table v-table--variables">
		<!-- SLOT TABLE CONTENT -->
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Table_Wrapper'
};
</script>

<style>
.v-table--variables {
	--row-btns-wrapp-size: 170px; /* size btns wrapper in body row for schemes */
	--row-btns-fz: 13px;
	--row-fz: 14px;
	--row-width: auto;
	--sticky-bs-left: none;
	--sticky-bs-right: none;
}
.v-table {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: #fff;
	margin: 0 auto;
	overflow: hidden;
}
.v-table-cell--sticky-left {
	position: sticky;
	left: 0;
	z-index: 50;
}
.v-table-cell--sticky-right {
	position: sticky;
	right: 0;
	z-index: 50;
}
</style>
