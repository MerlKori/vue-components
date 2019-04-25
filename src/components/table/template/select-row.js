export default {
	data: () => ({
		row: {
			selected: {},
			heightlight: {}
		}
	}),
	methods: {
		selectRow (row) {
			this.row.selected = row;
			this.$emit('select-row', row);
		},
		isSelectedRow (row) {
			if (row.id === undefined) {
				return row.domainId === this.row.selected.domainId;
			}
			return row.id === this.row.selected.id;
		}
	}
};
