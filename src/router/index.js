import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFound from '@/components/error/NotFound.vue';
import BoardView from '@/views/board/BoardView.vue';

import NoticeList from '@/views/board/NoticeListView.vue';
import NoticeDetail from '@/views/board/NoticeDetailView.vue';
import NoticeEdit from '@/views/board/NoticeEditView.vue';
import NoticeCreate from '@/views/board/NoticeCreateView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomeView,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFound,
		},
		{
			path: '/board',
			name: 'BoardView',
			component: BoardView,
			redirect: '/board/notice', // default 표시
			children: [
				{
					path: 'notice',
					name: 'NoticeList',
					component: NoticeList,
				},
				{
					path: 'notice/:id',
					name: 'NoticeDetail',
					component: NoticeDetail,
				},
				{
					path: 'notice/:id/edit',
					name: 'NoticeEdit',
					component: NoticeEdit,
				},
				{
					path: 'notice/create',
					name: 'NoticeCreate',
					component: NoticeCreate,
				},
			],
		},
	],
});

export default router;
