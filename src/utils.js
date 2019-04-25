
const _getRandomNum = () => Math.floor(Math.random() * (1000000 - 50)) + 50;

/* emulation deep copy Object or Array */
const _deepCopy = data => JSON.parse(JSON.stringify(data));

/* remove array element */
const _removeEl = (arr, el) => {
	const idx = arr.indexOf(el);
	if (idx < 0) throw new Error('element is not found');
	arr.splice(idx, 1);
};

const _isEqual = (obj_1, obj_2, exceptions = []) => {
	const keysArr = Object.keys(obj_1).filter(el => !exceptions.includes(el));
	for (let idx = 0; idx < keysArr.length; idx++) {
		if (obj_1[keysArr[idx]] !== obj_2[keysArr[idx]]) return false;
	}
	return true;
};

const _getValueByPath = (obj, path) => {
	const isChild = path.length === 1;
	if (isChild) {
		return obj[path[0]];
	}
	const getChild = (parent, child) => {
		if (!parent || !parent[child]) {
			console.log(`${child} in is not define`);
			console.log(parent);
			return null;
		}
		return parent[child];
	};
	return path.reduce((xs, x) => getChild(xs, x), obj);
};

/*
	_splitDataByIds
	data - arr
	markersIds - arr, ids by which create main group
*/
const _splitDataByIds = (data, markersIds) => {
	const main = [];
	const other = [];

	data.forEach(item => {
		if (markersIds.includes(item.id)) {
			main.push(item);
		} else {
			other.push(item);
		}
	});
	return {main, other};
};

const _dataSortingByKey = (arr, key, value) => arr.sort(a => (a[key] === value ? -1 : 0));

/* Date UTILS */
const _toDateTime = dateMs => {
	const dateParts = new Date(dateMs).toUTCString().split(' ');
	return `${dateParts[1]} ${dateParts[2]} ${dateParts[3]} ${dateParts[4]}`;
};
const _toDate = dateMs => {
	const dateParts = new Date(dateMs).toUTCString().split(' ');
	return `${dateParts[1]} ${dateParts[2]} ${dateParts[3]}`;
};

const _dateToIsoString = dateMs => new Date(dateMs).toISOString().substr(0, 10);

export default {
	_getRandomNum,
	_deepCopy,
	_removeEl,
	_isEqual,
	_getValueByPath,
	_splitDataByIds,
	_dataSortingByKey,

	/* DATE */
	_dateToIsoString,
	_toDateTime,
	_toDate
};
