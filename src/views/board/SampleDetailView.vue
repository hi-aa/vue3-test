<template>
	<h2>{{ form.title }}</h2>
	<p>{{ form.contents }}</p>
	<p class="text-muted">{{ form.regDt }}</p>
	<hr class="ay-4" />
	<div class="row g-2">
		<div class="col-auto me-auto"></div>
		<div class="col-auto">
			<button class="btn btn-outline-dark" @click="goListPage">목록</button>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-primary" @click="goEditPage">수정</button>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-danger" @click="deleteSampleDetail">
				삭제
			</button>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getSample, deleteSample } from '@/api/sample.js';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({});

/* 상세 조회 */
const fetchSampleDetail = async () => {
	const response = await getSample(id);
	// console.log(response.data.data);
	form.value = { ...response.data.data }; // 객체 복사해서 대입
};
fetchSampleDetail();

/* 목록 이동 */
const goListPage = () => {
	router.push('/board/sample/list');
};
/* 수정 이동 */
const goEditPage = () => {
	router.push(`/board/sample/${id}/edit`);
};
/* 삭제 */
const deleteSampleDetail = async () => {
	const response = await deleteSample(id);
	alert(response.data.resultMessage);
	if (response.data.resultCode === 200) {
		goListPage();
	}
};
</script>

<style lang="scss" scoped></style>
