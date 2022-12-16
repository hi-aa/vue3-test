<template>
	<div class="detailed_tit">
		<p>Date : {{ form.regDt }}</p>
		<h2>{{ form.title }}</h2>
		<p class="name">작성자: {{ form.regId }}</p>
	</div>
	<div class="detailed_txt">
		<p>{{ form.contents }}</p>
	</div>
	<div class="detailed_btn_wrap">
		<button class="detailed_btn" @click="goListPage">목록</button>
		<button class="detailed_btn" @click="goEditPage">수정</button>
		<button class="detailed_btn" @click="deleteNoticeDetail">삭제</button>
	</div>
	<!-- <div v-for="no in noticeList" :key="no.noticeNo">{{ no }}</div> -->
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
// import { fetchNoticeDetail } from '@/api/board.js';
import { deleteNotice } from '@/api/board.js';
import { computed } from 'vue';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();
// const noticeList = computed(() => store.state.notice.items);
// console.log(noticeList);

const id = route.params.id;
// const form = ref({});
const form = computed(() => {
	return store.state.notice.item;
});

/* 상세 조회 */
const getNoticeDetail = async () => {
	// const response = await fetchNoticeDetail(id);
	// // console.log(response.data.data);
	// form.value = { ...response.data.data }; // 객체 복사해서 대입

	store.dispatch('notice/getNotice', id);
};
getNoticeDetail();

/* 목록 이동 */
const goListPage = () => {
	router.push({ name: 'NoticeList' });
};
/* 수정 이동 */
const goEditPage = () => {
	router.push({ name: 'NoticeEdit', params: { id } });
};
/* 삭제 */
const deleteNoticeDetail = async () => {
	const response = await deleteNotice(id);
	alert(response.data.resultMessage);
	if (response.data.resultCode === 200) {
		goListPage();
	}
};
</script>

<style scoped>
.detailed_btn {
	margin: 0 10px;
}
.detailed_tit .name {
	/* margin-top: 10px; */
	font-weight: 600;
}
</style>
