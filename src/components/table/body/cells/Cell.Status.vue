<template>
	<span
		class="v-table-body__cell-status"
		:class="getStyle">
		{{value}}
	</span>
</template>

<script>
export default {
	name: 'Cell_Status',
	inheritAttrs: false,
	props: {
		value: String
	},
	computed: {
		getStyle () {
			switch (this.value) {
				case 'DONE':
					return 'v-table-body__cell-status--done';
				case 'SAFE':
					return 'v-table-body__cell-status--done';
				case 'FAILED':
					return 'v-table-body__cell-status--failed';
				case 'UNSAFE':
					return 'v-table-body__cell-status--failed';
				case 'PROCESSING':
					return 'v-table-body__cell-status--processing';
				default:
					return null;
			}
		}
	}
};
</script>

<style>
.v-table-body__cell-status {
	padding: 2px 0;
	width: 100px;
	color: #fff;
	border-radius: 3px;
	text-align: center;
}
.v-table-body__cell-status--done {
	background-color: var(--c-blue-5);
}
.v-table-body__cell-status--failed {
	background-color: var(--c-red-5);
}
.v-table-body__cell-status--processing {
	background-color: var(--c-yellow-4);
	color: var(--c-orange-5);
}
</style>
