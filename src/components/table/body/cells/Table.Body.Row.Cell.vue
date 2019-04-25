<template>
	<div
		:style="getPositionLeft"
		class="v-table-body__cell-wrapp"
		:class="setClasses">
		<!-- route for link cell -->
		<!-- dateFormat for date cell -->
		<component
			:is="getCellType"
			:value="rowData[config.key]"
			:route="config.route"
			:dateFormat="config.dateFormat" />
	</div>
</template>

<script>
/* components */
import CellText from './Cell.Text.vue';
import CellDate from './Cell.Date.vue';
import CellError from './Cell.Error.vue';
import CellLink from './Cell.Link.vue';
import CellStatus from './Cell.Status.vue';

export const types = {
	text: 'text',
	date: 'date',
	error: 'error',
	link: 'link',
	status: 'status'
};

export default {
	name: 'Table_Body_Row_Cell',
	components: {
		CellText,
		CellDate,
		CellError,
		CellLink,
		CellStatus
	},
	inheritAttrs: false,
	props: {
		config: Object,
		nameLastStickyCell: String,
		cellsPositions: Array,
		rowData: Object
	},
	computed: {
		getCellType () {
			switch (this.config.cellType) {
				case types.text: return 'CellText';
				case types.date: return 'CellDate';
				case types.error: return 'CellError';
				case types.link: return 'CellLink';
				case types.status: return 'CellStatus';
				default: return null;
			}
		},
		setClasses () {
			return {
				'v-table-body__cell-wrapp--sticky': this.config.sticky,
				'v-table-body__cell-wrapp--sticky-last': this.config.title === this.nameLastStickyCell
			};
		},
		getPositionLeft () {
			if (!this.config.sticky || !this.cellsPositions) return null;
			const position = this.cellsPositions.find(item => item.key === this.config.key);
			return {left: !position ? 0 : position.left};
		}
	}
};
</script>

<style>
.v-table-body__cell-wrapp {
	display: flex;
	align-items: center;
	padding: .5em 10px;
	background-color: var(--row-bg);
	border-bottom: var(--row-bd-bottom);
	color: inherit;
	font-size: inherit;
	font-weight: inherit;
	word-break: break-all;
}
.v-table-body__cell-wrapp:first-child {
	padding-left: 15px;
}

.v-table-body__cell-wrapp--sticky {
	position: sticky;
	z-index: 50;
}

.v-table-body__cell-wrapp--sticky-last::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--sticky-bs-left);
	transition: box-shadow .25s;
}
</style>
