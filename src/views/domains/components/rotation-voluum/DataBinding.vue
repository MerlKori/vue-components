<template>
	<PopupWrapper
		@close-popup="proxyCloseEvent"
		:visibility="$attrs.visibility" >
			<div class="data-binding" key="jskdfk">
				<div class="data-binding__progress"></div>
				<div class="data-binding__steps">
					<!-- <transition name="slide-left" > -->
					<component
						:is="getActiveTable.component"
						v-on="getActiveTable.events"
						v-bind="getActiveTable.bind"
						:key="getActiveTable.key" />
					<!-- </transition> -->
				</div>

				<!-- ACTIONS -->
				<div class="data-binding__actions">
					<button
						@click="proxyCloseEvent"
						class="btn btn--cancel mr-4">cancel</button>
					<button
						v-if="isStep.step_2"
						@click="setActiveStep(steps.step_1)"
						class="btn btn--red-2 mr-4">back</button>
					<button
						v-if="isStep.step_1"
						:disabled="selectedDomainsIds.length === 0"
						@click="setActiveStep(steps.step_2)"
						class="btn btn--green-5 mr-4">next</button>
					<button
						v-if="isStep.step_2"
						:disabled="!selectedResourcesId"
						@click="sendOnRotate()"
						class="btn btn--green-5 mr-4">save</button>
				</div>
			</div>
	</PopupWrapper>
</template>

<script>
/* components */
import VueTable from '@/components/table/template/VueTable.vue';
import TableWithCheckboxes from '@/collections/tables/Table.WithCheckboxes.vue';
import PopupWrapper from '@/components/PopupWrapper.vue';

/* other */
import schemes from '@/schemes';

const steps = {
	step_1: 1,
	step_2: 2
};

export default {
	name: 'Domain_Data_Binding_For_Rotation',
	components: {
		VueTable,
		TableWithCheckboxes,
		PopupWrapper
	},
	inheritAttrs: false,
	props: {
		domains: {
			type: Array,
			default: () => []
		},
		resources: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		schemes,
		steps,
		activeStep: 1,
		selectedDomainsIds: [],
		selectedResourcesId: null
	}),
	methods: {
		setSelectedDomainsIds (domains) {
			this.selectedDomainsIds = domains;
		},
		setSelectedResourcesId (resource) {
			this.selectedResourcesId = resource.id;
		},
		setActiveStep (step) {
			this.activeStep = step;
		},
		resetData () {
			this.activeStep = 1;
			this.selectedDomainsIds = [];
			this.selectedResourcesId = null;
		},


		/* proxy methods */
		proxyCloseEvent () {
			this.$emit('close-popup');
		},
		sendOnRotate () {
			this.$emit('send-on-rotate', this.getBindingData);
		}
	},
	computed: {
		isStep () {
			return {
				step_1: this.activeStep === steps.step_1,
				step_2: this.activeStep === steps.step_2
			};
		},
		getActiveTable () {
			const scheme = schemes.DomainsRotationVoluumTransfer.subSchemesForBindingTables;
			return {
				component: this.isStep.step_1 ? 'TableWithCheckboxes' : 'VueTable',
				events: this.isStep.step_1 ? {'select-items': this.setSelectedDomainsIds} : {'select-row': this.setSelectedResourcesId},
				bind: {
					data: this.isStep.step_1 ? this.domains : this.resources,
					scheme: this.isStep.step_1 ? scheme.domains : scheme.resources
				},
				key: this.isStep.step_1 ? steps.step_1 : steps.step_2
			};
		},
		getBindingData () {
			if (this.selectedDomainsIds.lenght === 0 || !this.selectedResourcesId) return [];
			return this.selectedDomainsIds.map(id => ({
				domainId: id,
				resourceId: this.selectedResourcesId,
				orderNumber: 1
			}));
		}
	}
};
</script>

<style>
/* .slide-left */
.data-binding__overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	background-color: rgba(36,36,36, .2);
}
.data-binding {
	height: 95vh;
	width: 85vw;
	overflow: hidden;
	background-color: #fff;
	border-radius: 5px;
}
.data-binding__steps {
	height: calc(100% - 50px);
}
.data-binding__actions {
	display: flex;
	justify-content: flex-end;
	padding: 10px 15px;
	border-top: 1px solid var(--c-grey-4);
}

</style>
