<template>
	<div class="data-details">
		<div
			:class="getHeaderData.class"
			class="data-details__header">
			<h6 class="data-details__title">{{getHeaderData.title}}</h6>
			<button
				@click="toggleSettingsVisibility()"
				:disabled="getHeaderData.settingsIsDisabled"
				class="btn--sm btn--blue-2 mx-1 icon-settings-2"></button>
			<button
				@click="close()"
				class="btn--sm btn--red-2 mx-1 icon-close-2"></button>
		</div>
	<!-- mode="out-in" -->
		<transition
			name="toggle-list"
			
			:enter-class="getTransitionClasses.enter"
			:leave-to-class="getTransitionClasses.leave"
			>
			<DataDetailsList
				v-if="settingVissibility"
				key="details-settigs"
				:configsList="configs" >
				<template slot-scope="{config}">
					<span class="data-details__list-item-title">{{config.title}}:</span>
					<Checkbox
						v-model="config.active"
						:label="config.title"
						:type="checkboxTypes.toggle"
						class="ml-auto mr-3"/>
				</template>
			</DataDetailsList>

			<DataDetailsList
				v-if="!settingVissibility"
				key="details-row"
				:configsList="getActiveConfigs" >
				<template slot-scope="{config}">
					<span class="data-details__list-item-title">{{config.title}}:</span>
					<span class="data-details__list-item-value">{{rowData[config.key] || '-'}}</span>
				</template>
			</DataDetailsList>

		</transition>
	</div>
</template>

<script>
import Checkbox, {checkboxTypes} from '@/components/lib/checkboxes/Checkbox.vue';
import DataDetailsList from './DataDetails.List.vue';

import utils from '@/utils';

export default {
	name: 'Table_DataDetails',
	components: {
		Checkbox,
		DataDetailsList
	},
	props: {
		renderMap: {
			type: Array,
			default: () => []
		},
		rowData: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		checkboxTypes,
		configs: [],
		settingVissibility: false
	}),
	methods: {
		initConfig () {
			const copyRenderMap = utils._deepCopy(this.renderMap);
			this.configs = copyRenderMap.map(comfig => {
				comfig.active = true;
				return comfig;
			});
		},
		toggleSettingsVisibility () {
			this.settingVissibility = !this.settingVissibility;
		},

		close () {
			this.$emit('close-data-details');
		}
	},
	computed: {
		getActiveConfigs () {
			return this.configs.filter(config => config.active);
		},
		getHeaderData () {
			const isEmpty = Object.keys(this.rowData).length === 0;
			return {
				title: isEmpty ? 'No row selected!' : 'Row details',
				class: isEmpty ? 'data-details__header--error' : null,
				settingsIsDisabled: isEmpty
			};
		},
		getTransitionClasses () {
			return {
				enter: this.settingVissibility ? 'translate-left' : 'translate-right',
				leave: this.settingVissibility ? 'translate-right' : 'translate-left'
			};
		}
	},
	watch: {
		renderMap: {
			handler () {
				this.initConfig();
			},
			immediate: true
		}
	}

};
</script>

<style>
.data-details {
	position: relative;
	height: 100%;
	overflow: hidden;
	background-color: #fff;
	z-index: 100;
}
.data-details__header {
	display: flex;
	align-items: center;
	padding: 5px 10px;
	color: #fff;
	background: var(--c-grey-blue-1);
	transition: background-color .3s;
}
.data-details__header--error {
	background: var(--c-red-4);
}
.data-details__title {
	margin-right: auto;
}

.data-details__list-item-title {
	color: var(--c-grey-blue-1);
	white-space: nowrap;
	margin-right: 25px;
}
.data-details__list-item-value{
	margin-left: auto;
	font-size: 14px;
	text-align: right;
	color: var(--c-grey-7);
	word-break: normal;
}

.toggle-list-enter-active,
.toggle-list-leave-active {
	transition: transform .35s;
}
.translate-left,
.translate-right {
	position: absolute;
	left: 0;
	backface-visibility: hidden;
}
.translate-left {
	transform: translateX(-100%);
}
.translate-right {
	transform: translateX(100%);
}
</style>
