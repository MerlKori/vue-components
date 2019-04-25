import VueCheckbox from '@/components/VueCheckbox.vue';
import TableBodyCheckbox from '@/components/table/body/Table.Body.Row.Checkbox.vue';

export default {
	components: {
		VueCheckbox,
		TableBodyCheckbox
	},
	data: () => ({
		mixin_checkbox: {
			selectedAll: false,
			list: []
		}
	}),
	methods: {
		mixin_select (id) {
			this.mixin_checkbox.list.push(id);
		},
		mixin_deselect (id) {
			const idx = this.mixin_checkbox.list.indexOf(id);
			this.mixin_checkbox.list.splice(idx, 1);
			this.mixin_checkbox.selectedAll = false;
		},
		mixin_isChecked (id) {
			return this.mixin_checkbox.list.includes(id);
		},
		mixin_resetCheckboxData () {
			this.mixin_checkbox.selectedAll = false;
			this.mixin_checkbox.list = [];
		}
	},
	computed: {
		mixin_toggleAllCeckboxes: {
			get () {
				return this.mixin_checkbox.selectedAll;
			},
			set (checked) {
				this.mixin_checkbox.selectedAll = checked;
				this.mixin_checkbox.list = checked ? this.getTableData.map(el => el.id) : [];
			}
		},
		mixin_checkboxIsDisable () {
			return this.getTableData.length === 0;
		}
	}
};
