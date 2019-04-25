<template>
	<div>
		<!-- <TableWrapper>
			sdgfdzsgfdzg
			<ControlPanel @clear-filter="showNotification({title: 'Success',
						msg: 'Item restored',
						type: 'success'})" />
			<button
		@click="showNotification({title: 'Success',
						msg: 'Item restored',
						type: 'success'})"
		>success</button>
		<button
		@click="showNotification({title: 'Success',
						msg: 'Item restored',
						type: 'error'})"
		>error</button>
		<button
		@click="showNotification({title: 'Success',
						msg: 'Item restored',
						type: 'warning'})"
		>warning</button>
		<button
		@click="showNotification({title: 'Success',
						msg: 'Item restored',
						type: 'info'})"
		>info</button>
		sdgfdzsgfdzg
		</TableWrapper> -->
		<!-- <div>{{`current page is ${page}`}}</div>
		<Pagination
			v-model="page"
			:pagesList="[1, 2, 3, 4]" /> -->

	</div>
</template>

<script>
/* store */
import {mapMutations} from 'vuex';
import {listStoreModules} from '@/store/index';

// import TableWrapper from '@/components/table/Table.Wrapper.vue';
// import ControlPanel from '@/components/table/Table.ControlPanel.vue';
// import Pagination from '@/components/table/pagination/Pagination.vue';

export default {
	name: 'TestPage',
	// components: {TableWrapper, ControlPanel},
	data: () => ({
		page: 1
	}),
	methods: {
		...mapMutations(listStoreModules.Notifications.name, {
			showNotification: listStoreModules.Notifications.types.mutations.CREATE_NOTIFICATIONS
		})
	}
};
</script>

<style>

</style>
