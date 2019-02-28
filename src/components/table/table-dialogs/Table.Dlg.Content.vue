<template>
	<component
		@send-data-add-content="proxyCallAdditionalContent"
		@close-dlg="proxyClose"
		@apply="proxyApply"
		:data="$attrs.data"
		:linkEvent="$attrs.linkEvent"
		:is="getTemplate"></component>
</template>

<script>
import TmpConfirm from '@/components/dialogs/templates/Confirm.vue';
import TmpForm from '@/components/dialogs/templates/form/Form.vue';


export const LIST_DLG = {
	create: 1,
	edit: 2,
	deactivate: 3
};

export default {
	name: 'Table_Dlg_Content',
	inheritAttrs: false,
	props: {
		type: Number
	},
	components: {
		TmpConfirm,
		TmpForm
	},
	methods: {
		proxyClose () {
			this.$emit('close-dlg');
		},
		proxyApply (data) {
			this.$emit('apply', data);
		},
		proxyCallAdditionalContent (data) {
			this.$emit('send-data-add-content', data);
		}
	},
	computed: {
		getTemplate () {
			switch (this.type) {
				case LIST_DLG.create: return 'TmpForm';
				case LIST_DLG.edit: return 'TmpForm';
				case LIST_DLG.deactivate: return 'TmpConfirm';
				default:
					console.log('type dlg is not definr');
			}
		}
	}
};
</script>
