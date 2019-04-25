<template>
	<transition-group
		tag="div"
		name="notifications"
		class="notifications-list">
		<NotificationsItem
			v-for="(notification) in notificationsList"
			:key="notification.id"
			:data="notification"/>
	</transition-group>
</template>

<script>
/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';


import NotificationsItem from './NotificationsItem.vue';

export default {
	name: 'TheNotifications_List',
	components: {NotificationsItem},
	computed: {
		...mapState(listStoreModules.Notifications.name, {
			notificationsList: state => state[listStoreModules.Notifications.types.state.NOTIFICATIONS_LIST]
		})
	}
};
</script>

<style>
.notifications-list {
	position: fixed;
	top: 0;
	right: 25px;
	width: 300px;
	z-index: 1010;
}
/* transition */
.notifications-enter-active {
	transition: transform .35s;
}
.notifications-leave-active {
	transition: all .35s;
	position: absolute;
}
.notifications-enter {
	transform: translateX(100%);
}
.notifications-leave-to {
	transform: translateY(-100vh);
}
.notifications-move {
	transition: all 0.5s;
}
</style>
