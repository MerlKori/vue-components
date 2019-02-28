<template>
	<div
		@click.stop="sort()"
		class="v-table-sorting"
		:class="{'v-table-sorting--disabled' : sortingComfig.disableSorting}"
	>
		<div
			:class="{'v-table-sorting__arrow--active' : activeDirectionUp}"
			class="v-table-sorting__arrow v-table-sorting__arrow--up"></div>
		<div
			:class="{'v-table-sorting__arrow--active' : activeDirectionDown}"
			class="v-table-sorting__arrow v-table-sorting__arrow--down"></div>
	</div>
</template>

<script>
const directions = {
	up: 1,
	down: 2
};

export default {
	name: 'Table_Header_DataSorting',
	props: {
		sortingComfig: Object,
		activeSortData: {
			type: Object,
			default: () => ({key: null, direction: null})
		}
	},
	data: () => ({
		direction: directions.down
	}),
	computed: {
		getNextDirection () {
			return this.direction === directions.up ? directions.down : directions.up;
		},
		activeDirectionUp () {
			return this.sortingComfig.key === this.activeSortData.key && this.activeSortData.direction === directions.up;
		},
		activeDirectionDown () {
			return this.sortingComfig.key === this.activeSortData.key && this.activeSortData.direction === directions.down;
		}
	},
	methods: {
		sort () {
			this.direction = this.getNextDirection;
			const data = {
				key: this.sortingComfig.key,
				direction: this.direction
			};
			this.$emit('sort', data);
		}
	}
};
</script>

<style>
.v-table-sorting {
	width: 25px;
	cursor: pointer;
}
.v-table-sorting__arrow {
	width: 0px;
	height: 0px;
	border: 6px solid transparent;
	border-top-color: #94c8f8;
	cursor: pointer;
}
.v-table-sorting__arrow--active {
	border-top-color: #0085FF;
}
.v-table-sorting__arrow--up {
	transform: rotate(180deg) translate(-5px, 4px);
}
.v-table-sorting__arrow--down {
	transform: rotate(0deg) translate(5px, 4px);
}
.v-table-sorting--disabled {
	visibility: hidden;
}
</style>
