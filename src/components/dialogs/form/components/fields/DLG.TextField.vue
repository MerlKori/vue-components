<template>
	<input
		v-model="value"
		:focus-id="id"
		:placeholder="config.placeholder"
		type="text"
		autocomplete="off" />
</template>

<script>
import FormTextFields from '@/mixins/dlg-form/text-fields';

export default {
	name: 'DLG_TextField',
	mixins: [FormTextFields]
};
</script>
