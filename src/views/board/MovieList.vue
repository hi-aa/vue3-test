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
			<div v-if="props.searchType === 'weekly'">
				<input type="radio" v-model="weekGb" id="weekGb0" value="0" />
				<label for="weekGb0">주간 (월~일)</label>
				<input type="radio" v-model="weekGb" id="weekGb1" value="1" />
				<label for="weekGb1">주말 (금~일)</label>
				<input type="radio" v-model="weekGb" id="weekGb2" value="2" />
				<label for="weekGb2">주중 (월~목)</label>
			</div>
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
import { fetchMovieDailyList, fetchMovieWeeklyList } from '@/api/movie';
import { ref, watchEffect } from 'vue';

const props = defineProps({
	searchType: {
		type: String,
		default: 'daily',
	},
});

// 조회
const searchTitle = ref(''); // 제목
const searchList = ref([]); // 목록

// search param
const getToday = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = '' + (today.getMonth() + 1);
	const day = '' + today.getDate();
	return year + month.padStart(2, '0') + day.padStart(2, '0');
};
const targetDt = ref(getToday());
const weekGb = ref(0);

const getSearchList = async () => {
	if (props.searchType === 'daily') {
		const response = await fetchMovieDailyList({ targetDt: targetDt.value });
		searchList.value = [...response.data.boxOfficeResult.dailyBoxOfficeList];
		searchTitle.value = response.data.boxOfficeResult.boxofficeType;
	} else {
		const response = await fetchMovieWeeklyList({
			targetDt: targetDt.value,
			weekGb: weekGb.value,
		});
		searchList.value = [...response.data.boxOfficeResult.weeklyBoxOfficeList];
		searchTitle.value = response.data.boxOfficeResult.boxofficeType;
		if (response.data.boxOfficeResult.showRange)
			searchTitle.value += ' (' + response.data.boxOfficeResult.showRange + ')';
	}
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
