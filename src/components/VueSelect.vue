<template>
	<VuePickerWrapp
		v-model="selectValue"
		ref="selectPciker"
		:mode="mode.select"
		:focusId="$attrs.focusId"
		:direction="$attrs.direction"
		:editable="$attrs.editable"
		:fixedBody="$attrs.fixedBody"
		:hideBodyEvent="$attrs.scrollEvent"
		:placeholder="$attrs.placeholder">
		<ul class="v-select__list">
			<li
				v-for="(option, idx) in options"
				:key="idx"
				@click.stop="select(option)"
				:class="isSelect(option)"
				class="v-select__list-item"
			>
				{{option.label}}
			</li>
		</ul>
	</VuePickerWrapp>
</template>

<script>
import VuePickerWrapp, {mode} from '@/components/auxiliary-components/picker-wrapp/VuePickerWrapp.vue';

export default {
	name: 'Vue_Select',
	components: {
		VuePickerWrapp
	},
	inheritAttrs: false,
	model: {
		prop: 'defaultOption',
		event: 'change'
	},
	props: {
		options: {
			type: Array,
			default: () => [{value: 'none', label: 'none'}]
		},
		defaultOption: Object
	},
	data: () => ({
		mode,
		selectVal: {value: null, label: null}
	}),
	methods: {
		sendData () {
			this.$emit('change', this.selectVal);
		},
		hideList () {
			this.$refs.selectPciker.setVisibility(false);
		},
		select (option) {
			this.selectVal = option;
			this.hideList();
			this.sendData();
		},
		isSelect (option) {
			return this.selectVal.value === option.value ? 'v-select__list-item--select' : null;
		}
	},
	computed: {
		selectValue: {
			get () {
				return !this.selectVal ? null : this.selectVal.label;
			},
			set (value) {
				this.selectVal = {value, label: value};
				this.hideList();
				this.sendData();
			}
		}
	},
	watch: {
		defaultOption: {
			handler () {
				this.selectVal = this.defaultOption;
			},
			immediate: true
		}
	}
};
</script>

<style>
.v-select__list {
	max-height: 200px;
	overflow-y: auto;
	background-color: #fff;
	border: 1px solid var(--c-grey-5);
}
.v-select__list-item {
	font-size: inherit;
	color: var(--grey);
	padding: 5px 10px;
	cursor: pointer;
	transition: background-color .15s;
}
.v-select__list-item:hover {
	background-color: #f5f7fa;
}
.v-select__list-item--select {
	color: var(--c-blue-4);
}

/* transition */
.v-select-slide-enter-active,
.v-select-slide-leave-active {
	transition: transform .2s;
}
.v-select-slide-enter,
.v-select-slide-leave-to {
	transform: scaleY(0);
}
</style>
