<template>
	<ul class="data-details__list">
		<li
			v-for="(config, idx) in configsList"
			:key="`item-${idx}`"
			class="data-details__list-item">
			<slot :config="config"></slot>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'DataDetails_List',
	props: {
		configsList: {
			type: Array,
			default: () => []
		}
	}
};
</script>

<style>
.data-details__list {
	padding: 10px 15px;
	height: calc(100% - 45px);
	overflow: auto;
	background-color: #fff;
}
.data-details__list-item {
	display: flex;
	margin-bottom: 15px;
	padding-bottom: 10px;
	font-size: 15px;
	border-bottom: 1px solid var(--c-grey-4);
}
</style>
