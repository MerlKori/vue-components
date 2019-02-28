<template>
	<div class="v-cbx">
		<input
			@change="toggle($event.target.checked)"
			:checked="checked"
			:disabled="disabled"
			:id="id"
			type="checkbox"
			class="v-cbx__input"
			hidden>
		<label
			:for="id"
			class="v-cbx__label">
			<svg
				class="v-cbx__svg"
				width="20px" height="20px"
				viewBox="0 0 20 20">
				<path
					class="v-cbx__svg-path"
					d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
				<polyline
					class="v-cbx__svg-polyline"
					points="4 11 8 15 16 6"></polyline>
			</svg>
		</label>
	</div>
</template>

<script>
export default {
	name: 'Checkbox',
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		/**
       * Model example
       * @model
       */
		checked: {
			type: Boolean,
			default: false
		},
		/**
		* Sets the checkbox disabled state
		* @type Boolean
		*/
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		id: `cbx-${Math.floor(Math.random() * (100000 - 50)) + 5}`
	}),
	methods: {
		toggle (checked) {
			/** Triggered when checkbox is changed
			 * @event change
			 * @type {Boolean}
			*/
			this.$emit('change', checked);
		}
	}
};
</script>

<style>
.v-cbx__label {
	--bd-color: #e0e0e0;
	--path-fill: none;
	--polyline-str-offset: 18px;
	--path-str-offset: 71px;
}
.v-cbx__input:checked + .v-cbx__label {
	--bd-color: #0085FF;
	--path-fill: #0085FF;
	--polyline-str-offset: 0;
	--path-str-offset: 0;
}
.v-cbx__label:hover {
	--path-str-offset: 0;
}
.v-cbx__input:disabled + .v-cbx__label {
	pointer-events: none;
}
/* styles */
.v-cbx__label {
	box-sizing: border-box;
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
.v-cbx__svg {
	position: absolute;
	top: -2px;
	left: -2px;
	cursor: pointer;
	z-index: 2;
}
.v-cbx__svg-path {
	fill: var(--path-fill);
	stroke: var(--c-blue-4);
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-dasharray: 71px;
	stroke-dashoffset: var(--path-str-offset);
	transition: fill .35s, stroke-dashoffset .35s;
}
.v-cbx__svg-polyline {
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
