<template>
	<div class="v-switch">
		<span class="v-switch__label">{{label}}</span>
		<input
			@change="toggle($event.target.checked)"
			:checked="checked"
			:id="id"
			:disabled="disabled"
			class="v-switch__field"
			type="checkbox"
			name="v-switch"
			hidden>
		<label
			class="v-switch__visual"
			:for="id">
			<span class="v-switch__visual-label">On</span>
			<span class="v-switch__visual-label">Off</span>
		</label>
	</div>
</template>

<script>
export default {
	name: 'Vue_Switch_Mode',
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		label: String,
		checked: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		id: `switch-${Math.floor(Math.random() * (100000 - 50)) + 5}`
	}),
	methods: {
		toggle (checked) {
			this.$emit('change', checked);
		}
	}
};
</script>

<style>
.v-switch {
	display: flex;
	align-items: center;
}
.v-switch__label {
	user-select: none;
}

.v-switch__visual {
	--bg-main: #fcebeb;
	--bg-before: #F44336;
	--translate-before: 36px;
	--c-first: #4e4e4e;
	--c-last: #fff;
}
.v-switch__field:checked + .v-switch__visual {
	--bg-main: #ecf5ff;
	--bg-before: #409EFF;
	--translate-before: 0;
	--c-first: #fff;
	--c-last: #4e4e4e;
}

.v-switch__visual {
	position: relative;
	display: flex;
	margin-left: 10px;
	background-color: var(--bg-main);
	border: 1px solid rgba(36,36,36, .1);
	border-radius: 3px;
	overflow: hidden;
	cursor: pointer;
	transition: background-color .3s;
}
.v-switch__visual::before {
	content: '';
	position: absolute;
	top: 2px;
	left: 2px;
	width: 34px;
	height: 32px;
	background-color: var(--bg-before);
	border-radius: 3px;
	z-index: 0;
	transform: translateX(var(--translate-before));
	transition: transform .3s, background-color .3s;
}
.v-switch__visual-label {
	position: relative;
	width: 28px;
	height: 28px;
	margin: 4px;
	font-size: 14px;
	line-height: 2;
	text-align: center;
	z-index: 1;
	user-select: none;
	transition: color .3s;
}
.v-switch__visual-label:first-child {
	color: var(--c-first);
}
.v-switch__visual-label:last-child {
	color: var(--c-last);
}
</style>
