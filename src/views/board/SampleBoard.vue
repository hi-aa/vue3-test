<template>
	<div>
		<form @submit.prevent="saveTodo">
			<table>
				<colgroup>
					<col width="120px;" />
					<col />
					<col width="120px;" />
					<col />
					<col width="120px;" />
				</colgroup>
				<tr>
					<th>제목</th>
					<td>
						<input
							type="text"
							class="block"
							v-model.trim="form.title"
							required
						/>
					</td>
					<th>내용</th>
					<td>
						<input
							type="text"
							class="block"
							v-model.trim="form.contents"
							required
						/>
					</td>
					<td>
						<div class="sample_btn_wrap">
							<button class="btn">저장</button>
						</div>
					</td>
				</tr>
			</table>
		</form>
		<hr />
		<div class="card-wrap">
			<CardContent
				v-for="(notice, index) in noticeList"
				:key="index"
				@click="selectCard(notice.noticeNo)"
				:is-selected="selectedNo === notice.noticeNo"
			>
				<template #title>{{ notice.title }}</template>
				<template #contents>{{ notice.contents }}</template>
				<template #regnm>{{ notice.regNm }}</template>
				<template #regdt>{{ notice.regDt }}</template>
				<template #hitcnt>{{ notice.hitCnt }}</template>
			</CardContent>
		</div>
	</div>
	<div style="margin-top: 30px">
		<button
			class="block btn"
			v-if="listCount > params.endRow"
			@click="params.endRow += 4"
		>
			더보기 (Total {{ listCount }})
		</button>
	</div>
</template>

<script setup>
import CardContent from '@/components/board/CardContent.vue';
import { fetchNoticeDetail, saveNotice } from '@/api/board';
import { ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';

import { useFloatingButton } from '@/hooks/floatingButton';
useFloatingButton({
	setShow: true,
	setIcon: 'up',
	clickEventFunc: () => {
		console.log('position top');
		window.scrollTo(0, 0);
	},
});

const store = useStore();

const noticeList = computed(() => store.state.notice.items);
const listCount = computed(() => store.state.notice.count);

// 검색조건
const params = ref({
	startRow: 1,
	endRow: 8,
});
// 등록/수정
const form = ref({});
// selected card
const selectedNo = ref(0);

// search list
const searchNoticeList = () => {
	store.dispatch('notice/getNoticeList', params.value);
};
watchEffect(searchNoticeList);

const selectCard = async noticeNo => {
	if (selectedNo.value === noticeNo) {
		selectedNo.value = 0;
		form.value = {};
	} else {
		selectedNo.value = noticeNo;

		// 상세 조회
		const response = await fetchNoticeDetail(noticeNo);
		form.value = (({ compCd, noticeNo, title, contents }) => ({
			compCd,
			noticeNo,
			title,
			contents,
		}))({ ...response.data.data });
	}
};

// 등록, 수정
const saveTodo = async () => {
	let strParam = Object.keys(form.value)
		.map(key => `${key}=${form.value[key]}`)
		.join('&');
	strParam += form.value.noticeNo === 0 ? '&newYn=Y' : '&newYn=N';

	const result = await saveNotice(strParam);
	alert(result.data.resultMessage);
	if (result.data.resultCode == 200) {
		searchNoticeList();
	}
};
</script>

<style scoped>
table {
	margin: 10px auto;
}
.sample_btn_wrap {
	display: flex;
	justify-content: center;
}
.card-wrap {
	align-content: center;
}
</style>
