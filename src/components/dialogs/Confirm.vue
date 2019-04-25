<template>
	<div class="tmp-confirm">
		<h4 class="tmp-confirm__title">{{data.title}}</h4>
		<p class="tmp-confirm__subtitle">{{data.subtitle}}</p>
		<ol
			v-if="data.elementsList"
			class="tmp-confirm__list">
			<li
				v-for="(el, idx) in data.elementsList"
				:key="idx"
				class="tmp-confirm__list-item"
			>{{el.name}}</li>
		</ol>
		<div class="tmp-confirm__btns-wrap">
			<button
				@click="close"
				class="tmp-confirm__btns btn btn--cancel">cancel</button>
			<button
				@click="apply"
				class="tmp-confirm__btns btn btn--green-5">Yes</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Confirm',
	props: {
		data: {
			type: Object,
			default: () => ({
				title: null,
				subtitle: null
			})
		}
	},
	methods: {
		close () {
			this.$emit('close-dlg', null);
		},
		apply () {
			this.$emit('save', null);
		}
	}
};
</script>

<style>
.tmp-confirm {
	padding: 0px 15px;
	max-width: 400px;
}
.tmp-confirm__title {
	margin: 15px 5px 10px;
	font-size: 20px;
	color: #303133;
}
.tmp-confirm__subtitle {
	padding: 5px 5px 0;
	font-size: 15px;
	color: #606266;
}

.tmp-confirm__list {
	max-height: 200px;
	overflow-y: auto;
	margin: 10px 0;
	padding-left: 25px;
}
.tmp-confirm__list-item {
	margin-bottom: .5em;
	font-size: 14px;
	color: var(--c-grey-7);
}
.tmp-confirm__btns-wrap {
	margin-top: 15px;
	padding: .7em 15px;
	text-align: right;
	border-top: 1px solid var(--c-grey-4);
}
.tmp-confirm__btns {
	margin-left: 20px;
}
</style>
