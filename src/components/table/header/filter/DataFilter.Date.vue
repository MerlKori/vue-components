<template>
	<div>
		<!-- Filter Field -->
		<div
			@keydown.enter="setVisibilityCalendar(true)"
			class="filter-date__hero">
			<input
				@click="setVisibilityCalendar(true)"
				readonly
				:value="period"
				class="filter-date__hero-field"
				type="text" />

			<button
				@click.stop="resetDate()"
				v-show="allowReset"
				class="filter-date__btn-reset btn--red-1 icon-close-2">
			</button>
			<span
				v-show="!allowReset"
				class="filter-date__hero-icon icon-calendar">
			</span>
		</div>

		<!-- CALENDAR -->
		<PopupWrapper
			@close-popup="setVisibilityCalendar(false)"
			:visibility="calendarVisibility" >

			<!-- SLOT -->
			<div class="filter-date__calendar">

				<!-- Start period -->
				<div class="filter-date__calendar-wrapp">
					<h6 class="filter-date__title">Start date</h6>
					<VueCalendar v-model="start" />
				</div>

				<!-- End period -->
				<div class="filter-date__calendar-wrapp">
					<h6 class="filter-date__title">End date</h6>
					<VueCalendar v-model="end" />
				</div>

				<!-- calendar controll -->
				<div class="filter-date__calendar-controll">
					<button
						@click="setVisibilityCalendar(false)"
						class="btn btn--cancel mr-4">cancel</button>
					<button
						@click="setDateFilter()"
						class="btn btn--green-5 mr-3">apply</button>
				</div>
			</div>
		</PopupWrapper>
	</div>
</template>

<script>
/* components */
import PopupWrapper from '@/components/PopupWrapper.vue';
import VueCalendar from '@/components/auxiliary-components/calendar/VueCalendar.vue';

export default {
	name: 'DataFilter_Date',
	components: {
		PopupWrapper,
		VueCalendar
	},
	inheritAttrs: false,
	props: {
		filterConfig: Object,
		dateResetEvent: Boolean /* click on btn clear filter */
	},
	data: () => ({
		calendarVisibility: false,
		start: null,
		end: null,
		period: 'dd/mm/yyyy - dd/mm/yyyy',
		allowReset: false
	}),
	methods: {
		setVisibilityCalendar (visibility) {
			this.calendarVisibility = visibility;
		},
		setAllowReset (value) {
			this.allowReset = value;
		},
		setPeriod () {
			const start = !this.start ? 'dd/mm/yyyy' : this.start;
			const end = !this.end ? 'dd/mm/yyyy' : this.end;
			this.period = `${start} - ${end}`;
		},
		resetDate () {
			this.start = null;
			this.end = null;
			this.setPeriod();
			this.setAllowReset(false);
			this.sendFilterData(null, null);
		},
		sendFilterData (start, end) {
			this.$emit('filter', {key: this.filterConfig.key, filterData: {start, end, type: 'date'}});
		},
		setDateFilter () {
			this.setPeriod();
			this.setVisibilityCalendar(false);
			this.setAllowReset(true);
			this.sendFilterData(Date.parse(this.start), Date.parse(this.end));
		}
	},
	watch: {
		dateResetEvent () {
			this.resetDate();
		}
	}
};
</script>

<style>
/* HERO */
.filter-date__hero {
	position: relative;
	overflow: hidden;
}
.filter-date__hero-field {
	padding: 5px 25px 5px 7px;
	font-size: 13px;
	cursor: pointer;
}
.filter-date__hero-icon {
	position: absolute;
	top: 7px;
	right: 6px;
	font-size: 16px;
	color: #D7DCED;
	transition: color .3s;
}

.filter-date__btn-reset {
	position: absolute;
	right: 4px;
	top: 4px;
	padding: .05em;
	font-size: 14px;
	border-radius: 3px;
	transition: all .35s;
}

.filter-date__hero:hover .filter-date__hero-icon {
	color: var(--c-blue-5);
}

/* CALENDARS */
.filter-date__calendar {
	width: 650px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.filter-date__calendar-wrapp:first-child {
	padding-right: 20px;
	margin-right: 20px;
	border-right: 1px solid var(--c-grey-5);
}
.filter-date__title {
	padding: 5px 15px;
	font-size: 15px;
	border-bottom: 1px solid var(--c-grey-4);
}
.filter-date__calendar-controll {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 20px;
	padding: 10px 0;
	border-top: 1px solid var(--c-grey-3);
}
</style>
