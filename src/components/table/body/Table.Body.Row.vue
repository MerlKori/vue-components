<template>
	<div
		:style="bodyRowStyle"
		:class="{'v-table-body__row--highlight' : highlightRow, 'v-table-body__row--deactive' : deactiveRow}"
		class="v-table-body__row">
		<slot name="row-checkbox"></slot>
		<component
			v-for="(item, idx) in renderMap"
			:key="idx"
			:is="getCell(item).component"
			:data="getCell(item).data" />
		<div class="v-table-body__row-btns">
			<slot name="row-buttons"></slot>
		</div>
	</div>
</template>

<script>
import TableBodyRowCell from '@/components/table/body/Table.Body.Row.Cell.vue';
import TableBodyRowLinkCell from '@/components/table/body/Table.Body.Row.LinkCell.vue';

export default {
	name: 'Table_Body_Row',
	components: {
		TableBodyRowCell,
		TableBodyRowLinkCell
	},
	props: {
		row: Object,
		renderMap: Array,
		bodyRowStyle: Object,
		highlightRow: Boolean,
		deactiveRow: Boolean
	},
	methods: {
		getCell (obj) {
			if (Object.hasOwnProperty.call(obj, 'route')) {
				return {
					component: 'TableBodyRowLinkCell',
					data: {value: this.row[obj.key], route: obj.route}
				};
			}
			return {
				component: 'TableBodyRowCell',
				data: {value: this.row[obj.key], key: obj.key}
			};
		}
	}
};
</script>

<style>
.v-table-body__row {
	display: grid;
	align-items: center;
	grid-gap: 10px;
	font-size: var(--row-fz);
	padding: .2em 0 .2em 1em;
	transition: font-size .25s, background-color .2s;
}
.v-table-body__row:not(:last-of-type) {
	border-bottom: 1px solid var(--c-grey-3);
}
.v-table-body__row:nth-child(even) {
	background-color:#F9FBFE;
}
.v-table-body__row--highlight {
	background-color: #04e76696 !important;
}
.v-table-body__row--deactive {
	background-color: #ffece8;
}
.v-table-body__row--deactive:nth-child(even) {
	background-color: #fff6f4;
}
.v-table-body__row-btns {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
