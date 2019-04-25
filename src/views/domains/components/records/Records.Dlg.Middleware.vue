<template>
	<TableDlgContent
		ref="dialog"
		@close-dlg="proxyClose"
		@save="proxySave"
		@change-form-data="setActiveRecordType"
		:dlgStyle="$attrs.dlgStyle"
		:type="dlgData.type"
		:data="getDlgData"/>
</template>

<script>
/* store */
import {mapState, mapMutations} from 'vuex';
import {listStoreModules} from '@/store/index';

import TableDlgContent, {LIST_DLG} from '@/components/table/table-dialogs/Table.Dlg.Content.vue';
import {globalTypes} from '@/schemes/scheme-helpers';
import utils from '@/utils';

export default {
	name: 'Record_Dlg_Middelware',
	inheritAttrs: false,
	props: {
		dlgData: Object,
		sharedGroups: Array
	},
	data: () => ({
		activeRecordType: 'A'
	}),
	components: {TableDlgContent},
	methods: {
		...mapMutations(listStoreModules.Notifications.name, {
			showNotification: listStoreModules.Notifications.types.mutations.CREATE_NOTIFICATIONS
		}),

		/* PROXY EVENTS */
		proxyClose () {
			this.$emit('close-dlg');
		},
		proxySave (data) {
			const checkEqualRecords = records => {
				const restoreRecordName = (string, domainName) => {
					const reg = /@/;
					return reg.test(string) ? string.replace(reg, domainName) : string;
				};
				const checkResult = records.find(record => {
					const name = restoreRecordName(data.name, record.name);
					const value = restoreRecordName(data.value, record.value);
					return name === record.name && record.value === value;
				});
				return checkResult;
			};

			if (checkEqualRecords(this.getCheckedSelectedRecords)) {
				this.showNotification({ /* ERROR MESSAGE */
					title: 'Error',
					msg: 'The record already exists!',
					type: 'error'
				});
			} else {
				this.$emit('save', data);
			}
		},

		/* Handler on:change-form-data for set activeRecordType */
		setActiveRecordType (data) {
			if (this.activeRecordType === data.domainRecordTypeName) return;

			this.$refs.dialog.$children[0].resetErrorsByKey('value'); /* reset errors in Form.vue */
			this.$refs.dialog.$children[0].resetErrorsByKey('name'); /* reset errors in Form.vue */
			this.activeRecordType = data.domainRecordTypeName;
		},

		changeValidationRules (type) {
			const copyData = utils._deepCopy(this.dlgData.data);
			const valueIdx = copyData.editMap.findIndex(item => item.key === 'value');
			const nameIdx = copyData.editMap.findIndex(item => item.key === 'name');

			function addRules (...rules) {
				const validationRules = [
					{name: globalTypes.validations.checkLang},
					{name: globalTypes.validations.checkOnEmpty},
					{name: globalTypes.validations.isStrMaxLength}
				];

				rules.forEach(rule => {
					validationRules.push(rule);
				});
				return validationRules;
			}

			const getRules = () => {
				switch (type) {
					case 'A':
						return {
							name: {
								validations: addRules()
							},
							value: {
								validations: addRules({name: globalTypes.validations.isIP}),
								placeholder: 'IPv4 address'
							}
						};
					case 'CNAME':
						return {
							name: {
								validations: addRules({
									name: globalTypes.validations.isNotDomainName,
									options: {selectDomains: this.SELECT_DOMAINS, domainTableMultipleMode: this.MODE_MULTIPLE}
								})
							},
							value: {
								validations: addRules({
									name: globalTypes.validations.isDomainName,
									options: {selectDomains: this.SELECT_DOMAINS, domainTableMultipleMode: this.MODE_MULTIPLE}
								}),
								placeholder: 'Domain name or @'
							}
						};
					case 'NS':
						return {
							name: {
								validations: addRules()
							},
							value: {
								validations: addRules({name: globalTypes.validations.isServerName}),
								placeholder: 'Domain name or @'
							}
						};
					default:
						return { /* Other types */
							name: {
								validations: addRules()
							},
							value: {
								validations: addRules(),
								placeholder: ''
							}
						};
				}
			};

			copyData.editMap[valueIdx].validations = getRules().value.validations;
			copyData.editMap[valueIdx].placeholder = getRules().value.placeholder;
			copyData.editMap[nameIdx].validations = getRules().name.validations;
			return copyData;
		}
	},
	computed: {
		...mapState(listStoreModules.TableDomains.name, {
			SELECT_DOMAINS: state => state[listStoreModules.TableDomains.types.state.SELECT_DOMAINS],
			MODE_MULTIPLE: state => state[listStoreModules.TableDomains.types.state.MODE_MULTIPLE]
		}),
		getDlgData () {
			const processedTypes = [LIST_DLG.create, LIST_DLG.edit];
			if (!processedTypes.includes(this.dlgData.type)) return this.dlgData.data;

			return this.changeValidationRules(this.activeRecordType);
		},
		getCheckedSelectedRecords () {
			/* All selected records */
			const allSelectedRecords = this.SELECT_DOMAINS.reduce((records, domain) => records.concat(domain.recordsInfo), []);

			/* Get for Edit */
			if (this.dlgData.type === LIST_DLG.edit) {
				if (this.SELECT_DOMAINS.length > 1 && this.sharedGroups.length > 0) {
					const currentGroup = this.sharedGroups.find(group => group[0].id === this.dlgData.data.currentEl.id);
					const idMap = !currentGroup ? [] : currentGroup.map(rec => rec.id);
					return allSelectedRecords.filter(record => !idMap.includes(record.id));
				}

				if (this.SELECT_DOMAINS.length >= 1 && this.sharedGroups.length === 0) {
					return allSelectedRecords.filter(record => record.id !== this.dlgData.data.currentEl.id);
				}
			}

			/* get for Create */
			return allSelectedRecords;
		}
	}
};
</script>
