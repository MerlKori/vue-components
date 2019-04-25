<template>
	<transition name="slide-collapse-item"
		@enter="startTransition"
		@after-enter="endTransition"
		@before-leave="startTransition"
		@after-leave="endTransition">
		<div
			v-show="visibility"
			ref="collapseItem"
			class="collapse-item">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Vue_CollapseItem',
	props: {
		defVisibility: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		visibility: false
	}),
	methods: {
		toggle () {
			this.visibility = !this.visibility;
		},
		setVisibility (visibility) {
			this.visibility = visibility;
		},
		/* transition methods */
		startTransition () {
			const el = this.$refs.collapseItem;
			el.style.height = `${el.scrollHeight}px`;
		},
		endTransition () {
			const el = this.$refs.collapseItem;
			el.style.height = '';
		}
	},
	watch: {
		defVisibility: {
			handler () {
				this.setVisibility(this.defVisibility);
			},
			immediate: true
		}
	}
};
</script>

<style>
.collapse-item {
	overflow: hidden;
}
.slide-collapse-item-enter-active,
.slide-collapse-item-leave-active {
	will-change: height;
	transition: height .3s ease;
}
.slide-collapse-item-enter,
.slide-collapse-item-leave-to {
	height: 0 !important;
}
</style>
