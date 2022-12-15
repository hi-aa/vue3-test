<template>
	<div class="content_inner">
		<!-- 목록 -->
		<ul id="list">
			<li class="loop_list" v-for="notice in noticeList" :key="notice.noticeNo">
				<listContent @click="goPage">
					<template #title>{{ notice.title }}</template>
					<template #contents>{{ notice.contents }}</template>
					<template #day>{{ notice.regDt }}</template>
					<template #hitCnt>{{ notice.hitCnt }}</template>
				</listContent>
			</li>
		</ul>
		<!-- 페이징 -->
		<ThePagination
			:total-page="totalPage"
			:now-page="nowPage"
			@change-page="changePage"
		></ThePagination>
		<!-- :row-count="rowCount" -->
		<!-- 글쓰기 -->
	</div>
	<!-- <div>
		<h2>
			<span>E-Order Notice</span>
			<button class="btn btn-outline-success" type="button">
				<RouterLink to="/board/sample/create" class="nav-link">
					글쓰기
				</RouterLink>
			</button>
		</h2>

		<hr class="ay-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.noticeNo" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.contents"
					:created-at="post.regDt"
					@click="goPage(post.noticeNo)"
				></PostItem>
			</div>
		</div>
	</div> -->
</template>

<script setup>
import ListContent from '@/components/board/ListContent.vue';
import ThePagination from '@/components/board/ThePagination.vue';
// import PostItem from '@/components/list/PostItem.vue';
// import PostDetailView from '@/views/posts/PostDetailView.vue';
// import AppCard from '@/components/AppCard.vue';
// import { getNoticeList } from '@/api/sample.js';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const noticeList = ref([
	{
		title: 'aa',
		contents: 'test contents',
		noticeNo: 1,
		hitCnt: 2,
		regDt: '2022-11-22',
	},
]);
const listCount = ref(1);
const nowPage = ref(1);
const rowCount = 10;
const totalPage = computed(() => {
	return Math.max(Math.round(listCount.value / rowCount), 1);
});

// const fetchNotices = async (page = 1) => {
// 	// search 실행
// 	nowPage.value = page;
// 	const startRow = (nowPage.value - 1) * rowCount + 1;
// 	const params = { startRow: startRow, endRow: startRow + 9 };
// 	const { data } = await getNoticeList(params);
// 	console.dir(data.data);

// 	// 목록
// 	noticeList.value = data.data.list.map(item => {
// 		return (({
// 			compCd,
// 			noticeNo,
// 			title,
// 			contents,
// 			noticeYn,
// 			hitCnt,
// 			regDt,
// 		}) => ({
// 			compCd,
// 			noticeNo,
// 			title,
// 			contents,
// 			noticeYn,
// 			hitCnt,
// 			regDt,
// 		}))(item);
// 	});
// 	// 목록 수
// 	listCount.value = data.data.totCnt;
// };
// fetchNotices();

const router = useRouter();
const goPage = id => {
	// 1. 그냥 url 입력해서 이동하는 방법
	// router.push(`/posts/${id}`);

	// 2. 객체 파라메터로 이동하는 방법
	router.push({
		name: 'SampleDetail', // 이름을 가지는 라우트
		params: {
			id,
		},
	});
};

const changePage = page => {
	console.log(page);
};
</script>

<style>
.pagination {
	width: 100%;
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.pagination i.fa-solid {
	font-size: 20px;
	color: rgb(90, 90, 90);
	padding: 5px 15px;
}
.pagination ol#numbers {
	display: flex;
	justify-content: center;
}
.pagination ol#numbers li.pagenum {
	padding: 5px 15px;
	font-size: 20px;
	font-family: 'Pretendard';
	cursor: pointer;
}
.pagination ol#numbers li.pagenum.active {
	color: rgb(185, 24, 40);
}
.btn_wrap {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
}
.write_btn {
	background: #000;
	color: #fff;
	font-family: 'Pretendard';
	font-size: 16px;
	padding: 15px 25px;
	transition: 0.3s;
}
.write_btn:hover {
	background: rgb(185, 24, 40);
}
@media (max-width: 1000px) {
	.write_btn {
		width: 100%;
	}
}
</style>
