import { createRouter, createWebHistory } from 'vue-router';
// 공통
import HomeView from '../views/HomeView.vue';
import NotFound from '@/components/error/NotFound.vue';
// 게시판 공통
import BoardView from '@/views/board/BoardView.vue';
// 공지사항
import NoticeList from '@/views/board/NoticeListView.vue';
import NoticeDetail from '@/views/board/NoticeDetailView.vue';
import NoticeEdit from '@/views/board/NoticeEditView.vue';
import NoticeCreate from '@/views/board/NoticeCreateView.vue';
// 게시판
import SampleBoard from '@/views/board/SampleBoard.vue';

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
				{
					path: 'sample',
					name: 'SampleBoard',
					component: SampleBoard,
				},
			],
		},
	],
});

export default router;
