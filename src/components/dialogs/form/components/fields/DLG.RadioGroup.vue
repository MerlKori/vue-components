<template>
	<VueRadioGroup
		v-model="radio"
		:title="config.title"
		:fieldsList="getList" />
</template>

<script>
/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import VueRadioGroup from '@/components/VueRadioGroup.vue';

export default {
	name: 'DLG_RadioGroup',
	components: {VueRadioGroup},
	props: {
		config: Object,
		currentEl: Object
	},
	methods: {
		setData (data) {
			const sendData = params => this.$emit('setData', params);
			sendData([this.config.keys.edit, data.value]);
			sendData([this.config.keys.render, data.label]);
		}
	},
	computed: {
		...mapState(listStoreModules.Data.name, {
			globalData: state => state
		}),
		getList () {
			const list = [];
			const keyValue = this.config.serviceKeys.findByKey;
			const keyLabel = this.config.serviceKeys.getByKey;
			this.globalData[this.config.serviceKeys.entity].forEach(item => {
				list.push({value: item[keyValue], label: item[keyLabel]});
			});
			return list;
		},
		getDefaultValue () {
			if (!this.currentEl || !this.currentEl[this.config.keys.render]) {
				const data = {
					value: !this.getList[0] ? null : this.getList[0].value,
					label: !this.getList[0] ? null : this.getList[0].label
				};
				this.setData(data);
				return data;
			}
			return {value: this.currentEl[this.config.keys.edit]};
		},
		radio: {
			get () {
				return this.getDefaultValue;
			},
			set (data) {
				this.setData(data);
			}
		}
	}
};
</script>
