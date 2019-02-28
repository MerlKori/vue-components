<template>
	<div class="v-table-body__cell">
		<!-- TODO: переписать на один компонент -->
		<span
			v-if="isStatusCell"
			class="v-table-body__cell--status"
			:class="getStatusStyle">
			{{data.value}}
		</span>
		<textarea
			v-else-if="isDescCell"
			class="v-table-body__cell--desc"
			:value="data.value"
			readonly
			rows="2">
		</textarea>
		<template v-else>
			{{data.value | transformDate(data.key)}}
		</template>
	</div>
</template>

<script>
import helper from '@/helpers/index';

export default {
	name: 'Table_Body_Row_Cell',
	inheritAttrs: false,
	props: {
		data: Object
	},
	computed: {
		isStatusCell () {
			return this.data.key === 'status';
		},
		isDescCell () {
			return this.data.key === 'errorDescription';
		},
		getStatusStyle () {
			switch (this.data.value) {
				case 'DONE':
					return 'v-table-body__cell--status-done';
				case 'FAILED':
					return 'v-table-body__cell--status-failed';
				default:
					return 'v-table-body__cell--status-during';
			}
		}
	},
	filters: {
		transformDate (value, key) {
			const transformKeys = ['registerDate', 'date'];
			if (!transformKeys.includes(key)) return value;
			if (!value) return null;

			return helper.util.transformDate(value);
		}
	}
};
</script>

<style>
.v-table-body__cell {
	display: flex;
	align-items: center;
	color: inherit;
	font-size: inherit;
	font-weight: inherit;
	overflow: hidden;
	padding: 0 5px;
	word-break: break-all;
}
.v-table-body__cell--status {
	padding: 2px 0;
	width: 70px;
	color: #fff;
	text-align: center;
}
.v-table-body__cell--status-done {
	background-color: var(--c-blue-5);
}
.v-table-body__cell--status-failed {
	background-color: var(--c-red-5);
}
.v-table-body__cell--status-during {
	background-color: var(--c-yellow-4);
}
.v-table-body__cell--desc {
	width: 100%;
	/* height: 28px; */
	border: 1px solid var(--c-grey-5);
	border-radius: 4px;
}
</style>
