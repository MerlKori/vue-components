export default {
	methods: {
		mixin_showDlgDeleteAll (arrElements) {
			const type = this.dlg.LIST_DLG.deleteAll; /* this.dlg.LIST_DLG - mixin table-dialogs */
			const data = {
				title: 'Delete these elements?',
				subtitle: 'Are you sure want to delete these elements?',
				elementsList: arrElements /* for mixin_delete */
			};
			this.mixin_showDlg(type, data);
		},
		mixin_deleteAll () {
			const removeIds = this.dlg.data.elementsList.map(item => item.id);
			this.sendChanges('remove', removeIds);
		}
	}
};
