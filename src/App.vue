<template>
	<div id="app">
		<Checkbox />
	</div>
</template>

<script>
import Checkbox from '@/components/checkbox/Checkbox.vue';

export default {
	name: 'app',
	components: {Checkbox}
};
</script>

<style>
@import "assets/style/index.css";
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
