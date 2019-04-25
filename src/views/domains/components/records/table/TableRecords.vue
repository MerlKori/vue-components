<template>
<div>
	<VueTable
		@reset-cbx="mixin_resetCheckboxData"
		:scheme="scheme"
		:data="getTableData"
		:withActions="true">

		<template slot="table-control-panel">
			<Tooltip
				content="Create new element"
				placement="bottom">
				<button
					@click="mixin_showDlgCreate()"
					:disabled="disableCreateBtn"
					class="btn-small mx-1 btn--blue-2 icon-plus"></button>
			</Tooltip>
			<Tooltip
				content="Remove all selected"
				placement="bottom">
				<button
					:disabled="actionDeleteAllIsDisable"
					class="btn-small btn--red-2 icon-trash mx-1"></button>
					<!-- @click="mixin_showDlgDeleteAll()" -->
			</Tooltip>
		</template>

		<VueCheckbox
			slot="header-checkbox"
			v-model="mixin_toggleAllCeckboxes"
			:disabled="mixin_checkboxIsDisable"
			class="v-table-cell--sticky-left"
		/>

		<TableBodyCheckbox
			slot="row-checkbox"
			slot-scope="{row}"
			@select="mixin_select(row.id)"
			@deselect="mixin_deselect(row.id)"
			:checked="mixin_isChecked(row.id)"
			class="v-table-cell--sticky-left"
		/>
		<template
			slot="row-buttons"
			slot-scope="{row}">
			<TableBtns
				@click.native="mixin_showDlgEdit(row)"
				:type="BTNS_LIST.edit" />
			<TableBtns
				:type="BTNS_LIST.delete" />
		</template>

		<!-- TABLE FOOTER -->
		<TableFooterInfo
			slot="table-footer"
			class="ml-4"
			:selectedCount="mixin_checkbox.list.length" />
	</VueTable>

	<!-- DIALOGS -->
	<TableDlgWrapper
		@close-dlg="mixin_hideDlg"
		:visibility="dlg.visibility">
		<RecordsDlgMiddleware
			@close-dlg="mixin_hideDlg"
			@save="handlerDlgEvent"
			:sharedGroups="sharedGroups"
			:dlgData="dlg"
			:dlgStyle="scheme.style.forms"/>
	</TableDlgWrapper>
</div>
</template>

<script src="./table-records.js" ></script>
