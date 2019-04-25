/* store */
import {mapState, mapMutations} from 'vuex';
import {listStoreModules} from '@/store/index';

/* mixins */
import TableCheckbox from '@/mixins/table/checkboxes';
import TableDialogs from '@/mixins/table/table-dialogs';
import TableActionEdit from '@/mixins/table/actions/edit';
import TableActionCreate from '@/mixins/table/actions/create';
import ReconfigRecords from '@/mixins/domain/reconfig-records';

/* components */
import VueTable from '@/components/table/template/VueTable.vue';
import TableBtns, {BTNS_LIST} from '@/components/table/Table.Btns.vue';
import TableFooterInfo from '@/components/table/footer/Table.Footer.Info.vue';
import RecordsDlgMiddleware from '@/views/domains/components/records/Records.Dlg.Middleware.vue';
import Tooltip from '@/components/lib/tooltips/Tooltip.vue';

/* other */
import api from '@/api/index';
import schemes from '@/schemes/index';
import utils from '@/utils';

export default {
	name: 'Table_Records',
	mixins: [
		TableCheckbox,
		TableDialogs,
		TableActionEdit,
		TableActionCreate,
		ReconfigRecords
	],
	components: {
		VueTable,
		TableBtns,
		TableFooterInfo,
		RecordsDlgMiddleware,
		Tooltip
	},
	data: () => ({
		BTNS_LIST,
		api: api.domainRecords,
		scheme: schemes.DomainsRecords,
		sharedGroups: []
	}),
	methods: {
		...mapMutations(listStoreModules.Data.name, {
			setData: listStoreModules.Data.types.mutations.SET_DATA
		}),
		sharedRecords (records) {
			const exceptionsKeys = ['id', 'externalId', 'domainName', 'domainId'];
			const keys = Object.keys(records);
			const lengts = keys.map(key => records[key].length);

			/* checks */
			if (keys.length === 0) {
				this.sharedGroups = [];
				return [];
			}
			if (keys.length === 1) {
				this.sharedGroups = [];
				return records[keys[0]];
			}
			if (lengts.includes(0)) { /* check empty groups */
				this.sharedGroups = [];
				return [];
			}

			const searchEqualEl = (obj, keysArr) => {
				const firstKey = keysArr.shift();
				let res = [...obj[firstKey]];

				keysArr.forEach(key => {
					const data = obj[key];
					const resCopy = utils._deepCopy(res);
					res = [];

					data.forEach(j => {
						resCopy.forEach(i => {
							if (Array.isArray(i)) {
								if (utils._isEqual(j, i[0], exceptionsKeys)) {
									res.push([...i, j]);
								}
							} else {
								if (utils._isEqual(j, i, exceptionsKeys)) {
									res.push([i, j]);
								}
							}
						});
					});
				});
				return res;
			};

			const getRenderData = data => data.map(el => {
				const key = Object.keys(el)[0];
				const getFirstRecord = obj => obj[key];
				return !key ? el : getFirstRecord(el);
			});

			this.sharedGroups = searchEqualEl(records, keys);
			return getRenderData(this.sharedGroups);
		},

		/* CRUD Records */
		handlerDlgEvent (data) {
			switch (this.dlg.type) {
				case this.dlg.LIST_DLG.create:
					this.createRecords(data);
					break;
				case this.dlg.LIST_DLG.edit:
					this.editRecords(data);
			}
		},
		sendChanges (action, data = null) {
			this.api[action](data)
				.then(result => {
					if (result.success) {
						api.domains.getAll()
							.then(response => {
								this.setData({
									entity: schemes.Domains.entity,
									data: response.result
								});
							});
						this.mixin_hideDlg();
					} else {
						console.log(result.errors[0].message);
					}
				});
		},
		rewriteRecod (recordData, domainName, domainId, recordId = null) {
			const newRecord = Object.assign({}, recordData);
			const restoreDomainName = string => {
				const reg = /@/;
				return reg.test(string) ? string.replace(reg, domainName) : string;
			};
			newRecord.name = restoreDomainName(recordData.name);
			newRecord.value = restoreDomainName(recordData.value);
			newRecord.domainId = domainId;

			if (recordId) {
				newRecord.id = recordId;
			}

			return newRecord;
		},
		createRecords (data) {
			const records = [];
			let item;
			this.SELECT_DOMAINS.forEach(domain => {
				item = this.rewriteRecod(data, domain.name, domain.id);
				records.push(item);
			});
			this.sendChanges('create', records);
		},
		editRecords (data) {
			const records = [];
			let item;
			const getActiveSharedGroup = (record, groups) => groups.find(group => group[0].id === record.id);

			if (this.sharedGroups.length > 0) {
				const group = getActiveSharedGroup(data, this.sharedGroups);
				group.forEach(oldRecord => {
					item = this.rewriteRecod(data, oldRecord.domainName, oldRecord.domainId, oldRecord.id);
					records.push(item);
				});
			} else {
				this.SELECT_DOMAINS.forEach(domain => {
					item = this.rewriteRecod(data, domain.name, domain.id);
					records.push(item);
				});
			}
			this.sendChanges('edit', records);
		}
	},
	computed: {
		...mapState(listStoreModules.Data.name, {
			GLOBAL_DATA: state => state
		}),
		...mapState(listStoreModules.TableDomains.name, {
			SELECT_DOMAINS: state => state[listStoreModules.TableDomains.types.state.SELECT_DOMAINS],
			MODE_MULTIPLE: state => state[listStoreModules.TableDomains.types.state.MODE_MULTIPLE]
		}),
		/* records */
		getInputRecords () { /* get object or array of objects and convert to  template "domainName : [reords]" */
			if (this.SELECT_DOMAINS.length === 0) return [];

			const records = {};
			const addDomainData = (item, domain) => {
				item.domainId = domain.id;
				item.domainName = domain.name;
				return item;
			};
			const replaceDomainName = (record, domainName) => {
				const replaceKeys = ['name', 'value'];
				const _replace = (value, string) => {
					const reg = new RegExp(` *${value}`);
					return reg.test(string) ? string.replace(reg, '@') : string;
				};
				replaceKeys.forEach(key => {
					record[key] = _replace(domainName, record[key]);
				});
			};
			const domainsCopy = utils._deepCopy(this.SELECT_DOMAINS);
			domainsCopy.forEach(domain => {
				domain.recordsInfo.forEach(record => {
					addDomainData(record, domain);
					this.mixin_reconfigRecord(record, this.scheme.reconfigMap, this.GLOBAL_DATA);
					if (this.MODE_MULTIPLE) {
						replaceDomainName(record, domain.name);
					}
				});
				records[domain.name] = domain.recordsInfo;
			});
			return records;
		},
		getTableData () {
			return this.sharedRecords(this.getInputRecords);
		},
		disableCreateBtn () {
			return this.SELECT_DOMAINS.length === 0;
		},
		actionDeleteAllIsDisable () {
			return this.mixin_checkbox.list.length < 2;
		},
		handlerDomainsData () { /* only for watch */
			return this.SELECT_DOMAINS;
		}
	},
	watch: {
		handlerDomainsData () {
			this.mixin_resetCheckboxData();
		}
	}
};
