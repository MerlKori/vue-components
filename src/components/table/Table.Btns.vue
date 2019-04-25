<template>
	<button :class="getBtnConfig.classes">
		<!-- <span v-if="getBtnConfig.icon" :class="getBtnConfig.icon"></span> -->
		{{getBtnConfig.label}}
	</button>
</template>

<script>
export const BTNS_LIST = {
	edit: 1,
	deactivate: 2,
	activate: 3,
	link: 4,
	delete: 5,
	deleteGroup: 6,
	create: 7,
	add: 8
};

export default {
	name: 'Table_Btns',
	props: {
		type: Number
	},
	computed: {
		getBtnConfig () {
			switch (this.type) {
				case BTNS_LIST.edit:
					return {
						classes: ['v-table__body-btns', 'btn--blue-2'],
						label: 'Edit'
					};
				case BTNS_LIST.deactivate:
					return {
						classes: ['v-table__body-btns', 'btn--red-2'],
						label: 'Deactivate'
					};
				case BTNS_LIST.activate:
					return {
						classes: ['v-table__body-btns', 'btn--green-2'],
						label: 'Activate'
					};
				case BTNS_LIST.link:
					return {
						classes: ['v-table__body-btns', 'btn--green-3'],
						label: 'Add link'
					};
				case BTNS_LIST.delete:
					return {
						classes: ['v-table__body-btns', 'btn--red-2'],
						label: 'Delete'
					};
				case BTNS_LIST.deleteGroup:
					return {
						classes: ['btn', 'btn--red-2'],
						label: 'Delete Group'
					};
				case BTNS_LIST.create:
					return {
						classes: ['btn', 'btn--blue-2'],
						label: 'Create New'
					};
				case BTNS_LIST.add:
					return {
						classes: ['btn', 'btn--blue-2'],
						label: 'Add'
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
	margin-left: .5rem;
	border-radius: .15em;
	font-size: var(--row-btns-fz);
	padding: .3em .8em;
	outline: none;
	cursor: pointer;
	transition: all .25s;
}
</style>
