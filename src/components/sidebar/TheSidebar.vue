<template>
	<aside class="sidebar">
		<h5 class="sidebar__nav-title"><img class="sidebar__nav-logo" src="../../../public/favicon.png" alt="DWS logo"> Menu</h5>
		<ul class="sidebar__nav">
			<router-link
				v-for="(el, idx) in items"
				:key="idx"
				:to="el.link"
				tag="li"
				exact
				:class="{'router-link-active': isActiveLink(el.link)}"
				class="sidebar__nav-item">
				{{el.name}}
			</router-link>
		</ul>
	</aside>
</template>

<script>
import routesList from '@/router/routesList';

export default {
	name: 'TheSidebar',
	data: () => ({
		items: [
			{name: 'Servers', link: routesList.servers.path},
			{name: 'Provider', link: routesList.provider.main.path},
			{name: 'Provider Types', link: routesList.provider.types.path},
			{name: 'Provider Accounts', link: routesList.provider.account.path},
			{name: 'Domain', link: routesList.domains.main.path},
			{name: 'Record Types', link: routesList.domains.recordTypes.path},
			{name: 'DNS Reconfiguration', link: routesList.domains.DnsReconfig.path},
			{name: 'DNS Reconfiguration Statuses', link: routesList.domains.DnsReconfigStatuses.path},
			{name: 'Greenlisting', link: routesList.domains.greenlistingTransfer.path},
			{name: 'Safety Checking', link: routesList.domains.safetyCheckingTransfer.path},
			{name: 'Safety Checking Statuses', link: routesList.domains.safetyCheckingStatuses.path},
			{name: 'Safety Checking History', link: routesList.domains.safetyCheckingHistory.path},
			{name: 'Rotation Voluum', link: routesList.domains.rotationVoluumTransfer.path},
			{name: 'Resources', link: routesList.trackerResource.main.path},
			{name: 'Resource Types', link: routesList.trackerResource.types.path}
		]
	}),
	methods: {
		isActiveLink (url) {
			return this.$route.path === url;
		}
	}
};
</script>

<style>
.sidebar {
	background-color: #061634;
}
.sidebar__nav-title {
	display: flex;
	align-items: center;
	padding: 10px 0 0 20px;
	font-size: 14px;
	color: #e2e3e7;
	user-select: none;
	text-transform: uppercase;
}
.sidebar__nav-logo {
	margin-right: 10px;
	user-select: none;
}
.sidebar__nav {
	margin: 10px auto;
	padding: 0 10px;
}
.sidebar__nav-item {
	display: block;
	padding: 9px;
	margin: 2px auto;
	font-size: 13px;
	color: #a4a5a8;
	cursor: pointer;
	border-radius: 3px;
	user-select: none;
	transition: all .35s;
}
.sidebar__nav-item:hover {
	background-color: rgba(20,101,239, .6);
	color: #E7E7E7;
}

.router-link-active,
.router-link-active:hover {
	background-color: #1465ef;
	color: #fff;
}
</style>
