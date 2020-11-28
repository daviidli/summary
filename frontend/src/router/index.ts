import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export enum Routes {
	Home = '/',
	Result = '/summary/'
}

const routes: Array<RouteConfig> = [
	{
		path: Routes.Home,
		name: 'Home',
		component: () => import('../pages/Home.vue'),
	},
	{
		path: `${Routes.Result}`,
		name: 'Result',
		component: () => import('../pages/Results.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
