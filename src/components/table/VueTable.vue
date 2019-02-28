<template>
	<div
		:style="tableStyle.main"
		class="v-table v-table--variables">
		<h3 class="v-table__label">{{label}}</h3>
		<TableHeader
			@sort="setSortingData"
			@filter="setFilterData"
			:renderMap="$attrs.renderMap"
			:headerStyle="tableStyle.header"
			:disabled="isEmpty"
			:activeSortData="sorting.data" >
			<template slot="header-checkbox">
				<slot name="header-checkbox"></slot>
			</template>
		</TableHeader>
		<TableBody
			:data="getRenderData"
			:renderMap="$attrs.renderMap"
			:IsEmpty="isEmpty">
			<template slot-scope="{row}">
				<slot :row="row" ></slot>
			</template>
		</TableBody>

		<slot name="table-footer"></slot>
	</div>
</template>

<script>
/* components */
import TableHeader from '@/components/table/header/Table.Header.vue';
import TableBody from '@/components/table/body/Table.Body.vue';

export default {
	name: 'Table',
	components: {
		TableHeader,
		TableBody
	},
	inheritAttrs: false,
	props: {
		label: String,
		data: {
			type: Array,
			default: () => []
		},
		tableStyle: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		filterData: {},
		sorting: {
			data: {
				key: null,
				direction: null
			},
			count: 0
		}
	}),
	methods: {
		setFilterData (data) {
			this.$set(this.filterData, data.key, data.value);
			if (!this.checkbox) return;

			if (this.checkbox.selectedAll) {
				this.resetCheckboxData();
			}
		},
		getFilteredData (data, filterData) {
			/* check keys */
			const notEmptyStr = str => String(str).trim().length > 0;
			const activeFilterKeys = Object.keys(filterData).filter(key => notEmptyStr(filterData[key]));
			if (activeFilterKeys.length === 0) return data;

			/* filter data */
			const strToLowerCase = el => String(el).toLowerCase();
			const findSimilar = (item, checkKeys) => {
				let elValue = null;
				let filterValue = null;
				return checkKeys.some(key => {
					elValue = strToLowerCase(item[key]);
					filterValue = strToLowerCase(filterData[key]);
					return elValue.includes(filterValue);
				});
			};
			return data.filter(i => findSimilar(i, activeFilterKeys));
		},

		setSortingData (data) {
			this.sorting.count = this.sorting.data.key === data.key ? this.sorting.count + 1 : 0;

			if (this.sorting.count === 2) {
				this.sorting.count = 0;
				this.sorting.data = {key: null, direction: null};
			} else {
				this.sorting.data = data;
			}
		},
		sortingData (data, sortingKey, direction) {
			if (!sortingKey || !direction) return data;
			const directionIsUp = direction === 1;
			const sortData = data.sort((a, b) => {
				const checkBoolen = (v1, v2) => {
					if (v1 === v2) {
						return 0;
					}
					return v1 ? -1 : 1;
				};
				const fieldType = typeof a[sortingKey];
				switch (fieldType) {
					case 'number': return a[sortingKey] - b[sortingKey];
					case 'string': return a[sortingKey].localeCompare(b[sortingKey]);
					case 'boolean': return checkBoolen(a[sortingKey], b[sortingKey]);
					default: return a[sortingKey] - b[sortingKey];
				}
			});

			return directionIsUp ? sortData : sortData.reverse();
		}
	},
	computed: {
		getRenderData () {
			const copyData = JSON.parse(JSON.stringify(this.data));
			const filteredData = this.getFilteredData(copyData, this.filterData);
			return this.sortingData(filteredData, this.sorting.data.key, this.sorting.data.direction);
		},
		isEmpty () {
			return this.data.length === 0;
		}
	}
};
</script>

<style>
.v-table--variables {
	--row-btns-wrapp-size: 150px; /* size btns wrapper in body row for schemes */
	--row-btns-fz: 13px;
	--row-fz: 14px;
}
.v-table {
	width: 100%;
	height: 100%;
	background-color: #fff;
	border: var(--border);
	border-radius: 3px;
	margin: 5px auto;
	overflow: hidden;
	will-change: width;
	transition: width .1s;
}
.v-table__label {
	font-size: 20px;
	padding: 5px 10px;
	margin-bottom: 5px;
	user-select: none;
}
</style>
