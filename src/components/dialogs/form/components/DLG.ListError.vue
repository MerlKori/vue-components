<template>
	<transition-group
		name="errors"
		tag="ol"
		class="errors__list">
		<li
			v-for="(err, idx) in errors"
			:key="idx"
			class="errors__list-item"
		>{{err.msg}}</li>
	</transition-group>
</template>

<script>
export default {
	name: 'DLG_ListError',
	props: {
		errors: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		isVisible () {
			return this.errors.length > 0;
		}
	}
};
</script>

<style>
.errors__list {
	position: relative;
	background-color: var(--c-red-1);
	margin: 2px 0 0 0;
	list-style-position: inside;
	padding: 0;
}
.errors__list::before {
	content: '';
	position: absolute;
	width: 3px;
	height: 100%;
	background-color: var(--c-red-6);
}
.errors__list-item {
	margin-bottom: .1em;
	font-size: 12px;
	padding: 2px 0 2px 10px;
	color: var(--c-red-6);
}
.errors-enter-active,
.errors-leave-active {
	transition: all .3s;
}
.errors-enter,
.errors-leave-to {
	opacity: 0;
	transform: translateX(20px);
}
</style>
