<template>
<transition name="overlay-fade">
	<!-- @click.self="close"
		@keydown.esc="close" -->
	<div
		v-show="visibility"
		tabindex="-1"
		ref="overlayFocus"
		class="popup__overlay">
		<transition name="content-translate">
			<div
				class="popup__content"
				v-if="visibility">
				<slot></slot>
			</div>
		</transition>
	</div>
</transition>
</template>

<script>
export default {
	name: 'Popup_Wrapper',
	props: {
		visibility: {
			type: Boolean,
			default: false
		}
	},
	updated () {
		/* to catch the event keydown = esc */
		// if (this.visibility) {
		// 	this.$refs.overlayFocus.focus();
		// }
	},
	methods: {
		close () {
			this.$emit('close-popup');
		}
	}
};
</script>

<style>
.popup__overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0, .3);
	outline: none;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
}
.popup__content {
	background-color: #fff;
	padding: 10px;
	border-radius: 4px;
	box-shadow: 0 0 15px rgba(0,0,0, .4);
	z-index: 1005;
	transition: none;
}
.overlay-fade-enter-active,
.overlay-fade-leave-active {
	transition: opacity .3s;
}
.overlay-fade-enter,
.overlay-fade-leave-to {
	opacity: 0;
}
.content-translate-enter-active {transition: transform .3s;}
.content-translate-leave-active {transition: transform .4s;}
.content-translate-enter,
.content-translate-leave-to {
	transform: translate(0, -50%);
}
</style>
