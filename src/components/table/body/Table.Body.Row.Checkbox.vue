<template>
	<Checkbox v-model="toggleCheckbox" />
</template>

<script>
import Checkbox from '@/components/checkbox/Checkbox.vue';

export default {
	name: 'Table_Body_Row_Checkbox',
	components: {Checkbox},
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
