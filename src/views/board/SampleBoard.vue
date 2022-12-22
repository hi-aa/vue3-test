<template>
	<div>
		<h2 class="list-header">{{ searchTitle }}</h2>
		<div>
			<v-date-picker
				v-model="targetDt"
				color="red"
				:model-config="{ type: 'string', mask: 'YYYYMMDD' }"
				is-required
			/>
		</div>

		<div v-show="searchList !== null && searchList.length > 0">
			<div class="card-wrap">
				<CardContent
					v-for="(item, index) in searchList"
					:key="index"
					@click="selectCard(item.rnum)"
					:is-selected="selectedCard === item.rnum"
				>
					<template #title>
						{{ item.rankOldAndNew === 'NEW' ? 'NEW /' : '' }} {{ item.movieNm }}
					</template>
					<template #rank>{{ item.rank }}</template>
					<template #contents>
						<p>금일 관객수: {{ item.audiCnt }}</p>
						<p>전일대비 관객수 증감: {{ item.audiInten }}</p>
						<p>누적 매출액: {{ item.salesAcc }}</p>
						<p>누적 관객수: {{ item.audiAcc }}</p>
					</template>
					<template #regnm>{{ item.boxofficeType }}</template>
					<template #regdt>{{ item.openDt }}</template>
					<template #hitcnt>금일 상영횟수: {{ item.showCnt }}</template>
				</CardContent>
			</div>
		</div>

		<div v-show="searchList === null || searchList.length === 0">No Data</div>
	</div>
</template>

<script setup>
import CardContent from '@/components/board/CardContent.vue';
import { fetchMovieList } from '@/api/movie';
import { ref, watchEffect } from 'vue';

// floating button
import { useFloatingButton } from '@/hooks/floatingButton';
useFloatingButton({
	setShow: true,
	setIcon: 'up',
	clickEventFunc: () => {
		console.log('position top');
		window.scrollTo(0, 0);
	},
});

// 조회
const searchTitle = ref(''); // 제목
const searchList = ref([]); // 목록

const getToday = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = '' + (today.getMonth() + 1);
	const day = '' + today.getDate();
	return year + month.padStart(2, '0') + day.padStart(2, '0');
};
const targetDt = ref(getToday()); // search param

const getSearchList = async () => {
	const response = await fetchMovieList({ targetDt: targetDt.value });
	searchList.value = [...response.data.boxOfficeResult.dailyBoxOfficeList];
	searchTitle.value = response.data.boxOfficeResult.boxofficeType;
};
watchEffect(getSearchList);

// 카드 선택
const selectedCard = ref(0);

const selectCard = async selected => {
	if (selectedCard.value === selected) {
		selectedCard.value = 0;
	} else {
		selectedCard.value = selected;
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
.list-header {
	margin: 20px;
	text-align: center;
}
</style>
