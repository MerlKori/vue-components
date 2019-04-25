/* store */
import {mapMutations} from 'vuex';
import {listStoreModules} from '@/store/index';

export default {
	methods: {
		...mapMutations(listStoreModules.Data.name, {
			setData: listStoreModules.Data.types.mutations.SET_DATA
		}),
		...mapMutations(listStoreModules.Notifications.name, {
			showNotification: listStoreModules.Notifications.types.mutations.CREATE_NOTIFICATIONS
		}),
		sendChanges (action, data = null) {
			this.api[action](data)
				.then(result => {
					if (!result.success) {
						this.showNotification({
							title: 'Error',
							msg: result.messages,
							type: 'error'
						});
						return;
					}
					this.api.getAll()
						.then(response => {
							this.setData({
								entity: this.scheme.entity,
								data: response.result
							});
						});
					this.mixin_hideDlg();
				});
		}
	}
};
