export default {
	data: () => ({
		sorting: {
			data: {
				key: null,
				direction: null
			},
			count: 0
		}
	}),
	methods: {
		setSortingData (data) {
			this.sorting.count = this.sorting.data.key === data.key ? this.sorting.count + 1 : 0;

			if (this.sorting.count === 2) {
				this.sorting.count = 0;
				this.sorting.data = {key: null, direction: null};
			} else {
				this.sorting.data = data;
			}
		},
		sortingData (data) {
			const sortingKey = this.sorting.data.key;
			const direction = this.sorting.data.direction;

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
