<template>
	<VueSelect
		v-model="select"
		:options="getOptions"
		:focusId="focusFieldId"
		:editable="isEditable"
		:placeholder="config.placeholder" />
</template>

<script>
/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import VueSelect from '@/components/VueSelect.vue';

const mode = {
	single: 1, /* 'key' */
	multiple: 2 /* 'keys' */
};

export default {
	name: 'DLG_Select',
	components: {VueSelect},
	props: {
		config: Object,
		currentEl: Object
	},
	data: () => ({
		activeMode: null
	}),
	created () {
		this.defineMode();
	},
	methods: {
		defineMode () {
			this.activeMode = Object.prototype.hasOwnProperty.call(this.config, 'keys') ? mode.multiple : mode.single;
		},
		setData (data) {
			const sendData = (key, value) => {
				this.$emit('setData', [key, value]);
			};

			/* single */
			if (this.activeMode === mode.single) {
				sendData(this.config.key, data.value);
				return;
			}

			/* multiple */
			sendData(this.config.keys.edit, data.value);
			sendData(this.config.keys.render, data.label);
		}
	},
	computed: {
		...mapState(listStoreModules.Data.name, {
			globalData: state => state
		}),
		...mapState(listStoreModules.DlgFocusFields.name, {
			focusFieldId: listStoreModules.DlgFocusFields.types.state.FOCUS_FIELD_ID
		}),
		select: {
			get () {
				return this.getDefVal;
			},
			set (data) {
				this.setData(data);
			}
		},
		getDefVal () {
			const template = {value: null, label: null};
			if (!this.currentEl) return template;

			if (this.activeMode === mode.single) {
				template.label = this.currentEl[this.config.key];
				template.value = this.currentEl[this.config.key];
			} else {
				template.label = this.currentEl[this.config.keys.render];
				template.value = this.currentEl[this.config.keys.edit];
			}
			return template;
		},
		getOptions () {
			const generateOption = data => {
				/* single */
				if (this.activeMode === mode.single) return {value: data, label: data};

				/* multiple */
				return {value: data[this.config.serviceKeys.findByKey], label: data[this.config.serviceKeys.getByKey]};
			};

			return this.globalData[this.config.serviceKeys.entity].map(item => generateOption(item));
		},
		isEditable () {
			return Object.prototype.hasOwnProperty.call(this.config, 'editableSelection');
		}
	}
};
</script>
