<template>
	<h2>E-Order Notice Modify</h2>
	<hr class="ay-4" />
	<form @submit.prevent>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input type="text" class="form-control" id="title" v-model="form.title" />
		</div>
		<div class="mb-3">
			<label for="content" class="form-label">내용</label>
			<textarea
				class="form-control"
				id="content"
				rows="3"
				v-model="form.contents"
			></textarea>
		</div>
		<div class="pt-4">
			<button
				type="button"
				class="btn btn-outline-dark me-2"
				@click="goSampleDetail"
			>
				취소
			</button>
			<button class="btn btn-primary" @click="saveSampleDetail">저장</button>
		</div>
	</form>
</template>

<script setup>
import { getSample, saveSample } from '@/api/sample';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({});

/* 상세 조회 */
const fetchSampleDetail = async () => {
	const response = await getSample(id);
	const sampleDetail = (({
		compCd,
		noticeNo,
		title,
		contents,
		noticeYn,
		regDt,
	}) => ({
		compCd,
		noticeNo,
		title,
		contents,
		noticeYn,
		regDt,
	}))(response.data.data);
	form.value = sampleDetail;
};
fetchSampleDetail();

/* 상세 이동 */
const goSampleDetail = () => {
	router.push({
		name: 'SampleDetail',
		params: { id },
	});
};
/* 저장 버튼 */
const saveSampleDetail = async () => {
	let strParam = Object.keys(form.value)
		.map(key => `${key}=${form.value[key]}`)
		.join('&');
	console.log(strParam);
	strParam += '&newYn=N';

	const result = await saveSample(strParam);
	// console.log(result);
	alert(result.data.resultMessage);

	if (result.data.resultCode == 200) {
		goSampleDetail();
	}
};
</script>

<style lang="scss" scoped></style>
