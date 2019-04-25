export default {
	methods: {
		mixin_showDlgCreate () {
			const type = this.dlg.LIST_DLG.create; /* this.dlg.LIST_DLG - mixin table-dialogs */
			const data = {
				editMap: this.scheme.editMap
			};
			this.mixin_showDlg(type, data);
		},
		mixin_create (element) {
			const el = Object.assign({}, element);
			el.active = 1; /* 1 - key true */
			this.sendChanges('create', el);
		}
	}
};
