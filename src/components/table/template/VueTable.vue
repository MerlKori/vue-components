<template>
	<!-- only for other colections -->
	<TableWrapper>
		<!-- TOP CONTROL PANEL -->
		<TableControlPanel
			@clear-filters="clearFilterData()"
			@toggle-data-details="toggleDataDetails()"
			:filtersAreEmpty="filtersAreEmpty"
			:dataDetailsIsShow="dataDetailActive"
			:itemsCounts="getDataForRender.length"
			:tableLabel="scheme.tableLabel">
			<template>
				<slot name="table-control-panel"></slot>
			</template>

			<!-- SLOT FOR CLOSE BTN -->
			<template slot="control-panel-btn-close">
				<slot name="control-panel-btn-close"></slot>
			</template>
		</TableControlPanel>

		<TableMainContentWrapp :visibilityDataDetails="dataDetailActive">
			<!-- HEADER -->
			<TableHeader
				ref="TableHeader"
				@sort="setSortingData"
				@filter="setFilterData"
				@set-cells-position="setCellsPositions"
				:renderMap="scheme.renderMap"
				:headerStyle="scheme.style.header"
				:filterData="filterData"
				:disabled="isEmpty"
				:showActionsLabel="withActions"
				:activeSortData="sorting.data"
				:filterDateResetEvent="filterDateResetEvent" >

				<!-- SLOT FOR MAIN CBX -->
				<template slot="header-checkbox">
					<slot name="header-checkbox"></slot>
				</template>
			</TableHeader>

			<!-- BODY -->
			<TableBody
				:data="getItemsCurrentBodyPage"
				:loadingProcess="$attrs.loadingProcess"
				:scheme="scheme"
				:IsEmpty="isEmpty">

				<!-- ROWS -->
				<TableBodyRow
					slot-scope="{row}"
					@click.native="selectRow(row)"
					:row="row"
					:cellsPositions="cellsPositions"
					:withActions="withActions"
					:scheme="scheme"
					:selected="isSelectedRow(row)"
					:deactiveRow="row.active === 0">

					<!-- SLOT FOR CBX-->
					<template slot="row-checkbox">
						<slot :row="row" name="row-checkbox"></slot>
					</template>

					<!-- SLOT FOR BTNS -->
					<template slot="row-buttons">
						<slot :row="row" name="row-buttons"></slot>
					</template>
				</TableBodyRow>
			</TableBody>

			<DataDetails
				@close-data-details="toggleDataDetails()"
				slot="data-details"
				:rowData="row.selected"
				:renderMap="scheme.renderMap" />
		</TableMainContentWrapp>
		<TableFooter>
			<slot name="table-footer"></slot>
			<PaginationWrapp>
				<Pagination
					slot="pagination"
					v-model="bodyPages.current"
					:pagesList="getBodyPagesList" />
				<VueSelect
					slot="items-count"
					direction="up"
					v-model="setItemsCountOnPage"
					:options="generateVariantsItemsOnPage" />
			</PaginationWrapp>
		</TableFooter>
	</TableWrapper>
</template>

<script>
/* modiles */
import Module_SelectRows from './select-row';
import Module_Filtering from './filtering';
import Module_Sorting from './sorting';
import Module_Pagination from './pagination';

/* components */
import TableWrapper from '@/components/table/Table.Wrapper.vue';
import TableControlPanel from '@/components/table/control-panel/Table.ControlPanel.vue';
import TableMainContentWrapp from '@/components/table/wrappers/Table.MainContentWrapp.vue';
import TableHeader from '@/components/table//header/Table.Header.vue';
import TableBody from '@/components/table//body/Table.Body.vue';
import TableBodyRow from '@/components/table/body/Table.Body.Row.vue';
import TableFooter from '@/components/table/footer/Table.Footer.vue';
import PaginationWrapp from '@/components/table/wrappers/PaginationWrapp.vue';
import VueSelect from '@/components/VueSelect.vue';
import Pagination from '@/components/lib/pagination/Pagination.vue';
import DataDetails from '@/components/table/data-details/DataDetails.vue';

import utils from '@/utils';

export default {
	name: 'Vue_Table',
	components: {
		TableWrapper,
		TableControlPanel,
		TableMainContentWrapp,
		TableHeader,
		TableBody,
		TableBodyRow,
		TableFooter,
		VueSelect,
		Pagination,
		DataDetails,
		PaginationWrapp
	},
	inheritAttrs: false,
	props: {
		data: {
			type: Array,
			default: () => []
		},
		scheme: {
			type: Object,
			default: () => ({
				style: {},
				renderMap: []
			})
		},
		withActions: {
			type: Boolean,
			default: false
		},
		highlightRow: {
			type: Object
		}
	},
	data: () => ({
		...Module_SelectRows.data(),
		...Module_Filtering.data(),
		...Module_Sorting.data(),
		...Module_Pagination.data(),
		cellsPositions: [],
		dataDetailActive: false
	}),
	methods: {
		...Module_SelectRows.methods,
		...Module_Filtering.methods,
		...Module_Sorting.methods,
		...Module_Pagination.methods,

		setCellsPositions (cellsPositions) {
			this.cellsPositions = cellsPositions;
		},
		rewriteCellsPositionsLeft (decoratorFn) {
			this.cellsPositions = decoratorFn(this.cellsPositions);
			this.$refs.TableHeader.setCellsPositions(this.cellsPositions);
		},

		toggleDataDetails () {
			this.dataDetailActive = !this.dataDetailActive;
		}
	},
	computed: {
		...Module_Pagination.computeds,
		getDataForRender () {
			const copyData = utils._deepCopy(this.data);
			const filteredData = this.getFilteredData(copyData);
			return this.sortingData(filteredData);
		},
		isEmpty () {
			return this.data.length === 0;
		}
	},
	watch: {
		highlightRowName: {
			handler () {
				if (!this.highlightRow) return;
				this.selectRow(this.highlightRow);
			},
			immediate: true
		}
	}
};
</script>
