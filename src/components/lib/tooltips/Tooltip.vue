<template>
	<div
		:data-tooltip="content"
		:class="getPlacement"
		class="tooltip">
			<slot></slot>
		</div>
</template>

<script>
export default {
	name: 'Tooltip',
	props: {
		placement: {
			type: String,
			default: 'top'
		},
		content: {
			type: String
		}
	},
	computed: {
		getPlacement () {
			switch (this.placement) {
				case 'top': return 'tooltip--top';
				case 'bottom': return 'tooltip--bottom';
				case 'left': return 'tooltip--left';
				case 'right': return 'tooltip--right';
			}
		}
	}
};
</script>

<style src="./tooltip.css"></style>
