<template>
<div class="v-calendar">
	<!-- HERO -->
	<div
		@click.stop
		class="v-calendar__hero">
		<button
			@click="prevYear"
			class="v-calendar__hero-btns icon-d-arrow-left"></button>
		<button
			@click="prevMonth"
			class="v-calendar__hero-btns icon-arrow-left"></button>

		<span class="v-calendar__hero-select-date">{{getCurrentDate}}</span>

		<button
			@click="nextMonth"
			class="v-calendar__hero-btns icon-arrow-right"></button>
		<button
			@click="nextYear"
			class="v-calendar__hero-btns icon-d-arrow-right"></button>
	</div>

	<!-- NAMES OF DAYS -->
	<ul
		@click.stop
		class="v-calendar__days">
		<li
			v-for="(day, idx) in namesDays"
			:key="idx"
			class="v-calendar-days__days-item"
		>
		{{day}}
		</li>
	</ul>

	<!-- DAYS -->
	<ul
		@click="selectDay($event)"
		class="v-calendar__body">
		<li
			v-for="(item, idx) in getCalendarData"
			:key="idx"
			:data-date="item.fullDate"
			:class="item.classes"
			class="v-calendar__body-cell"
		>{{item.day}}</li>
	</ul>
</div>
</template>

<script src="./script.js" ></script>

<style src="./style.css" ></style>
