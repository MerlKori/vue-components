<template>
	<div
		ref="bodyRow"
		:style="scheme.style.bodyRow"
		:class="getClasses"
		class="v-table-body__row">

		<!-- @slot row-checkbox -->
		<slot name="row-checkbox"></slot>

		<TableBodyRowCell
			v-for="(item, idx) in scheme.renderMap"
			:key="idx"
			:cellsPositions="$attrs.cellsPositions"
			:config="item"
			:rowData="row"
			:nameLastStickyCell="getNameLastStykyCell" />

		<div
			v-if="withActions"
			@click.stop
			class="v-table-body__row-btns v-table-body__row-btns--sticky">
			<!-- @slot row-buttons -->
			<slot name="row-buttons"></slot>
		</div>
	</div>
</template>

<script>
import TableBodyRowCell from './cells/Table.Body.Row.Cell.vue';

export default {
	name: 'Table_Body_Row',
	components: {
		TableBodyRowCell
	},
	inheritAttrs: false,
	props: {
		row: Object,
		deactiveRow: Boolean,
		selected: Boolean,
		withActions: Boolean,
		scheme: {
			type: Object,
			default: () => ({
				style: {},
				renderMap: []
			})
		}
	},
	computed: {
		getClasses () {
			return {
				'v-table-body__row--deactive': this.deactiveRow,
				'v-table-body__row--selected': this.selected
			};
		},
		getNameLastStykyCell () {
			let name;
			this.scheme.renderMap.forEach(el => {
				if (!el.sticky) return;
				name = el.title;
			});
			return name;
		}
	}
};
</script>

<style>
.v-table-body__row {
	--row-bg: #fff;
	--row-bd-bottom: none; /*1px solid var(--c-grey-3); */
}
.v-table-body__row {
	position: relative;
	display: grid;
	font-size: var(--row-fz); /* table var */
	cursor: pointer;
	grid-auto-flow: column;
}

.v-table-body__row:not(:last-of-type) {
	--row-bd-bottom: 1px solid var(--c-grey-3);
}

.v-table-body__row:nth-child(even) {
	--row-bg:var(--c-grey-1);
}

/* row deactive style */
.v-table-body__row--deactive {
	--row-bg: #ffece8;
}
.v-table-body__row--deactive:nth-child(even) {
	--row-bg: #fff6f4;
}

/* link and Selected to row */
.v-table-body__row--selected,
.v-table-body__row--selected:nth-child(even) {
	--row-bg: #E5F5FF;
}

.v-table-body__row--highlight::before,
.v-table-body__row--selected::before {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1.5px;
	background: #56B0EE;
	z-index: 52;
}

/* hover */
.v-table-body__row:hover:not(.v-table-body__row--selected):not(.v-table-body__row--highlight) {
	--row-bg: #EDF8FF;
}


/* BTNS */
.v-table-body__row-btns {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 10px;
	background-color: var(--row-bg);
	border-bottom: var(--row-bd-bottom);
	border-left: 1px solid var(--c-grey-4);
}
.v-table-body__row-btns--sticky {
	position: sticky;
	right: 0;
	z-index: 50;
}
.v-table-body__row-btns--sticky::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--sticky-bs-right);
	transition: box-shadow .25s;
}
</style>
