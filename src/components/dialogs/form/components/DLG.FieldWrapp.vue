<template>
	<div
		:style="config.gridArea"
		class="dlg-field-wrapp">
		<span class="dlg-field-wrapp__label">
			{{config.title}}
			<span v-if="config.mandatory" class="dlg-field-wrapp__mandatory">*</span>
		</span>
		<!-- Slot for field -->
		<slot></slot>
		<DlgListError :errors="getErrors" />
	</div>
</template>

<script>
import DlgListError from './DLG.ListError.vue';

export default {
	name: 'DLG_FieldWrapp',
	components: {DlgListError},
	props: {
		invalidKeys: {
			type: Array,
			default: () => []
		},
		config: {
			type: Object
		}
	},
	computed: {
		getErrors () {
			return this.invalidKeys.filter(err => err.key === this.getKey);
		},
		getKey () {
			return Object.prototype.hasOwnProperty.call(this.config, 'key') ? this.config.key : this.config.keys.render;
		}
	}
};
</script>

<style>
.dlg-field-wrapp {
	position: relative;
	margin-bottom: 20px;
}
.dlg-field-wrapp__label {
	display: block;
	font-size: 14px;
	padding: 0 0 5px 5px;
	text-transform: capitalize;
	color: var(--c-grey-8);
}
.dlg-field-wrapp__mandatory {
	color: red;
	font-size: 17px;
	line-height: 1;
}
</style>
