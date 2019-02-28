<template>
	<div class="dlg-additional-content">
		<button
			@click="close"
			class="dlg-additional-content__btn-close">
			<font-awesome-icon :icon="faWindowClose" size="lg" />
		</button>
		<VueTable
			:label="scheme.tableLabel"
			:tableStyle="scheme.style"
			:renderMap="scheme.renderMap"
			:data="data"
			>
			<TableBodyRow
				slot-scope="{row}"
				:row="row"
				:renderMap="scheme.renderMap"
				:bodyRowStyle="scheme.style.bodyRow">
				<TableBodyRowBtn
					slot="row-buttons"
					@click.native="linkEl(row)"
					:type="btnType" />
			</TableBodyRow>
		</VueTable>
	</div>
</template>

<script>
/* components */
import VueTable from '@/components/table/VueTable.vue';
import TableBodyRow from '@/components/table/body/Table.Body.Row.vue';
import TableBodyRowBtn, {BTNS_LIST} from '@/components/table/body/Table.Body.Row.Btn.vue';

import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'Dlg_AdditionalContent',
	components: {
		VueTable,
		TableBodyRow,
		TableBodyRowBtn
	},
	props: {
		data: {
			type: Array,
			default: () => []
		},
		scheme: {
			type: Object,
			default: () => ({
				tableLabel: null,
				renderMap: [],
				style: {
					bodyRow: null,
					header: null,
					main: null
				}
			})
		}
	},
	data: () => ({
		faWindowClose,
		btnType: BTNS_LIST.link
	}),
	methods: {
		close () {
			this.$emit('close-add-content');
		},
		linkEl (el) {
			this.$emit('link-el', el);
		}
	}
};
</script>

<style>
.dlg-additional-content {
	background-color: #fff;
	width: 100%;
	height: 100%;
}

.dlg-additional-content__btn-close {
	position: absolute;
	top: 5px;
	right: 2px;
	padding: 2px;
	font-size: 18px;
	background-color: #fff;
	color: #f56c6c;
	transition: color .25s;
}
.dlg-additional-content__btn-close:hover {
	color: red;
}
</style>
