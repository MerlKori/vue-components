export default {
	data: () => ({
		mixin_sorting: {
			data: {
				key: null,
				direction: null
			},
			count: 0
		}
	}),
	methods: {
		mixin_setSortingData (data) {
			this.mixin_sorting.count = this.mixin_sorting.data.key === data.key ? this.mixin_sorting.count + 1 : 0;

			if (this.mixin_sorting.count === 2) {
				this.mixin_sorting.count = 0;
				this.mixin_sorting.data = {key: null, direction: null};
			} else {
				this.mixin_sorting.data = data;
			}
		},
		mixin_sortingData (data) {
			const sortingKey = this.mixin_sorting.data.key;
			const direction = this.mixin_sorting.data.direction;

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
	}
};
