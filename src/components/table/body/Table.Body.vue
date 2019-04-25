<template>
	<div
		ref="tableBody"
		@scroll="scrollHandler($event)"
		class="v-table__body scrollbar"
	>
		<!-- DUMMY BLOCK TO SCROLL -->
		<div
			:style="scheme.style.bodyRow"
			class="v-table__body-dummy"></div>

		<!-- table Empty title -->
		<TableIsEmpty v-if="isEmpty" />

		<!-- Loading data for Table -->
		<TableLoader v-if="isLoading" />

		<!-- ROWS -->
		<slot
			v-for="(row) in data"
			:eventResize="eventResizeTable"
			:row="row">
		</slot>
	</div>
</template>

<script>
/* other */
import ResizeObserver from 'resize-observer-polyfill';

/* components */
import TableIsEmpty from '../VueTable.IsEmpty.vue';
import TableLoader from '../VueTable.Loader.vue';

export default {
	name: 'Table_Body',
	components: {
		TableIsEmpty,
		TableLoader
	},
	inheritAttrs: false,
	props: {
		data: {
			type: Array,
			default: () => []
		},
		loadingProcess: Boolean,
		scheme: Object
	},
	data: () => ({
		height: null,
		eventResizeTable: false
	}),
	mounted () {
		this.$nextTick(() => {
			const obs = new ResizeObserver(entries => {
				/* entries, observer */
				this.setShadowForCell(entries[0].target);
				this.resizeHeader();
			});
			obs.observe(this.$refs.tableBody);
		});
	},
	methods: {
		/* SCROLL EVENT */
		addShadow (el, header) {
			const scrollTop = el.scrollTop;
			header.style.boxShadow = scrollTop !== 0 ? '0 12px 15px -16px rgba(36,36,36, .5)' : 'none';
		},
		scrollTableHead (el, header) {
			header.scrollLeft = el.scrollLeft;
		},
		scrollHandler (event) {
			const el = event.target;
			const header = el.previousElementSibling;
			if (!header) return;
			this.addShadow(el, header);
			this.scrollTableHead(el, header);
			this.setShadowForCell(el);
		},

		/* SET SIZES */
		resizeHeader () {
			const header = !this.$refs.tableBody ? null : this.$refs.tableBody.previousElementSibling;
			if (!header) return;
			header.style.width = `${this.$refs.tableBody.clientWidth}px`;
		},

		/* SET STYLE */
		setShadowForCell (el) {
			const setVariables = (element, variable, value) => (!element.parentElement ? null : element.parentElement.style.setProperty(variable, value));
			const withoutScroll = el.scrollWidth === el.clientWidth;
			const scrollPositionEnd = el.clientWidth + el.scrollLeft >= el.scrollWidth - 1;
			const scrollPositionStart = el.scrollLeft === 0;

			/* Reset shadow */
			if (withoutScroll) {
				setVariables(el, '--sticky-bs-left', 'none');
				setVariables(el, '--sticky-bs-right', 'none');
			}
			if (scrollPositionEnd) {
				setVariables(el, '--sticky-bs-right', 'none');
			}
			if (scrollPositionStart) {
				setVariables(el, '--sticky-bs-left', 'none');
			}

			/* Add shadow */
			if (!withoutScroll && !scrollPositionStart) {
				setVariables(el, '--sticky-bs-left', '3px 0 8px rgba(0,0,0, .22)');
			}
			if (!withoutScroll && !scrollPositionEnd) {
				setVariables(el, '--sticky-bs-right', '-3px 0 8px rgba(0,0,0, .22)');
			}
			if (!withoutScroll && !scrollPositionStart && !scrollPositionEnd) {
				setVariables(el, '--sticky-bs-right', '-3px 0 8px rgba(0,0,0, .22)');
				setVariables(el, '--sticky-bs-left', '3px 0 8px rgba(0,0,0, .22)');
			}
		}
	},
	computed: {
		isEmpty () {
			return this.data.length === 0 && !this.loadingProcess;
		},
		isLoading () {
			return this.data.length === 0 && this.loadingProcess;
		}
	}
};
</script>

<style>
.v-table__body {
	position: relative;
	display: grid;
	grid-auto-rows: max-content;
	width: 100%;
	height: calc(100% - 75px);
	flex-grow: 1;
	overflow: auto;
}
.v-table__body-dummy {
	display: grid;
	height: 1px;
	opacity: 0;
	visibility: hidden;
}
</style>
