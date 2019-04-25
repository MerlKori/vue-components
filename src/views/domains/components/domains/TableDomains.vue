<template>
	<div>
		<VueTable
			ref="Table"
			@select-row="selectBodyRow"
			@reset-cbx="mixin_resetCheckboxData"
			:scheme="scheme"
			:loadingProcess="$attrs.loadingProcess"
			:data="getTableData"
			:withActions="true">

			<template slot="table-control-panel">
				<Tooltip
					content="Create new element"
					placement="bottom">
					<button
						@click="mixin_showDlgCreate()"
						class="btn-small mx-1 btn--blue-2 icon-plus"></button>
				</Tooltip>
				<Tooltip
					content="Remove all selected"
					placement="bottom">
					<button
						:disabled="actionDeleteAllIsDisable"
						@click="mixin_showDlgDeleteAll()"
						class="btn-small btn--red-2 icon-trash mx-1"></button>
				</Tooltip>
				<Tooltip
					:content="getStyleBtnDeleteAll.tooltip"
					placement="bottom">
					<button
						@click="toggleTableMode()"
						:class="getStyleBtnDeleteAll.class"
						class="btn-small btn--green-5 icon-layers mx-1"></button>
				</Tooltip>
			</template>

			<VueCheckbox
				v-if="multipleMode"
				slot="header-checkbox"
				v-model="mixin_toggleAllCeckboxes"
				:disabled="mixin_checkboxIsDisable"
				class="v-table-cell--sticky-left v-table__cbx-blink" />

			<TableBodyCheckbox
				v-if="multipleMode"
				slot="row-checkbox"
				slot-scope="{row}"
				@select="mixin_select(row.id)"
				@deselect="mixin_deselect(row.id)"
				:checked="mixin_isChecked(row.id)"
				class="v-table-cell--sticky-left v-table__cbx-blink" />
			<template
				slot="row-buttons"
				slot-scope="{row}">
				<TableBtns
					@click.native="mixin_showDlgEdit(row)"
					:type="BTNS_LIST.edit" />
				<TableBtns
					@click.native="mixin_showDlgDelete(row)"
					:type="BTNS_LIST.delete" />
			</template>

			<!-- TABLE FOOTER CONTENT -->
			<TableFooterInfo
				v-if="multipleMode"
				slot="table-footer"
				class="ml-4"
				:selectedCount="mixin_checkbox.list.length" />
		</VueTable>

	<!-- DIALOGS -->
	<TableDlgWrapper
		@close-dlg="mixin_hideDlg"
		:visibility="dlg.visibility">
		<TableDlgContent
			@close-dlg="mixin_hideDlg"
			@save="mixin_handlerDlgEvent(arguments[0], getTableData)"
			:type="dlg.type"
			:data="dlg.data"
			:dlgStyle="scheme.style.forms"
		/>
	</TableDlgWrapper>
	</div>
</template>

<script src="./table-domains.js" ></script>


<style>
.v-table__cbx-blink {
	animation: .5s fade forwards linear;
}
/* .v-table__cbx-blink::before {
	content: '';
	position: absolute;
	width: 40px;
	height: 40px;
	background-color: var(--c-green-2);
	border-radius: 50%;
	animation: .35s blink forwards linear;
} */

/* @keyframes blink {
	0% {
		opacity: .5;
		transform: scale(0);
	}
	to {
		opacity: 0;
		transform: scale(1);
	}
} */

.btn-fade {
	animation: .8s fade forwards linear;
}

@keyframes fade {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
