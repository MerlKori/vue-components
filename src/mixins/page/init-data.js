import {mapActions} from 'vuex';
import {listStoreModules} from '@/store/index';

export default {
	data: () => ({
		loadingProcess: false /* for table loader */
	}),
	created () {
		this.initData();
	},
	methods: {
		...mapActions(listStoreModules.Data.name, {
			downloadData: listStoreModules.Data.types.actions.DOWNLOAD_DATA
		}),
		setModeLoading (value) {
			this.loadingProcess = value;
		},
		initData () {
			this.setModeLoading(true); /* show table loader */
			this.downloadData({api: this.api, entity: this.scheme.entity})
				.then(() => {
					this.setModeLoading(false); /* hide table loader */
				})
				.catch(err => {
					this.setModeLoading(false);
					console.log(err);
				});
			/* load additional data */
			if (!this.additionalData) return;
			this.additionalData.forEach(i => {
				this.downloadData({api: i.api, entity: i.entity});
			});
		}
	}
};
