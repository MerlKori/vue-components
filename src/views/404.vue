<template>
	<div class="page-404">
		<div class="page-404__image">
			<img src="../assets/images/ufo.png" width="100%">
			<div class="ufo-animate">
				<div class="stripe"></div>
			</div>
		</div>
		<div class="page-404__info">
			<p class="page-404__info_title">404</p>
			<p>Page not found</p>
			<router-link tag="button" :to="routesList.provider.main" class="btn btn--primary">Home</router-link>
		</div>
	</div>
</template>

<script>
import routesList from '@/router/routesList';

export default {
	name: 'Page404',
	data: () => ({
		routesList
	})
};
</script>

<style>
@keyframes go {
	0%   {
		background-position: 0%
	}
	100% {
		background-position: 100%
	}
	0% {
		background-position: 0%
	}
}
.page-404 {
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	min-height: 100%;
	width: 100%;
}
.page-404__image {
	position: relative;
	max-width: 400px;
	margin: 0 auto 30px;
}
.ufo-animate {
	position: absolute;
	left: 0;
	top: 130px;
	height: 22px;
	width: 100%;
	overflow: hidden;
}
.stripe {
	animation: go 4s linear infinite;
	position: absolute;
	left: 0;
	background-image: linear-gradient(to right, #409eff 50%, transparent 50%);
	background-repeat: repeat-x;
	background-size: 40px;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-around;
}
.dot {
	height: 20px;
	width: 20px;
	background-color: #409eff;
}
.page-404__info {
	width: 100%;
	text-align: center;
	font-size: 30px;
}
.page-404__info_title {
	font-size: 4em;
	width: 100%;
	text-align: center;
}
</style>
