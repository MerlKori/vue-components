<template>
	<button class="btn btn--blue-2">
		<font-awesome-icon :icon="faPlus" size="xs" />
		create new
	</button>
</template>

<script>
import {faPlus} from '@fortawesome/free-solid-svg-icons';

export default {
	name: 'Table_Footer_BtnShowDLGCreate',
	data: () => ({
		faPlus
	})
};
</script>
