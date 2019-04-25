<template>
	<transition-group
		name="table-main"
		tag="div"
		class="v-table__main-content">
		<div
			key="wrapp-for-header-and-body"
			class="v-table__header-body-wrapp">
			<slot></slot>
		</div>
		<div
			v-if="visibilityDataDetails"
			key="wrapp-for-data-details"
			class="v-table__data-details-wrapp">
			<slot name="data-details"></slot>
		</div>
	</transition-group>
</template>

<script>
export default {
	name: 'Table_MainContentWrapp',
	props: {
		visibilityDataDetails: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style>
.v-table__main-content {
	display: flex;
	height: calc(100% - 50px);
	overflow: hidden;
}
.v-table__header-body-wrapp {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	height: 100%;
	overflow: hidden;
}
.v-table__data-details-wrapp {
	min-width: 400px;
	margin-left: 10px;
	box-shadow: -1px 0 10px var(--c-grey-5);
}

/* transition */
.table-main-enter-active {
	transition: transform .35s;
}
.table-main-leave-active {
	transition: all .4s;
	/* position: absolute;
	right: 0;
	z-index: 0; */
}
/* .table-main-enter {
	transform: translateX(100%);
} */
.table-main-leave-to,
.table-main-enter {
	transform: translateX(100%);
}
.table-main-move {
	transition: all .4s;
}

</style>
