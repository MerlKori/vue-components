<template>
	<div class="movement-btns">
		<button
			@click="$emit('moveUp')"
			:disabled="disableUp"
			class="movement-btns__btn btn--blue-3 btn-click">
			<span class="movement-btns__btn-icon icon-arrow-up"></span>
		</button>
		<button
			@click="$emit('moveDown')"
			:disabled="disableDown"
			class="movement-btns__btn btn--blue-3 btn-click">
			<span class="movement-btns__btn-icon icon-arrow-down"></span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'MovementButtons',
	props: {
		disableUp: Boolean,
		disableDown: Boolean
	}
};
</script>

<style>
.movement-btns {
	width: 100%;
	height: 50px;
	border: 1px solid #ebebeb;
	background-color: var(--c-grey-1);
	display: flex;
	justify-content: center;
	align-items: center;
}
.movement-btns__btn {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 15px;
	width: 35px;
	height: 35px;
	border-radius: 4px;
	transition: background-color .3s, filter .3s;
}
.movement-btns__btn-icon {
	font-size: 32px;
}
</style>
