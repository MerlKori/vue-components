<template>
	<div
		@change="toggle"
		class="v-radio-group">
		<label
			v-for="(field, idx) in fieldsList"
			:key="idx"
			:for="`radio-${idx}`"
			class="v-radio-group__field-wrapp">
			<input
				type="radio"
				name="radio-group"
				:value="field.value"
				:id="`radio-${idx}`"
				class="v-radio-group__inputs"
				:checked="isChecked(field)"
				hidden>
			<span class="v-radio-group__labels">{{field.label}}</span>
		</label>
	</div>
</template>

<script>
export default {
	name: 'Vue_Radio_Group',
	model: {
		prop: 'checkedItem',
		event: 'change'
	},
	props: {
		title: String,
		fieldsList: {
			type: Array,
			default: () => []
		},
		checkedItem: Object
	},
	methods: {
		isChecked (data) {
			return this.checkedItem.value === data.value;
		},
		toggle (event) {
			const value = +event.target.value;
			const data = this.fieldsList.find(i => i.value === value);
			this.$emit('change', data);
		}
	}
};
</script>

<style>
.v-radio-group {
	display: flex;
	align-items: center;
}
.v-radio-group__field-wrapp {
	display: flex;
}
.v-radio-group__labels {
	padding: 8px 20px;
	background: #fff;
	border: 1px solid var(--c-grey-5);
	font-size: 14px;
	color: var(--c-grey-6);
	user-select: none;
	cursor: pointer;
	transition: all .35s;
}
.v-radio-group__field-wrapp:first-child .v-radio-group__labels {
	border-radius: 4px 0 0 4px;
}
.v-radio-group__field-wrapp:last-child .v-radio-group__labels {
	border-radius: 0 4px 4px 0;
}
.v-radio-group__inputs:checked + .v-radio-group__labels {
	color: #fff;
	background-color: var(--c-blue-5);
	border-color: var(--c-blue-6);
}
</style>
