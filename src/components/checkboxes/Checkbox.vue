<template>
	<div class="cbx-wrapp">
		<input
			@change="toggle($event.target.checked)"
			:checked="checked"
			:disabled="disabled"
			:id="id"
			type="checkbox"
			class="cbx__input"
			hidden>
		<component
			:is="isType"
			:id="id"
			:isActive="checked"
			:isDisable="disabled" />
	</div>
</template>

<script>
/* Components */
import Simple from '@/components/checkboxes/types/Simple.vue';
import Switcher from '@/components/checkboxes/types/Switcher.vue';
import Toggle from '@/components/checkboxes/types/Toggle.vue';

export const checkboxTypes = {
	switch: 1,
	toggle: 2,
	default: 3
};

export default {
	name: 'Checkbox',
	model: {
		prop: 'checked',
		event: 'change'
	},
	components: {
		Simple,
		Switcher,
		Toggle
	},
	props: {
		type: {
			type: Number,
			default: checkboxTypes.default
		},
		checked: {
			type: Boolean,
			default: false
		},
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
			this.$emit('change', checked);
		}
	},
	computed: {
		isType () {
			switch (this.type) {
				case checkboxTypes.default: return 'Simple';
				case checkboxTypes.toggle: return 'Toggle';
				case checkboxTypes.switch: return 'Switcher';
			}
		}
	}
};
</script>

<style>
.cbx-wrapp {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--row-bg); /* for table */
	border-bottom: var(--row-bd-bottom); /* for table */
}
</style>
