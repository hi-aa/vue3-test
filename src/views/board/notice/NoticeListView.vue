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
				<ListContent @click="goNoticeDetail(notice.noticeNo)">
					<template #title>{{ notice.title }}</template>
					<template #contents>{{ notice.contents }}</template>
					<template #day>{{ notice.regDt }}</template>
					<template #hitCnt>{{ notice.hitCnt }}</template>
				</ListContent>
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
		@change-page="changePage"
		@change-row-count="changeRowCount"
	></ThePagination>
</template>

<script setup>
import ListContent from '@/components/board/ListContent.vue';
import ThePagination from '@/components/board/ThePagination.vue';
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useFloatingButton } from '@/hooks/floatingButton';
import { useNoticeStore } from '@/store/notice';

const router = useRouter();
const store = useNoticeStore();

// 변수
const noticeList = computed(() => store.items);
const listCount = computed(() => store.count);
const rowCount = ref(5);
const nowPage = ref(1);
const schTitle = ref('');

useFloatingButton({
	setShow: true,
	setIcon: 'plus',
	clickEventFunc: () => {
		console.log('plus!');
	},
});

// search 실행
const searchNoticeList = (page = 1) => {
	try {
		nowPage.value = page;
		const startRow = (nowPage.value - 1) * rowCount.value + 1;
		const params = {
			startRow: startRow,
			endRow: startRow + rowCount.value - 1,
			schTitle: schTitle.value,
		};

		store.getNoticeList(params);
	} catch (error) {
		console.log(error);
	}
};

watchEffect(() => {
	searchNoticeList(nowPage.value);
});

/** 상세 페이지 이동 */
const goNoticeDetail = id => {
	router.push({
		name: 'NoticeDetail', // 이름을 가지는 라우트
		params: {
			id,
		},
	});
};

/** 페이지 변경 */
const changePage = page => {
	nowPage.value = page;
};

/** rowCount 변경 */
const changeRowCount = count => {
	rowCount.value = count;
	nowPage.value = 1;
};
</script>
