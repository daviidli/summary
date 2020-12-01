import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export enum Routes {
	Home = '/',
	Result = '/summary/',
	Any = '/*/'
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
	{
		path: `${Routes.Any}`,
		name: 'Any',
		component: () => import('../pages/Any.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
