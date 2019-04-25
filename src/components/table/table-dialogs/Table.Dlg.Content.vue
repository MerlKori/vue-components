<template>
	<component
		@close-dlg="proxyClose"
		@change-form-data="proxyChangeFormData"
		@save="proxySave"
		:data="$attrs.data"
		:dlgStyle="$attrs.dlgStyle"
		:is="getDlg"></component>
</template>

<script>
import DlgConfirm from '@/components/dialogs/Confirm.vue';
import DlgForm from '@/components/dialogs/form/Form.vue';


export const LIST_DLG = {
	create: 'create',
	edit: 'edit',
	deactivate: 'deactivate',
	delete: 'delete',
	deleteAll: 'deleteAll'
};

export default {
	name: 'Table_Dlg_Content',
	inheritAttrs: false,
	props: {
		type: String
	},
	components: {
		DlgConfirm,
		DlgForm
	},
	methods: {
		proxyClose () {
			this.$emit('close-dlg');
		},
		proxySave (data) {
			this.$emit('save', data);
		},
		proxyChangeFormData (data) {
			this.$emit('change-form-data', data);
		}
	},
	computed: {
		getDlg () {
			switch (this.type) {
				case LIST_DLG.create: return 'DlgForm';
				case LIST_DLG.edit: return 'DlgForm';
				case LIST_DLG.deactivate: return 'DlgConfirm';
				case LIST_DLG.delete: return 'DlgConfirm';
				case LIST_DLG.deleteAll: return 'DlgConfirm';
			}
		}
	}
};
</script>
