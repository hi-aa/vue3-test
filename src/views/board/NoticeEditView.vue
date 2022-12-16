<template>
	<!-- <div class="inquiry_tit">
		<h1>수정내용을 입력하세요</h1>
	</div> -->
	<div class="inquiry_content">
		<div class="inputline">
			<div class="input_wrap">
				<label for="">제목 <span>*</span></label>
				<input type="text" class="block textbx" v-model="form.title" />
			</div>
		</div>
		<div class="inputline">
			<div class="input_wrap">
				<label for="">내용 <span>*</span></label>
				<textarea
					v-model="form.contents"
					cols="20"
					rows="10"
					class="block"
					placeholder="내용을 입력해 주세요."
				></textarea>
			</div>
		</div>
		<div class="inputline submitwrap">
			<button class="submit_btn" @click="saveNoticeDetail">수정</button>
			<button class="submit_btn" @click="goNoticeDetail">취소</button>
		</div>
	</div>
</template>

<script setup>
import { fetchNoticeDetail, saveNotice } from '@/api/board.js';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({});

/* 상세 조회 */
const getNoticeDetail = async () => {
	const response = await fetchNoticeDetail(id);
	const noticeInfo = (({
		compCd,
		noticeNo,
		title,
		contents,
		noticeYn,
		regDt,
		regId,
	}) => ({
		compCd,
		noticeNo,
		title,
		contents,
		noticeYn,
		regDt,
		regId,
	}))(response.data.data);
	form.value = noticeInfo;
};
getNoticeDetail();

/* 상세 이동 */
const goNoticeDetail = () => {
	router.push({
		name: 'NoticeDetail',
		params: { id },
	});
};
/* 저장 버튼 */
const saveNoticeDetail = async () => {
	let strParam = Object.keys(form.value)
		.map(key => `${key}=${form.value[key]}`)
		.join('&');
	strParam += '&newYn=N';

	const result = await saveNotice(strParam);
	alert(result.data.resultMessage);

	if (result.data.resultCode == 200) {
		goNoticeDetail();
	}
};
</script>

<style scoped>
.submit_btn {
	margin-right: 10px;
	transition: 0.3s;
}
</style>
