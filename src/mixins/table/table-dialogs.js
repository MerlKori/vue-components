/* store */
import {mapMutations} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import TableDlgWrapper from '@/components/table/table-dialogs/Table.Dlg.Wrapp.vue';
import TableDlgContent, {LIST_DLG} from '@/components/table/table-dialogs/Table.Dlg.Content.vue';

const checkSameName = (listElements, formData) => (listElements.find(element => element.name === formData.name && element.id !== formData.id));

export default {
	components: {
		TableDlgWrapper,
		TableDlgContent
	},
	data: () => ({
		dlg: {
			LIST_DLG,
			visibility: false,
			type: null,
			data: null, /* title, subtitle, editMap, entity, element */
			eventsCallbacks: {} /* [dlg type] : [list] */
		}
	}),
	methods: {
		...mapMutations(listStoreModules.Notifications.name, {
			showNotification: listStoreModules.Notifications.types.mutations.CREATE_NOTIFICATIONS
		}),
		mixin_showDlg (type, dlgData) {
			this.dlg.visibility = true;
			this.dlg.type = type;
			this.dlg.data = dlgData;
		},
		mixin_hideDlg () {
			this.dlg.visibility = false;

			/* hide Additional Content */
			if (this.additionalContent) {
				this.hideAdditionalContent();
			}
		},
		mixin_subscribeOnDlgEvents (dlgType, callback) {
			if (!this.dlg.eventsCallbacks[dlgType]) {
				this.dlg.eventsCallbacks[dlgType] = [];
			}
			this.dlg.eventsCallbacks[dlgType].push(callback);
		},
		mixin_handlerDlgEvent (dlgData, tableItems) {
			const checkTypes = [LIST_DLG.create, LIST_DLG.edit];

			if (checkTypes.includes(this.dlg.type) && checkSameName(tableItems, dlgData)) {
				this.showNotification({
					title: 'Error',
					msg: 'The record already exists!',
					type: 'error'
				});
				return;
			}

			this.dlg.eventsCallbacks[this.dlg.type].forEach(callback => {
				callback(dlgData);
			});
		}
	}
};
