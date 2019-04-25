/* Types */
import validationTypes from '@/components/dialogs/form/validation';
import {types as tableRowCellTypes} from '@/components/table/body/cells/Table.Body.Row.Cell.vue';
import {types as editFieldTypes} from '@/components/dialogs/form/components/Dlg.EditFields.vue';
import {filterTypes} from '@/components/table/header/filter/Table.Header.DataFilter.vue';
import {dateFormats} from '@/components/table/body/cells/Cell.Date.vue';

const validations = ((() => {
	const list = {};
	for (const key in validationTypes) {
		list[key] = key;
	}
	return list;
})());

export const globalTypes = {
	dateFormats,
	cell: tableRowCellTypes,
	filter: filterTypes,
	editField: editFieldTypes,
	validations
};

/* settings keys */
export const [
	render,
	disableFilter,
	disableSorting,
	editableSelection,
	editable,
	mandatory,
	reconfig,
	sticky
] = [true, true, true, true, true, true, true, true];

/* RENDER MAP */
export const fillRenderMap = (renderMap, scheme, key) => {
	if (!scheme[key].settings.render) return;

	const item = {title: scheme[key].title};
	item.key = !scheme[key].renderKey ? key : scheme[key].renderKey;
	item.cellType = !scheme[key].cellType ? globalTypes.cell.text : scheme[key].cellType; /* default cellTypes.text */
	item.filterType = !scheme[key].filterType ? globalTypes.filter.text : scheme[key].filterType; /* default filterTypes.text */
	if (scheme[key].route) item.route = scheme[key].route;
	if (scheme[key].settings.disableFilter) item.disableFilter = true;
	if (scheme[key].settings.disableSorting) item.disableSorting = true;
	if (scheme[key].settings.sticky) item.sticky = true;
	if (scheme[key].filterEntity) item.filterEntity = scheme[key].filterEntity;
	if (item.cellType === globalTypes.cell.date) {
		item.dateFormat = !scheme[key].dateFormat ? globalTypes.dateFormats.date : scheme[key].dateFormat;
	}
	renderMap.push(item);
};

/* DEFAULT RECONFIG MAP */
const fillReconfigMap = (reconfigMap, scheme, key) => {
	if (!scheme[key].settings.reconfig) return;

	/* set default keys */
	const getByKey = !scheme[key].getByKey ? 'name' : scheme[key].getByKey;
	const findByKey = !scheme[key].findByKey ? 'id' : scheme[key].findByKey;
	const findByKeyValue = !scheme[key].findByKeyValue ? key : scheme[key].findByKeyValue;
	const createKey = !scheme[key].renderKey ? key : scheme[key].renderKey;

	reconfigMap.push({
		findByKey,
		getByKey,
		findByKeyValue,
		createKey,
		additionalEntity: scheme[key].additionalEntity
	});
};

/* Fill Edit map */
const _addEditKey = (item, scheme, key) => {
	if (!scheme[key].renderKey) {
		item.key = key;
		item.serviceKeys = {
			entity: scheme[key].additionalEntity
		};
	} else {
		item.keys = {
			render: scheme[key].renderKey,
			edit: key
		};
		item.serviceKeys = {
			getByKey: !scheme[key].getByKey ? 'name' : scheme[key].getByKey,
			findByKey: !scheme[key].findByKey ? 'id' : scheme[key].findByKey,
			entity: scheme[key].additionalEntity
		};
	}
};
const _addLink = (item, type, scheme, key) => {
	if (type === 'link') {
		item.linkScheme = scheme[key].linkScheme;
	}
};

const _addValidations = (item, config, type) => {
	item.validations = [];
	/* LANG */
	const cekLangListFields = [globalTypes.editField.text, globalTypes.editField.textarea];
	if (cekLangListFields.includes(type)) {
		item.validations.push({name: globalTypes.validations.checkLang});
	}

	/* max length */
	if (!config.validations || config.validations.findIndex(el => el.name === globalTypes.validations.isStrMaxLength) < 0) {
		item.validations.push({name: globalTypes.validations.isStrMaxLength});
	}

	/* EMPTY */
	if (config.settings.mandatory) {
		item.validations.push({name: globalTypes.validations.checkOnEmpty});
	}

	/* OTHER CHECKS */
	if (!config.validations) return;
	item.validations = [...item.validations, ...config.validations];
};

export const fillEditMap = (editMap, scheme, key) => {
	if (scheme[key].settings.editable) {
		const simpleTypes = ['text', 'textarea', 'date']; /* field types for editing which need only one key */
		const type = !scheme[key].editFieldType ? globalTypes.editField.text : scheme[key].editFieldType;

		const item = {
			title: scheme[key].title,
			placeholder: !scheme[key].placeholder ? scheme[key].title : scheme[key].placeholder,
			userEdit: true,
			type,
			mandatory: !scheme[key].settings.mandatory ? false : scheme[key].settings.mandatory
		};

		/* set editable mode in select */
		if (scheme[key].settings.editableSelection) item.editableSelection = true;

		/* add keys for edit */
		if (simpleTypes.includes(type)) {
			item.key = key;
		} else {
			_addEditKey(item, scheme, key);
			_addLink(item, type, scheme, key);
		}
		_addValidations(item, scheme[key], type);

		item.gridArea = {gridArea: key}; /* for style form */
		editMap.push(item);
	} else {
		editMap.push({
			key,
			userEdit: false
		});
	}
};

export const getSchemeMaps = scheme => {
	const [renderMap, reconfigMap, editMap] = [[], [], []];
	for (const key in scheme) {
		fillRenderMap(renderMap, scheme, key);
		fillReconfigMap(reconfigMap, scheme, key);
		fillEditMap(editMap, scheme, key);
	}
	return {renderMap, reconfigMap, editMap};
};
