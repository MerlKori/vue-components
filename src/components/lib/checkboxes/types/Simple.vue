<template>
	<label
		:for="id"
		:class="getClasses"
		class="cbx-template-simple">
		<svg
			class="cbx-template-simple__svg"
			width="20px" height="20px"
			viewBox="0 0 20 20">
			<path
				class="cbx-template-simple__svg-path"
				d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
			<polyline
				class="cbx-template-simple__svg-polyline"
				points="4 11 8 15 16 6"></polyline>
		</svg>
	</label>
</template>

<script>
export default {
	name: 'Checkbox_Simple',
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
				'cbx-template-simple--active': this.isActive,
				'cbx-template-simple--disable': this.isDisable
			};
		}
	}
};
</script>

<style>
.cbx-template-simple {
	--bd-color: var(--c-grey-4);
	--path-fill: none;
	--polyline-str-offset: 18px;
	--path-str-offset: 71px;
}
.cbx-template-simple--active {
	--bd-color: var(--c-blue-4);
	--path-fill: var(--c-blue-4);
	--polyline-str-offset: 0;
	--path-str-offset: 0;
}
.cbx-template-simple--disable {
	pointer-events: none;
}
.cbx-template-simple:hover {
	--path-str-offset: 0;
}

/* styles */
.cbx-template-simple {
	position: relative;
	display: block;
	width: 20px;
	height: 20px;
	border: 2px solid var(--bd-color);
	border-radius: 3px;
	user-select: none;
	cursor: pointer;
	z-index: 0;
}
.cbx-template-simple__svg {
	position: absolute;
	top: -2px;
	left: -2px;
	cursor: pointer;
	z-index: 2;
}
.cbx-template-simple__svg-path {
	fill: var(--path-fill);
	stroke: var(--c-blue-4);
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-dasharray: 71px;
	stroke-dashoffset: var(--path-str-offset);
	transition: fill .35s, stroke-dashoffset .35s;
}
.cbx-template-simple__svg-polyline {
	fill: none;
	stroke: #fff;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-dasharray: 18px;
	stroke-dashoffset: var(--polyline-str-offset);
	transition: stroke-dashoffset .35s;
}
</style>
