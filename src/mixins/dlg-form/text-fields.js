/* for DLG.TextField.vue and DLG.TextareaField.vue */
import utils from '@/utils';

export default {
	inheritAttrs: false,
	props: {
		config: Object,
		currentEl: Object
	},
	data: () => ({
		id: utils._getRandomNum(),
		timerName: null
	}),
	computed: {
		value: {
			get () {
				return (!this.currentEl || !this.currentEl[this.config.key]) ? null : this.currentEl[this.config.key];
			},
			set (value) {
				clearTimeout(this.timerName);

				this.timerName = setTimeout(() => {
					this.$emit('setData', [this.config.key, value]);
				}, 150);
			}
		}
	}
};
