<template>
	<div class="dlg-link-field__wrapp click-left">
		<input
			@click="toggleScreen()"
			@keydown.enter="toggleScreen()"
			class="dlg-link-field"
			:class="{'field-focus' : isFocus}"
			:focus-id="id"
			:placeholder="config.placeholder"
			readonly
			:value="getDefVal"
			type="text" />
		<span class="dlg-link-field__icon icon-link-2"></span>
	</div>
</template>

<script>
/* store */
import {mapState, mapMutations, mapActions} from 'vuex';
import {listStoreModules} from '@/store/index';

import utils from '@/utils';

export default {
	name: 'DLG_LinkField',
	props: {
		config: Object,
		currentEl: Object
	},
	data: () => ({
		id: `linkField#${utils._getRandomNum()}`
	}),
	methods: {
		...mapMutations(listStoreModules.DlgFocusFields.name, {
			setFocusFieldId: listStoreModules.DlgFocusFields.types.mutations.SET_FOCUS_FIELD_ID
		}),
		...mapActions(listStoreModules.DlgAddContent.name, {
			showAddContent: listStoreModules.DlgAddContent.types.actions.SHOW_ADD_CONTENT,
			hideAddContent: listStoreModules.DlgAddContent.types.actions.HIDE_ADD_CONTENT
		}),
		toggleScreen () {
			if (this.isCurrentField) {
				this.hideAddContent();
				return;
			}
			this.showAddContent({
				scheme: this.config.linkScheme,
				fieldId: this.id
			});
		},
		setLinkData (linkEl) {
			/* set values */
			const send = (key, val) => {
				const data = [key, val];
				this.$emit('setData', data);
			};
			send(this.config.keys.edit, linkEl[this.config.serviceKeys.findByKey]);
			send(this.config.keys.render, linkEl[this.config.serviceKeys.getByKey]);

			/* change id for toggleScreen */
			this.id = `linkField#${Math.floor(Math.random() * (1000000 - 50)) + 50}`;
			this.setFocusFieldId(this.id);
		}
	},
	computed: {
		...mapState(listStoreModules.DlgAddContent.name, {
			link: listStoreModules.DlgAddContent.types.state.LINK_ON_ELEMENT,
			currentFieldId: listStoreModules.DlgAddContent.types.state.FIELD_ID
		}),
		...mapState(listStoreModules.DlgFocusFields.name, {
			focusFieldId: listStoreModules.DlgFocusFields.types.state.FOCUS_FIELD_ID
		}),
		getDefVal () {
			if (!this.currentEl) return null;
			return this.currentEl[this.config.keys.render];
		},
		isCurrentField () { /* to switch between link fields */
			return this.currentFieldId === this.id;
		},
		isFocus () { /* to switch between all fields */
			return this.focusFieldId === this.id;
		}
	},
	watch: {
		link () {
			if (!this.isCurrentField) return;
			this.setLinkData(this.link);
		},
		focusFieldId () {
			if (!this.focusFieldId || !this.focusFieldId.includes('linkField')) {
				this.hideAddContent();
			}
		}
	}
};
</script>

<style>
.dlg-link-field__wrapp {
	--click-color: var(--c-blue-4); /* for click-class */
}
.dlg-link-field__wrapp {
	position: relative;
	overflow: hidden;
	color: var(--c-grey-7);
}
.dlg-link-field__wrapp:hover {
	color: var(--c-blue-4);
}
.dlg-link-field {
	position: relative;
	color: inherit;
	background-color: transparent;
	padding-right: 24px;
	cursor: pointer;
	z-index: 2;
	transition: all .3s;
}
.dlg-link-field:hover {
	border: 1px solid var(--c-blue-4);
}
.dlg-link-field__icon {
	position: absolute;
	top: 9px;
	right: 5px;
	font-size: 18px;
	opacity: .4;
	color: inherit;
	z-index: 1;
	transition: color .3s;
}
</style>
