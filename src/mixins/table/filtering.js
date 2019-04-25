/*
	isNotEmptyFilter - check value on emty or null
	filter is object, {type, value} or {type, start, end}
*/
const isNotEmptyFilter = filter => {
	const checks = {
		text () {
			if (filter.value === null) return false;
			return String(filter.value).trim().length > 0;
		},
		select () {
			return filter.value !== null;
		},
		date () {
			return filter.start || filter.end;
		}
	};
	return checks[filter.type]();
};

/* strToLowerCase - just a short record of converting string to lowercase */
const strToLowerCase = string => String(string).toLowerCase();

/* compareValues check type and depending on result, compares */
const compareValues = (itemValue, filterData) => {
	const compares = {
		/* in type text isn`t strict comparison */
		text () {
			return !itemValue ? false : strToLowerCase(itemValue).includes(strToLowerCase(filterData.value));
		},
		date () {
			const period = filterData;
			const date = itemValue;
			if (period.start && period.end) { /* for start and end */
				return date >= period.start && date <= period.end;
			}
			if (period.start && !period.end) { /* only start */
				return date >= period.start;
			}
			if (!period.start && period.end) { /* only end */
				return date <= period.end;
			}
		},
		/* in type select is strict comparison */
		select () {
			return !itemValue ? false : strToLowerCase(itemValue) === strToLowerCase(filterData.value);
		}
	};

	return compares[filterData.type]();
};

const isSimilar = (item_1, item_2, checkKeys) => checkKeys.every(key => compareValues(item_1[key], item_2[key]));


export default {
	data: () => ({
		mixin_filterData: {},
		mixin_filtersAreEmpty: true /* for btn clear filter */
	}),
	methods: {
		mixin_setFilterData (filter) {
			this.$set(this.mixin_filterData, filter.key, filter.filterData);
			this.$emit('reset-cbx');
			this.resetPaginationData();
		},
		mixin_clearFilters () {
			this.mixin_filterData = {};
		},
		mixin_getFilteredData (data) {
			const activeFilterKeys = Object.keys(this.mixin_filterData).filter(key => isNotEmptyFilter(this.mixin_filterData[key])); /* check keys */
			this.mixin_filtersAreEmpty = activeFilterKeys.length === 0; /* for brn clear filter */
			if (this.mixin_filtersAreEmpty) return data;

			return data.filter(dataItem => isSimilar(dataItem, this.mixin_filterData, activeFilterKeys));
		}
	}
};
