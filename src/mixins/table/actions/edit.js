export default {
	methods: {
		mixin_showDlgEdit (element) {
			const type = this.dlg.LIST_DLG.edit; /* this.dlg.LIST_DLG - mixin table-dialogs */
			const data = {
				currentEl: element,
				editMap: this.scheme.editMap
			};
			this.mixin_showDlg(type, data);
		},
		mixin_edit (element) {
			const el = Object.assign({}, element);
			el.active = 1; /* 1 - key true */
			this.sendChanges('edit', el);
		}
	}
};
