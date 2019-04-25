<template>
	<textarea
		v-model="value"
		autocomplete="off"
		:placeholder="config.placeholder"
		:focus-id="id"
		rows="2">
	</textarea>
</template>

<script>
import FormTextFields from '@/mixins/dlg-form/text-fields';

export default {
	name: 'DLG_TextareaField',
	mixins: [FormTextFields]
};
</script>
