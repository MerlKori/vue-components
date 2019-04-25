<template>
	<VueCheckbox v-model="toggleCheckbox" />
</template>

<script>
import VueCheckbox from '@/components/VueCheckbox.vue';

export default {
	name: 'Table_Body_Row_Checkbox',
	components: {VueCheckbox},
	inheritAttrs: false,
	props: {
		checked: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		toggleCheckbox: {
			get () {
				return this.checked;
			},
			set (data) {
				if (data) {
					this.$emit('select');
				} else {
					this.$emit('deselect');
				}
			}
		}
	}
};
</script>
