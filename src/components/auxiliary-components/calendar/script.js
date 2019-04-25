export default {
	name: 'Calendar',
	model: {
		prop: 'defaultDate',
		event: 'select-date'
	},
	props: {
		defaultDate: String
	},
	data: () => ({
		// namesMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		// shortNamesMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		namesDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		today: null,
		currentDay: null
	}),
	created () {
		this.setToday();
	},
	methods: {
		setToday () {
			this.today = new Date().toISOString().substr(0, 10);
		},
		setDefaultCurrentDate () {
			const checkDate = date => {
				if (!date) return false;
				const pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
				return pattern.test(date);
			};
			this.currentDay = checkDate(this.defaultDate) ? this.defaultDate : null;
		},

		parseDateStr (dateStr) {
			const d = new Date(dateStr);
			return {
				year: d.getFullYear(),
				month: d.getMonth()
			};
		},
		joinDateObj (obj) {
			/* add 0 for days or month */
			const _transformNumber = number => (number < 10) ? `0${number}` : number; // eslint-disable-line
			return `${obj.year}-${_transformNumber(obj.month + 1)}-${_transformNumber(obj.day)}`;
		},

		/* Calendar Navigation PREV */
		prevMonth () {
			const dateObj = this.parseDateStr(this.currentDay || this.today);
			dateObj.day = 1;
			dateObj.month = dateObj.month === 0 ? 11 : dateObj.month - 1;
			dateObj.year = dateObj.month === 0 ? dateObj.year - 1 : dateObj.year;
			this.currentDay = this.joinDateObj(dateObj);
		},
		prevYear () {
			const dateObj = this.parseDateStr(this.currentDay || this.today);
			dateObj.day = 1;
			dateObj.year -= 1;
			this.currentDay = this.joinDateObj(dateObj);
		},

		/* Calendar Navigation NEXT */
		nextMonth () {
			const dateObj = this.parseDateStr(this.currentDay || this.today);
			dateObj.day = 1;
			dateObj.month = dateObj.month === 11 ? 0 : dateObj.month + 1;
			dateObj.year = dateObj.month === 11 ? dateObj.year + 1 : dateObj.year;
			this.currentDay = this.joinDateObj(dateObj);
		},
		nextYear () {
			const dateObj = this.parseDateStr(this.currentDay || this.today);
			dateObj.day = 1;
			dateObj.year += 1;
			this.currentDay = this.joinDateObj(dateObj);
		},

		/* select date by click */
		selectDay (event) {
			const date = event.target.getAttribute('data-date');
			if (!date) return;
			this.currentDay = date;
		},

		/* controle methods */
		returnToday () {
			this.currentDay = this.today;
		},

		/* setCalendarData */
		fillCalendarData (dateStr) {
			const items = 42;
			const calendarData = [];
			const d = new Date(dateStr);

			/* Data by months */
			const current = {
				year: d.getFullYear(),
				month: d.getMonth()
			};
			const prev = {
				year: current.month === 0 ? current.year - 1 : current.year,
				month: current.month === 0 ? 11 : current.month - 1
			};
			const next = {
				year: current.month === 11 ? current.year + 1 : current.year,
				month: current.month === 11 ? 0 : current.month + 1
			};
			const daysInMonth = {
				prev: new Date(prev.year, prev.month + 1, 0).getDate(),
				current: new Date(current.year, current.month + 1, 0).getDate()
			};
			const positionFirstDay = new Date(`${current.month} 1 ${current.year}`).getDay();

			/* methods */
			/* add 0 for days or month TODO: remove */
			const _transformNumber = number => (number < 10) ? `0${number}` : number; // eslint-disable-line

			/* fill item date */
			const _getItemData = (day, month, year, classes) => ({
				day,
				fullDate: `${year}-${_transformNumber(month + 1)}-${_transformNumber(day)}`,
				classes
			});

			/* add prev month data */
			for (let i = 0; i < positionFirstDay; i++) {
				const classes = ['vc-body__cell--opacity'];
				calendarData.push(_getItemData(daysInMonth.prev - i, prev.month, prev.year, classes));
			}
			calendarData.reverse();

			/* add current month days */
			for (let i = 0; i < daysInMonth.current; i++) {
				const classes = ['vc-body__cell--current'];
				const date = _getItemData(i + 1, current.month, current.year, classes);

				/* add additional classes */
				if (this.currentDay === date.fullDate) {
					date.classes.push('vc-body__cell--select');
				}
				if (this.today === date.fullDate) {
					date.classes.push('vc-body__cell--today');
				}

				calendarData.push(date);
			}

			/* add next month days */
			const dayInNextMonth = items - calendarData.length;

			for (let i = 0; i < dayInNextMonth; i++) {
				const classes = ['vc-body__cell--opacity'];
				const date = _getItemData(i + 1, next.month, next.year, classes);
				calendarData.push(date);
			}

			return calendarData;
		}
	},
	computed: {
		getCalendarData () {
			const data = this.currentDay || this.today;
			return this.fillCalendarData(data);
		},
		getCurrentDate () {
			return !this.currentDay ? this.today : this.currentDay;
		}
	},
	watch: {
		currentDay () {
			this.$emit('select-date', this.currentDay);
		},
		defaultDate: {
			handler () {
				this.setDefaultCurrentDate();
			},
			immediate: true
		}

	}
};
