<template>
	<transition name="preloader">
		<div v-show="visibility" class="preloader-overlay">
			<div class="preloader__container">
				<div class="preloader__item preloader__item--1"></div>
				<div class="preloader__item preloader__item--2"></div>
				<div class="preloader__item preloader__item--3"></div>
				<div class="preloader__item preloader__item--4"></div>
				<div class="preloader__item preloader__item--5"></div>
			</div>
		</div>
	</transition>
</template>

<script>
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

export default {
	name: 'ThePreloader',
	computed: {
		...mapState(listStoreModules.Preloader.name, {
			visibility: state => state[listStoreModules.Preloader.types.state.PRELOADER_VISIBILITY]
		})
	}
};
</script>

<style>
.preloader-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0, .6);
	z-index: 1000;
}
.preloader__container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.preloader__item {
	background-color: #5887FF;;
	height: 100%;
	width: 20px;
	margin: 0 2px;
	display: inline-block;
	animation: wave 1.2s infinite ease-in-out;
}
.preloader__item--1 {
	animation-delay: -1.2s;
}
.preloader__item--2 {
	animation-delay: -1.1s;
}
.preloader__item--3 {
	animation-delay: -1s;
}
.preloader__item--4 {
	animation-delay: -0.9s;
}
.preloader__item--5 {
	animation-delay: -0.8s;
}
@keyframes wave {
	0%, 40%, 100% {
		transform: scaleY(0.5);
	}
	20% {
		transform: scaleY(1);
	}
}

.preloader-leave-active,
.preloader-enter-active {
	transition: .5s;
	opacity: 1;
}
.preloader-enter,
.preloader-leave-to {
	opacity: 0;
}
</style>
