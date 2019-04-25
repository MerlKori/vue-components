/* store */
import {mapMutations, mapActions} from 'vuex';
import {listStoreModules} from '@/store/index';

import DlgEditFields from './components/Dlg.EditFields.vue';
import validation from './validation';

export default {
	name: 'DLG_Form',
	components: {
		DlgEditFields
	},
	inheritAttrs: false,
	props: {
		data: {
			type: Object,
			default: () => ({
				editMap: [],
				currentEl: {}
			})
		},
		dlgStyle: Object
	},
	data: () => ({
		invalidKeys: [],
		formData: {},
		editFields: [],
		mandatoryFields: []
	}),
	created () {
		this.setMandatoryFields(this.data.editMap);
		this.fillFormData(this.data.currentEl, this.data.editMap);
	},
	methods: {
		...mapMutations(listStoreModules.DlgFocusFields.name, {
			setFocusFieldId: listStoreModules.DlgFocusFields.types.mutations.SET_FOCUS_FIELD_ID
		}),
		...mapActions(listStoreModules.DlgAddContent.name, {
			hideAddContent: listStoreModules.DlgAddContent.types.actions.HIDE_ADD_CONTENT
		}),

		/* INIT DATA METHODS */
		fillFormData (currentEl, editMap) {
			const setVal = key => {
				const value = !currentEl ? null : currentEl[key]; /* null while creating */
				this.$set(this.formData, key, value);
			};
			editMap.forEach(el => {
				if ('key' in el) {
					setVal(el.key);
				} else if ('keys' in el) {
					for (const k in el.keys) {
						setVal(el.keys[k]);
					}
				}
			});
		},
		/* fills in the keys of the mandatory fields */
		setMandatoryFields (editMap) {
			const list = [];
			editMap.forEach(config => {
				if (!config.mandatory) return;
				const key = (!config.keys) ? config.key : config.keys.render;
				list.push(key);
			});
			this.mandatoryFields = list;
		},

		/* HANDLER */
		setDataOnKey (data) {
			const key = data[0];
			const value = data[1];

			this.formData[key] = value;

			/* checks */
			this.valueCheck(key, value);
		},

		/* VALIDATION */
		valueCheck (key, value) {
			const config = this.getEditFields.find(el => {
				if (!el.key) return el.keys.render === key || el.keys.edit === key;
				return el.key === key;
			});

			if (!config) return;
			let options;
			config.validations.forEach(check => {
				options = !check.options ? null : check.options;
				validation[check.name](this.invalidKeys, key, value, options);
			});
		},
		resetErrorsByKey (key) { /* for externally call !!! */
			this.invalidKeys = this.invalidKeys.filter(error => error.key !== key);
		},
		runCheckFormData () {
			for (const key in this.formData) {
				if (this.formData[key]) {
					this.valueCheck(key, this.formData[key]);
				}
			}
		},

		/* PROXY EVENT METHODS */
		proxySaveEvent () {
			/* check empty */
			this.mandatoryFields.forEach(key => {
				validation.checkOnEmpty(this.invalidKeys, key, this.formData[key]);
			});
			if (this.invalidKeys.length > 0) return;

			/* Send */
			this.$emit('save', this.formData);
		},
		proxyCloseEvent () {
			this.$emit('close-dlg');
			this.hideAddContent();
		},

		/* Focus for fields */
		setFocus (event) {
			const focusId = event.target.getAttribute('focus-id');
			this.setFocusFieldId(focusId);
		}
	},
	computed: {
		disableSave () {
			return this.invalidKeys.length > 0;
		},
		getEditFields () {
			return this.data.editMap.filter(el => el.userEdit);
		}
	},
	watch: {
		formData: { /* for to change the validation depending on the data entered */
			handler () {
				this.$emit('change-form-data', this.formData);
			},
			deep: true
		},
		getEditFields () {
			this.runCheckFormData();
		}
	}
};
