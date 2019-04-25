<template>
	<div
		:class="{'v-table-body__cell-date--disable' : !value}"
		class="v-table-body__cell-date">
		<span class="v-table-body__cell-date-icon icon-calendar"></span>
		<span>{{transformDateToString(value)}}</span>
	</div>
</template>

<script>
import utils from '@/utils';

export const dateFormats = {
	date: 'date',
	dateTime: 'dateTime'
};

export default {
	name: 'Cell_Date',
	inheritAttrs: false,
	props: {
		value: Number,
		dateFormat: {
			type: String,
			default: 'date'
		}
	},
	methods: {
		transformDateToString (ms) {
			if (ms === null) return ms;
			switch (this.dateFormat) {
				case dateFormats.date: return utils._toDate(ms);
				case dateFormats.dateTime: return utils._toDateTime(ms);
			}
		}
	}
};
</script>

<style>
.v-table-body__cell-date{
	display: flex;
	align-items: center;
}
.v-table-body__cell-date-icon {
	margin: 0 10px 0 5px;
	color: var(--c-green-3);
}
.v-table-body__cell-date--disable .v-table-body__cell-date-icon {
	color: var(--c-grey-3);
}
</style>
