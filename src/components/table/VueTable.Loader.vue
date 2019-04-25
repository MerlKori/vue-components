<template>
	<div class="v-table-loader">
		<div class="v-table-loader__spinner-wrapp">
			<svg
				viewBox="25 25 50 50"
				class="v-table-loader__spinner">
				<circle
					cx="50"
					cy="50"
					r="20"
					fill="none"
					class="v-table-loader__spinner-path">
				</circle>
			</svg>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Vue_Table_Loader'
};
</script>

<style>
.v-table-loader {
	background-color: #fff;
}
.v-table-loader__spinner-wrapp {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 50px;
	height: 50px;
	transform: translate(-50%, -50%);
}

.v-table-loader__spinner {
	animation: loading-rotate 1.5s linear infinite;
}

@keyframes loading-rotate {
	100% {
		transform: rotate(1turn);
	}
}

.v-table-loader__spinner-path {
	animation: loading-dash 1s ease-in-out infinite;
	stroke-dasharray: 90,150;
	stroke-dashoffset: 0;
	stroke-width: 2;
	stroke: #409eff;
	stroke-linecap: round;
}

@keyframes loading-dash{
	0%{
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset:-40px;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset:-120px
	}
}
</style>
