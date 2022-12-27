<template>
	<div class="detailed_tit">
		<p>Date : {{ form.regDt }}</p>
		<h2>{{ form.title }}</h2>
		<p class="name">작성자: {{ form.regNm }}</p>
		<div class="click_btn button_wrap">
			<button @click="visible" class="like">
				<i
					class="fa-heart"
					:class="{
						'fa-solid': 'Y' === form.likeYn,
						'fa-regular': 'Y' !== form.likeYn,
					}"
					@click="changeLike"
				></i>
			</button>
		</div>
	</div>
	<div class="detailed_txt">
		<p>{{ form.contents }}</p>
	</div>
	<div class="detailed_btn_wrap">
		<button class="detailed_btn" @click="goListPage">목록</button>
		<button class="detailed_btn" @click="goEditPage">수정</button>
		<button class="detailed_btn" @click="deleteNoticeDetail">삭제</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { fetchNoticeDetail } from '@/api/notice.js';
import { deleteNotice, saveNotice } from '@/api/notice';
import { ref, toRef } from 'vue';

const props = defineProps({ id: [String, Number] });
const router = useRouter();

const id = toRef(props, 'id').value;
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
		likeYn,
		regDt,
		regId,
	}) => ({
		compCd,
		noticeNo,
		title,
		contents,
		noticeYn,
		likeYn,
		regDt,
		regId,
	}))(response.data.data);
	form.value = noticeInfo;
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

/** 좋아요 버튼 */
const changeLike = async () => {
	const keys = ['compCd', 'noticeNo', 'title', 'contents'];
	let strParam = keys.map(key => `${key}=${form.value[key]}`).join('&');
	strParam += '&newYn=N';
	strParam += `&likeYn=${form.value.likeYn !== 'Y' ? 'Y' : 'N'}`;

	await saveNotice(strParam);
	getNoticeDetail();
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
.click_btn {
	display: flex;
	justify-content: space-between;
}
.click_btn button i {
	transition: all 0.3s;
	font-size: 25px;
	margin-right: 30px;
}
.click_btn button i.fa-solid {
	color: rgb(216, 83, 127);
	animation: shakeHeart 0.5s ease-in-out forwards;
}
@keyframes shakeHeart {
	0% {
		transform: scale(1);
	}
	35% {
		transform: scale(1.2) rotate(10deg);
	}
	70% {
		transform: scale(1.2) rotate(-10deg);
	}
	100% {
		transform: scale(1);
	}
}
@media (max-width: 1000px) {
	.detailed_btn {
		margin-left: 0;
	}
}
</style>
