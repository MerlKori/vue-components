<template>
	<div class="dlg-form">
		<div
			@click="setFocus($event)"
			class="dlg-form__forms-wrapp"
			:style="dlgStyle">
			<DlgEditFields
				v-for="(conf, idx) in getEditFields"
				:key="idx"
				:config="conf"
				:currentEl="formData"
				:invalidKeys="invalidKeys"
				@setData="setDataOnKey"/>
		</div>

		<div class="dlg-form__btn-wrapp">
			<button
				@click="proxyCloseEvent()"
				class="btn btn--cancel mr-4">cancel</button>
			<button
				@click="proxySaveEvent()"
				:disabled="disableSave"
				class="btn btn--green-5 mr-2">save</button>
		</div>
	</div>
</template>

<script src="./form.js"></script>

<style>
.dlg-form {
	padding: 20px;
}
.dlg-form__forms-wrapp {
	border-bottom: 1px solid var(--c-grey-4);
	padding-bottom: 15px;
}
.dlg-form__btn-wrapp {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 10px 5px 0;
}
</style>
