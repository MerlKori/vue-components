<template>
	<div class="movement-btns">
		<button
			@click="$emit('moveUp')"
			:disabled="disableUp"
			class="movement-btns__btn btn--blue-3 btn-click">
			<font-awesome-icon :icon="faChevronUp" size="lg" />
		</button>
		<button
			@click="$emit('moveDown')"
			:disabled="disableDown"
			class="movement-btns__btn btn--blue-3 btn-click">
			<font-awesome-icon :icon="faChevronDown" size="lg" />
		</button>
	</div>
</template>

<script>
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'MovementButtons',
	props: {
		disableUp: Boolean,
		disableDown: Boolean
	},
	data: () => ({
		faChevronUp,
		faChevronDown
	})
};
</script>

<style>
.movement-btns {
	width: 100%;
	height: 50px;
	border: 1px solid #ebebeb;
	background-color: rgba(87,202,143, .05);
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px 0;
}
.movement-btns__btn {
	margin: 0 15px;
	padding: 6px 8px;
	font-size: 18px;
	border-radius: 4px;
	line-height: 1;
	transition: background-color .3s, filter .3s;
}
</style>
