<template>
	<label
		:for="id"
		:class="getClasses"
		class="cbx-template-toggle">
		<div class="cbx-template-toggle__pseudo">
			<span class="cbx-template-toggle__pseudo-slider"></span>
		</div>
	</label>
</template>

<script>
export default {
	name: 'Checkbox_Toggle',
	inheritAttrs: false,
	props: {
		id: String,
		isActive: {
			type: Boolean,
			default: false
		},
		isDisable: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getClasses () {
			return {
				'cbx-template-toggle--active': this.isActive,
				'cbx-template-toggle--disable': this.isDisable
			};
		}
	}
};
</script>

<style>
.cbx-template-toggle {
	--body-cl: #B6B6B6;
	--slider-cl: #EAEAEA;
	--slider-transformX: 0;
	--slider-shadow: 0 3px 8px rgba(154,153,153, .6);
	--sl-before-scale: 0;
	--sl-before-opacity: 1;
	--sl-before-transition: none;
}
.cbx-template-toggle--active {
	--body-cl: rgba(91,214,114, .6);
	--slider-cl: rgba(91,214,114, 1);
	--slider-transformX: 20px;
	--slider-shadow: 0 3px 8px rgba(91,214,114,.2);
	--sl-before-scale: 1;
	--sl-before-opacity: 0;
	--sl-before-transition: all .4s ease;
}
.cbx-template-toggle--disable {
	pointer-events: none;
}

.cbx-template-toggle {
	display: flex;
	align-items: center;
	margin: 5px 0;
}

.cbx-template-toggle__pseudo {
	position: relative;
	display: block;
	width: 34px;
	height: 14px;
	background: var(--body-cl);
	border-radius: 8px;
	cursor: pointer;
	transition: background-color .2s ease;
}
.cbx-template-toggle__pseudo-slider {
	position: absolute;
	top: -25%;
	left: 0;
	width: 20px;
	height: 20px;
	display: block;
	background: var(--slider-cl);
	border-radius: 10px;
	box-shadow: var(--slider-shadow);
	transform: translateX(var(--slider-transformX));
	transition: all .2s ease;
}
.cbx-template-toggle__pseudo-slider::before {
	content: "";
	position: absolute;
	display: block;
	margin: -18px;
	width: 56px;
	height: 56px;
	background: rgba(91,214,114, .5);
	border-radius: 50%;
	transform: scale(var(--sl-before-scale));
	opacity: var(--sl-before-opacity);
	transition: var(--sl-before-transition);
	pointer-events: none;
}
</style>
