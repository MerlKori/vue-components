<template>
	<button
		:class="getBtnConfig.colorClass"
		class="v-table__body-btns">
		{{getBtnConfig.label}}
	</button>
</template>

<script>
export const BTNS_LIST = {
	edit: 1,
	deactivate: 2,
	activate: 3,
	link: 4
};

export default {
	name: 'Table_Body_Row_Btn',
	props: {
		type: Number
	},
	computed: {
		getBtnConfig () {
			switch (this.type) {
				case BTNS_LIST.edit:
					return {
						colorClass: 'btn--blue-2',
						label: 'Edit'
					};
				case BTNS_LIST.deactivate:
					return {
						colorClass: 'btn--red-2',
						label: 'Deactivate'
					};
				case BTNS_LIST.activate:
					return {
						colorClass: 'btn--green-2',
						label: 'Return'
					};
				case BTNS_LIST.link:
					return {
						colorClass: 'btn--green-3',
						label: 'Add link'
					};
				default:
					console.log('type btn is not found');
			}
		}
	}
};
</script>

<style>
.v-table__body-btns {
	position: relative;
	margin-right: .5rem;
	border-radius: .2em;
	font-size: var(--row-btns-fz);
	padding: .3em .8em;
	outline: none;
	cursor: pointer;
	transition: all .25s;
}
</style>
