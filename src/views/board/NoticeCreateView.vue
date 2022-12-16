<template>
	<div class="inquiry_tit">
		<h1>의뢰나 요청, 문의 등을 자유롭게 남겨주세요.</h1>
	</div>
	<form @submit.prevent>
		<div class="inquiry_content">
			<div class="inputline">
				<div class="input_wrap">
					<label for="">제목 <span>*</span></label>
					<input
						type="text"
						class="block textbx"
						v-model.trim="form.title"
						required
					/>
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

			<div class="inputline brd_b">
				<div class="input_wrap">
					<input type="checkbox" id="ch1" v-model="checkAgree" />
					<label class="checklocation" for="ch1" id="fw_no">
						개인정보처리방침에 동의합니다. <span>(필수)</span>
					</label>
				</div>
			</div>
			<div class="inputline submitwrap">
				<button class="submit_btn" @click="saveNoticeDetail">저장</button>
				<button class="submit_btn" @click="goListPage">목록</button>
			</div>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { saveNotice } from '@/api/board.js';

const router = useRouter();
const form = ref({});
const checkAgree = ref(false);

const goListPage = () => {
	router.push({
		name: 'NoticeList',
	});
};

const saveNoticeDetail = async () => {
	const validCheck = () => {
		// if (!form.value.title) {
		// 	alert('제목은 필수값입니다');
		// 	return false;
		// }
		if (!form.value.contents) {
			alert('내용은 필수값입니다');
			return false;
		}
		if (!checkAgree.value) {
			alert('개인정보처리방침 동의가 필요합니다.');
			return false;
		}
		return true;
	};

	if (!validCheck()) {
		return;
	}

	let strParam = Object.keys(form.value)
		.map(key => `${key}=${form.value[key]}`)
		.join('&');
	strParam += '&newYn=Y&compCd=5200';

	const result = await saveNotice(strParam);
	// console.log(result.data.data.noticeNo);
	alert(result.data.resultMessage);

	if (result.data.resultCode == 200) {
		router.push({
			name: 'NoticeDetail',
			params: { id: result.data.data.noticeNo },
		});
	}
};
</script>

<style scoped>
.submit_btn {
	margin-right: 10px;
	transition: 0.3s;
}
</style>
