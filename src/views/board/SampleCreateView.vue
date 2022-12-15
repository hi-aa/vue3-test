<template>
	<h2>E-Order Notice Create</h2>
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
				@click="goListPage"
			>
				목록
			</button>
			<button class="btn btn-primary" @click="saveSampleDetail">저장</button>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { saveSample } from '@/api/sample';

const router = useRouter();
const form = ref({});

const goListPage = () => {
	router.push({
		name: 'SampleList',
	});
};

const saveSampleDetail = async () => {
	let strParam = Object.keys(form.value)
		.map(key => `${key}=${form.value[key]}`)
		.join('&');
	strParam += '&newYn=Y&compCd=5200';
	// console.log(strParam);

	const result = await saveSample(strParam);
	// console.log(result.data.data.noticeNo);
	alert(result.data.resultMessage);

	if (result.data.resultCode == 200) {
		router.push({
			name: 'SampleDetail',
			params: { id: result.data.data.noticeNo },
		});
	}
};
</script>

<style lang="scss" scoped></style>
