<template>
	<div class="flex justify-center w-screen h-screen overflow-x-hidden bg-white dark:bg-trueGray-900">
		<div class="flex flex-col w-full h-full max-w-full lg:max-w-6xl">
			<Header />
			<div class="flex-grow mt-2 mb-6">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Home from './pages/Home.vue';
import Card from './components/Card.vue';
import 'tailwindcss/tailwind.css';

@Component({
	components: {
		Header,
		Home,
		Card,
	},
})
export default class App extends Vue {
}
</script>
