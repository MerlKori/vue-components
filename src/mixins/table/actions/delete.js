export default {
	methods: {
		mixin_showDlgDelete (objElement) {
			const type = this.dlg.LIST_DLG.delete; /* this.dlg.LIST_DLG - mixin table-dialogs */
			const data = {
				title: 'Delete this element?',
				subtitle: `Are you sure want to delete ${objElement.name} ?`,
				element: objElement /* for mixin_delete */
			};
			this.mixin_showDlg(type, data);
		},
		mixin_delete () {
			this.sendChanges('remove', this.dlg.data.element.id);
		}
	}
};
