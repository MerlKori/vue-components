<template>
	<VuePickerWrapp
		@reset="resetDate()"
		v-model="getDefaultDate"
		ref="calendarPciker"
		:mode="getPickerMode"
		:editable="$attrs.editable"
		:focusId="focusFieldId"
		placeholder="select date">
		<div
			@click.stop="closeCalendar"
			class="dlg-dp__calendar">
			<VueCalendar v-model="date" />
			<!-- <button>today</button> -->
		</div>
	</VuePickerWrapp>
</template>

<script>
/* store */
import {mapState} from 'vuex';
import {listStoreModules} from '@/store/index';

/* components */
import VuePickerWrapp, {mode} from '@/components/auxiliary-components/picker-wrapp/VuePickerWrapp.vue';
import VueCalendar from '@/components/auxiliary-components/calendar/VueCalendar.vue';

export default {
	name: 'DLG_DatePicker',
	components: {
		VuePickerWrapp,
		VueCalendar
	},
	props: {
		config: Object,
		currentEl: Object
	},
	methods: {
		sendDate (date) {
			const data = [this.config.key, date];
			this.$emit('setData', data);
		},
		setDate (date) {
			if (!date) {
				this.sendDate(null);
				return;
			}
			const dateMs = Date.parse(date);
			this.sendDate(dateMs);
		},
		resetDate () {
			this.closeCalendar();
			this.sendDate(null);
		},
		closeCalendar () {
			this.$refs.calendarPciker.setVisibility(false);
		}
	},
	computed: {
		...mapState(listStoreModules.DlgFocusFields.name, {
			focusFieldId: listStoreModules.DlgFocusFields.types.state.FOCUS_FIELD_ID
		}),
		getPickerMode () {
			return mode.calendar;
		},
		getDefaultDate () {
			if (!this.currentEl || !this.currentEl[this.config.key]) return null;
			return new Date(this.currentEl[this.config.key]).toISOString().substr(0, 10);
		},
		date: {
			get () {
				return this.getDefaultDate;
			},
			set (date) {
				this.setDate(date);
			}
		}
	}
};
</script>

<style>
.dlg-dp__calendar {
	box-shadow: 0px 10px 20px 5px rgba(36, 36, 36, .2);
}
</style>
