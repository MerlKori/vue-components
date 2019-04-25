<template>
	<label
		:class="getClasses"
		class="cbx-template-switcher"
		:for="id">
		<span class="cbx-template-switcher__labels">On</span>
		<span class="cbx-template-switcher__labels">Off</span>
	</label>
</template>

<script>
export default {
	name: 'Checkbox_Switcher',
	inheritAttrs: false,
	props: {
		id: String,
		isActive: {
			type: Boolean,
			default: false
		},
		isDisable: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getClasses () {
			return {
				'cbx-template-switcher--active': this.isActive,
				'cbx-template-switcher--disable': this.isDisable
			};
		}
	}
};
</script>

<style>
.cbx-template-switcher {
	--bg-main: #fcebeb;
	--bg-before: #F44336;
	--translate-before: 36px;
	--c-first: #4e4e4e;
	--c-last: #fff;
}
.cbx-template-switcher--active {
	--bg-main: #ecf5ff;
	--bg-before: #409EFF;
	--translate-before: 0;
	--c-first: #fff;
	--c-last: #4e4e4e;
}
.cbx-template-switcher--disable {
	pointer-events: none;
}

.cbx-template-switcher {
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
.cbx-template-switcher::before {
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
.cbx-template-switcher__labels {
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
.cbx-template-switcher__labels:first-child {
	color: var(--c-first);
}
.cbx-template-switcher__labels:last-child {
	color: var(--c-last);
}
</style>
