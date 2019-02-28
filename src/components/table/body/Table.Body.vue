<template>
	<div
		ref="tableBody"
		@scroll="addShadow($event)"
		:style="{'height': height}"
		class="v-table__body"
	>
		<!-- DUMMY BLOCK TO SCROLL -->
		<div
			v-for="(i, idx) in renderMap"
			:key="idx"
			class="v-table__body-dummy">
			<div></div>
		</div>
		<slot
			v-for="(row) in data"
			:row="row">
		</slot>
		<TableIsEmpty :IsEmpty="$attrs.IsEmpty" />
	</div>
</template>

<script>
// components
import TableIsEmpty from './Table.IsEmpty.vue';

// other
// import ResizeObserver from 'resize-observer-polyfill';

export default {
	name: 'Table_Body',
	components: {
		TableIsEmpty
	},
	inheritAttrs: false,
	props: {
		data: Array,
		renderMap: Array
	},
	data: () => ({
		height: null
	}),
	mounted () {
		this.setHeight();
		// this.$nextTick(() => {
		// 	const obs = new ResizeObserver(() => {
		// 		/* entries, observer */
		// 		// this.resizeHeader();
		// 	});
		// 	obs.observe(this.$refs.tableBody);
		// });
		// resizeHeader () {
		// 	if (this.$refs.tableHead) {
		// 		this.$refs.tableHead.style.width = `${this.$refs.tableBody.clientWidth}px`;
		// 	}
		// },
		// scrollTableHead (e) {
		// 	this.$refs.tableHead.scrollLeft = e.target.scrollLeft;
		// }
		// @scroll="scrollTableHead($event)"
	},
	methods: {
		addShadow (event) {
			const el = event.target;
			const scrollTop = el.scrollTop;
			const header = el.previousElementSibling;
			header.style.boxShadow = scrollTop !== 0 ? '0 12px 30px -16px rgba(36,36,36, .5)' : 'none';
		},
		setHeight () {
			const el = this.$refs.tableBody;
			const parentHeight = el.parentElement.offsetHeight;
			const headerHeight = el.previousElementSibling.offsetHeight;
			const footerHeight = el.nextElementSibling ? el.nextElementSibling.offsetHeight : 0;
			this.height = `calc(${parentHeight}px - (${headerHeight}px + ${footerHeight}px + 50px))`;
		}
	}
};
</script>

<style>
.v-table__body {
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
.v-table__body-dummy {
	display: grid;
	grid-auto-rows: 1px;
	grid-gap: 10px;
	opacity: 0;
	visibility: hidden;
}
</style>
