<template>
	<div class="inquiry_tit">
		<span class="search_bx">
			<input
				type="text"
				class="search"
				placeholder="검색어를 입력해 주세요"
				v-model="schTitle"
				@keyup.enter="getNoticeList(1)"
			/>
			<span @click="getNoticeList(1)">
				<i class="search_icon"></i>
			</span>
		</span>
	</div>
	<div class="content_inner">
		<!-- 목록 -->
		<ul id="list">
			<li class="loop_list" v-for="notice in noticeList" :key="notice.noticeNo">
				<listContent @click="goNoticeDetail(notice.noticeNo)">
					<template #title>{{ notice.title }}</template>
					<template #contents>{{ notice.contents }}</template>
					<template #day>{{ notice.regDt }}</template>
					<template #hitCnt>{{ notice.hitCnt }}</template>
				</listContent>
			</li>
		</ul>
	</div>
	<!-- 글쓰기 -->
	<div class="btn_wrap">
		<button class="write_btn" @click="$router.push({ name: 'NoticeCreate' })">
			글쓰기
		</button>
	</div>
	<!-- 페이징 -->
	<ThePagination
		:total-count="listCount"
		:now-page="nowPage"
		:row-count="rowCount"
		@change-page="changePage"
	></ThePagination>
</template>

<script setup>
import ListContent from '@/components/board/ListContent.vue';
import ThePagination from '@/components/board/ThePagination.vue';
import { fetchNoticeList } from '@/api/board.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 변수 // TODO: store 옮기기
const noticeList = ref([]);
const listCount = ref(1);
const nowPage = ref(1);
const rowCount = 10;
const schTitle = ref('');

// search 실행
const getNoticeList = async (page = 1) => {
	nowPage.value = page;
	const startRow = (nowPage.value - 1) * rowCount + 1;
	const params = {
		startRow: startRow,
		endRow: startRow + 9,
		schTitle: schTitle.value,
	};
	const { data } = await fetchNoticeList(params);
	// console.dir(data.data);

	// 목록
	noticeList.value = data.data.list.map(item => {
		return (({
			compCd,
			noticeNo,
			title,
			contents,
			noticeYn,
			hitCnt,
			regDt,
		}) => ({
			compCd,
			noticeNo,
			title,
			contents,
			noticeYn,
			hitCnt,
			regDt,
		}))(item);
	});
	// 목록 수
	listCount.value = data.data.totCnt;
};
getNoticeList(1);

/** 상세 페이지 이동 */
const goNoticeDetail = id => {
	// 1. 그냥 url 입력해서 이동하는 방법
	// router.push(`/posts/${id}`);

	// 2. 객체 파라메터로 이동하는 방법
	router.push({
		name: 'NoticeDetail', // 이름을 가지는 라우트
		params: {
			id,
		},
	});
};

/** 페이지 변경 */
const changePage = page => {
	getNoticeList(page);
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
