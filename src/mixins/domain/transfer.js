/* store */
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {listStoreModules} from '@/store/index';

import schemes from '@/schemes/index';
import utils from '@/utils';

export default {
	methods: {
		...mapActions(listStoreModules.Data.name, {
			Action_SendDataChanges: listStoreModules.Data.types.actions.SEND_DATA_CHANGES
		}),
		...mapMutations(listStoreModules.Preloader.name, {
			Mutations_SetPreloaderVisibility: listStoreModules.Preloader.types.mutations.SET_VISIBILITY_PRELOADER
		}),

		mixin_addToReconfig (ids, api, entity, tableRef) {
			this.Mutations_SetPreloaderVisibility(true);

			const data = [];
			ids.forEach(id => {
				data.push({
					domainId: id,
					date: Date.now
				});
			});

			this.Action_SendDataChanges({
				api,
				entity,
				action: 'create',
				data
			})
				.then(() => {
					tableRef.taransferItemsToTop(ids);
					this.Mutations_SetPreloaderVisibility(false);
				});
		},
		mixin_removeFromReconfig (ids, api, entity, tableRef, storeData) {
			this.Mutations_SetPreloaderVisibility(true);

			const removeIds = []; /* ids in DnsReconfig and Ids Domains are different */
			storeData.forEach(item => {
				if (ids.includes(item.domainId)) {
					removeIds.push(item.id);
				}
			});

			this.Action_SendDataChanges({
				api,
				entity,
				action: 'remove',
				data: removeIds
			})
				.then(() => {
					tableRef.taransferItemsToBottom(ids);
					this.Mutations_SetPreloaderVisibility(false);
				});
		},
		/*
			mixin_splitDomainsOnGroups
			return object {main, other}
			main - domains in check
			other - all domains without main
		*/
		mixin_splitDomainsOnGroups (dataOnReconfig) {
			const domains = this.Getter_getDomains(schemes.Domains.reconfigMap);
			const dataOnReconfigIds = dataOnReconfig.map(d => d.domainId);
			return utils._splitDataByIds(domains, dataOnReconfigIds);
		}
	},
	computed: {
		...mapGetters(listStoreModules.Data.name, {
			Getter_getDomains: listStoreModules.Data.types.getters.GET_DOMAINS
		})
	}
};
