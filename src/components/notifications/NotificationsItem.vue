<template>
	<div class="notification">
		<span
			:class="getClasses"
			class="notification__icon"></span>

		<h6 class="notification__title">{{data.title}}</h6>
		<p class="notification__msg">{{data.msg}}</p>

		<button
			@click="close"
			class="notification__btn-close icon-close-2"></button>
	</div>
</template>

<script>
/* store */
import {mapMutations} from 'vuex';
import {listStoreModules} from '@/store/index';

export default {
	name: 'Notifications_Item',
	props: {
		data: {
			type: Object
		}
	},
	data: () => ({
		timerName: null
	}),
	created () {
		this.timerName = setTimeout(() => {
			this.removeNotification(this.data.id);
		}, 6000);
	},
	methods: {
		...mapMutations(listStoreModules.Notifications.name, {
			removeNotification: listStoreModules.Notifications.types.mutations.REMOVE_NOTIFICATIONS
		}),
		close () {
			this.removeNotification(this.data.id);
			clearTimeout(this.timerName);
		}
	},
	computed: {
		getClasses () {
			switch (this.data.type) {
				case 'success': return ['icon-check-2', 'notification_icon--succes'];
				case 'error': return ['icon-error-1', 'notification_icon--error'];
				case 'warning': return ['icon-error-2', 'notification_icon--warning'];
				case 'info': return ['icon-info', 'notification_icon--info'];
				default: return null;
			}
		}
	}
};
</script>

<style>
.notification {
	position: relative;
	width: 300px;
	padding: 5px 25px 5px 35px;
	margin: 10px 5px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: -5px 5px 5px 0 rgba(0, 0, 0, .12);
	transition: all 1s;
}

.notification__icon {
	position: absolute;
	left: 7px;
	top: 6px;
	font-size: 22px;
}
.notification_icon--succes {
	color: var(--c-green-5);
}
.notification_icon--error {
	color: var(--c-red-6);
}
.notification_icon--warning {
	color: var(--c-yellow-5);
	font-size: 20px;
}
.notification_icon--info {
	color: var(--c-grey-6);
}


.notification__title {
	margin-bottom: 5px;
	font-size: 15px;
	font-weight: bold;
	color: #303133;
}
.notification__msg {
	font-size: 13px;
	color: #606266;
}

.notification__btn-close {
	position: absolute;
	top: 5px;
	right: 5px;
	font-size: 16px;
	border-radius: 50%;
	background-color: transparent;
	color: var(--c-grey-5);
	transition: color .25s;
}
.notification__btn-close:hover {
	color: var(--c-grey-6);
}
</style>
