<template>
	<div
		@keydown.esc="hideBody()"
		ref="picker"
		class="v-picker">

		<!-- header -->
		<div class="v-picker__header">
			<input
				@input="changeVal($event)"
				@click="toggleVisibilityList()"
				@keydown.enter="toggleVisibilityList()"
				:focus-id="id"
				:value="value"
				:placeholder="placeholder"
				:readonly="!editable"
				:class="{'field-focus' : isFocus}"
				class="vp-header__field"
				type="text">

			<!-- btns for mode select -->
			<span
				v-if="getMode.select"
				:class="{'vp-header__icon-arrow--up' : visibility}"
				class="vp-header__icon-arrow  icon-arrow-down">
			</span>

			<!-- btns for mode calendar -->
			<template v-if="getMode.calendar" >
				<button
					@click.stop="reset"
					v-show="value"
					class="vp-header__btn-close btn--red-2 icon-close-2">
				</button>
				<span
					v-show="!value"
					class="vp-header__icon-calendar icon-calendar">
				</span>
			</template>
		</div>

		<!-- body -->
		<transition name="vp-slide">
			<div
				v-show="visibility"
				:style="bodyStyle"
				:class="getBodyDirectionClass"
				class="v-picker__body">
				<!-- Vue Picker Body -->
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
import utils from '@/utils';

export const mode = {
	calendar: 1,
	select: 2
};

export default {
	name: 'Vue_Picker',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: [String, Number, Boolean],
			default: null
		},
		editable: {
			type: Boolean,
			default: false
		},
		focusId: [String, Number],
		placeholder: String,
		mode: Number,
		fixedBody: {
			type: Boolean,
			default: false
		},
		direction: String,
		hideBodyEvent: Boolean
	},
	data: () => ({
		id: `picker#${utils._getRandomNum()}`,
		visibility: false,
		bodyStyle: null
	}),
	mounted () {
		document.body.addEventListener('click', this.hideBody);
	},
	destroyed () {
		document.body.removeEventListener('click', this.hideBody);
	},
	methods: {
		toggleVisibilityList () {
			this.visibility = !this.visibility;

			if (this.fixedBody) {
				this.setStyle();
			}
		},
		setVisibility (vis) {
			this.visibility = vis;
		},
		hideBody (event) {
			if (!event || this.$el.contains(event.target)) return;

			this.setVisibility(false);
			this.$refs.picker.focus();
		},
		changeVal (e) {
			const val = e.target.value;
			this.hideBody();
			this.$emit('change', val);
		},
		reset () {
			this.$emit('reset');
		},
		setStyle () {
			const {width, left, right, bottom} = this.$refs.picker.getBoundingClientRect(); // eslint-disable-line
			this.bodyStyle = {
				position: 'fixed',
				width: `${width}px`,
				left: `${left}px`,
				top: `${bottom}px`,
				minWidth: 'auto'
			};
		}
	},
	computed: {
		getMode () {
			return {
				calendar: this.mode === mode.calendar,
				select: this.mode === mode.select
			};
		},
		isFocus () {
			return this.focusId === this.id;
		},
		getBodyDirectionClass () {
			if (!this.direction) return 'v-picker__body--down';
			return this.direction === 'up' ? 'v-picker__body--up' : 'v-picker__body--down';
		}
	},
	watch: {
		hideBodyEvent () {
			this.setVisibility(false);
		}
	}
};
</script>

<style src="./style.css"></style>
