<template>
	<div id="app">
		<TheSidebar />
		<main>
			<router-view/>
		</main>
		<ThePreloader />
		<TheNotificationsList />
	</div>
</template>

<script>
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import ThePreloader from '@/components/ThePreloader.vue';
import TheNotificationsList from '@/components/notifications/TheNotificationsList.vue';

export default {
	name: 'App',
	components: {
		TheSidebar,
		ThePreloader,
		TheNotificationsList
	}
};
</script>

<style src="./assets/styles/index.css"></style>
