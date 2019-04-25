<template>
	<ul
		data-tooltip="Set size row"
		class="line-height-toggle tooltip tooltip--bottom">
		<li
			v-for="(el, idx) in listState"
			:key="idx"
			class="line-height-toggle__items">
			<input
				@change="changeSize($event)"
				class="line-height-toggle__input"
				type="radio"
				:name="`lh-tooggle-${nameInputID}`"
				:id="el.id" hidden :checked="el.checked"
				:data-size="el.size" >
			<label
				class="line-height-toggle__label"
				:for="el.id" >
				<span
					:style="{'font-size': el.fontSize}"
					class="icon-list-2"
					></span>
			</label>
		</li>
	</ul>
</template>

<script>
import utils from '@/utils';

export default {
	name: 'Table_LineHeightToggle',
	data: () => ({
		nameInputID: utils._getRandomNum(),
		listState: [
			{
				id: utils._getRandomNum(),
				fontSize: '22px',
				checked: false,
				size: 'large',
				variables: [
					{key: '--row-btns-fz', value: '14px'},
					{key: '--row-fz', value: '17px'}
				]
			},
			{
				id: utils._getRandomNum(),
				fontSize: '18px',
				checked: true,
				size: 'middle',
				variables: [
					{key: '--row-btns-fz', value: '13px'},
					{key: '--row-fz', value: '14px'}
				]
			},
			{
				id: utils._getRandomNum(),
				fontSize: '14px',
				checked: false,
				size: 'small',
				variables: [
					{key: '--row-btns-fz', value: '11px'},
					{key: '--row-fz', value: '12px'}
				]
			}
		]
	}),
	methods: {
		changeSize (event) {
			const getRefTable = () => {
				let currentEl = event.target;
				let countIterations = 0;
				const maxNumberIterations = 10;
				while (!currentEl.classList.contains('v-table') || countIterations === maxNumberIterations) {
					if (currentEl.parentElement !== undefined) {
						currentEl = currentEl.parentElement;
						countIterations += 1;
					} else {
						return currentEl;
					}
				}
				return currentEl;
			};
			const currentTable = getRefTable();
			const state = event.target.getAttribute('data-size');
			const setStyle = styles => {
				styles.forEach(style => {
					currentTable.style.setProperty(style.key, style.value);
				});
			};
			switch (state) {
				case this.listState[0].size:
					setStyle(this.listState[0].variables);
					break;
				case this.listState[1].size:
					setStyle(this.listState[1].variables);
					break;
				case this.listState[2].size:
					setStyle(this.listState[2].variables);
					break;
				default: throw Error('error');
			}
		}
	}
};
</script>

<style>
.line-height-toggle {
	display: flex;
	justify-content: flex-end;
	padding: 0 10px;
	/* margin: 0 15px 0 0px; */
	/* border: 1px solid var(--c-grey-5); */
	/* border-right: 1px solid var(--c-grey-5); */
	/* border-radius: 3px; */
	/* background-color: rgba(56,55,98, 1); */
	/* background-color: #fff; */
}

.line-height-toggle__items {
	display: flex;
	align-items: center;
	margin-left: 5px;
}
.line-height-toggle__label {
	position: relative;
	display: flex;
	align-items: center;
	color: var(--c-grey-4);
	padding: 5px;
	cursor: pointer;
	z-index: 0;
	transition: color .35s;
}
.line-height-toggle__label:hover {
	color: var(--c-grey-5);
}
.line-height-toggle__label:active::after {
	opacity: .5;
	transform: scale(0);
	transition: none;
}
.line-height-toggle__label::after {
	content: '';
	position: absolute;
	top: -25%;
	left: -30%;
	width: 160%;
	height: 150%;
	border-radius: 50%;
	background-color: var(--c-blue-4);
	opacity: 0;
	transform: scale(1);
	transform-origin: center;
	transition: transform .4s, opacity .4s;
	z-index: -1;
}
.line-height-toggle__input:checked + .line-height-toggle__label {
	color: var(--c-blue-2);
}
</style>
