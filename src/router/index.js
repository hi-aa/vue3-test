import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
// import NotFound from '@/components/error/NotFound.vue';
// import BoardView from '@/views/board/BoardView.vue';

// import SampleList from '@/views/board/SampleListView.vue';
// import SampleDetail from '@/views/board/SampleDetailView.vue';
// import SampleEdit from '@/views/board/SampleEditView.vue';
// import SampleCreate from '@/views/board/SampleCreateView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: '/',
		// 	name: 'Home',
		// 	component: HomeView,
		// },
		// {
		// 	path: '/:pathMatch(.*)*',
		// 	name: 'NotFound',
		// 	component: NotFound,
		// },
		// {
		// 	path: '/boardView',
		// 	name: 'BoardView',
		// 	component: BoardView,
		// 	children: [
		// 		{
		// 			path: '/board/notice',
		// 			// alias: '/board/notice',
		// 			name: 'SampleList',
		// 			component: SampleList,
		// 		},
		// 	],
		// },
	],
});

export default router;
