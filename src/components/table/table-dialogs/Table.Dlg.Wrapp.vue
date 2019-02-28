<template>
	<transition name="overlay">
		<div
			v-show="visibility"
			@keydown.esc="closeDlg"
			tabindex="-1"
			ref="dlgWrapp"
			class="dlg__overlay">
			<transition name="content">
				<transition-group
					v-if="visibility"
					class="dlg__content-wrapp"
					tag="div"
					name="translate-content" >
					<div
						:class="{'dlg__content--left' : visibilityAddContent}"
						key="main"
						class="dlg__content">
						<!-- DLG MAIN CONTENT -->
						<slot></slot>
					</div>
					<div
						v-if="visibilityAddContent"
						key="additional"
						class="dlg__content-additional">
						<slot name="dlg-additional-content"></slot>
					</div>
				</transition-group>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Table_Dlg_Wrapp',
	props: {
		visibility: Boolean,
		visibilityAddContent: Boolean
	},
	updated () {
		/* to catch the event keydown = esc */
		if (this.visibility) {
			this.$refs.dlgWrapp.focus();
		}
	},
	methods: {
		closeDlg () {
			this.$emit('close-dlg');
		}
	}
};
</script>

<style>
.dlg__overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, .4);
	overflow: hidden;
	outline: none;
	z-index: 100;
}
.dlg__content-wrapp {
	display: flex;
	align-items: center;
	height: 100%;
	width: 100%;
}
.dlg__content {
	position: relative;
	left: 50%;
	max-width: 400px;
	background-color: #fff;
	box-shadow: 0 0 15px rgba(0,0,0, .4);
	transform: translateX(-50%);
	z-index: 105;
	transition: all .3s;
}
.dlg__content--left {
	left: 0;
	transform: translateX(0%);
	margin-left: 10px;
}

.dlg__content-additional {
	position: relative;
	height: 90%;
	flex-grow: 1;
	margin: auto 20px auto 15px;
	z-index: 5;
}

/* transition */
.overlay-enter-active,
.overlay-leave-active {
	transition: opacity .3s;
}
.overlay-enter,
.overlay-leave-to {
	opacity: 0;
}
.content-enter-active,
.content-leave-active {
	transition: transform .3s;
}
.content-enter,
.content-leave-to {
	transform: translateY(-20%);
}
.translate-content-enter-active,
.translate-content-leave-active {
  transition: all .3s;
}
.translate-content-enter,
.translate-content-leave-to {
	transform: translateX(100%);
}
</style>
