export default {
	methods: {
		mixin_reconfigRecord (record, reconfigMap, globalData) {
			let findEl;
			reconfigMap.forEach(c => { /* c - config */
				findEl = globalData[c.additionalEntity].find(el => el[c.findByKey] === record[c.findByKeyValue]);
				record[c.createKey] = findEl === undefined ? null : findEl[c.getByKey];
			});
		}
	}
};
