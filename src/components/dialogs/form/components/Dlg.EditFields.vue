<template>
	<DlgFieldWrapp
		:config="$attrs.config"
		:invalidKeys="$attrs.invalidKeys">
		<component
			@setData="proxySetDataEvent"
			:config="$attrs.config"
			:currentEl="$attrs.currentEl"
			:is="getComponents($attrs.config.type)" />
	</DlgFieldWrapp>
</template>

<script>
/* components */
import DlgFieldWrapp from './DLG.FieldWrapp.vue';

import DlgTextField from './fields/DLG.TextField.vue';
import DlgLinkField from './fields/DLG.LinkField.vue';
import DlgSelect from './fields/DLG.Select.vue';
import DlgTeaxtareaField from './fields/DLG.TeaxtareaField.vue';
import DlgDatePicker from './fields/DLG.DatePicker.vue';
import DlgRadioGroup from './fields/DLG.RadioGroup.vue';

export const types = {
	text: 'text',
	textarea: 'textarea',
	select: 'select',
	link: 'link',
	date: 'date',
	radioGroup: 'radio-group'
};

export default {
	name: 'Dialog_RowFields',
	components: {
		DlgFieldWrapp,
		DlgTextField,
		DlgLinkField,
		DlgSelect,
		DlgTeaxtareaField,
		DlgDatePicker,
		DlgRadioGroup
	},
	inheritAttrs: false,
	methods: {
		getComponents (type) {
			switch (type) {
				case types.text: return 'DlgTextField';
				case types.select: return 'DlgSelect';
				case types.link: return 'DlgLinkField';
				case types.date: return 'DlgDatePicker';
				case types.textarea: return 'DlgTeaxtareaField';
				case types.radioGroup: return 'DlgRadioGroup';
				default: return false;
			}
		},
		proxySetDataEvent (data) {
			this.$emit('setData', data);
		}
	}
};
</script>
