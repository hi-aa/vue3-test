<template>
	<div class="pagination">
		<i
			class="fa-solid fa-chevron-left"
			:class="checkAcitveBeforeArrow() ? '' : 'disabled'"
			@click="checkAcitveBeforeArrow() ? changePage(props.nowPage - 1) : ''"
		>
		</i>
		<ol id="numbers">
			<li
				v-for="page in pageList"
				:key="page"
				class="pagenum"
				:class="page === props.nowPage ? 'active' : ''"
				@click="changePage(page)"
			>
				{{ page }}
			</li>
		</ol>
		<i
			class="fa-solid fa-chevron-right"
			:class="checkActiveAfterArrow() ? '' : 'disabled'"
			@click="checkActiveAfterArrow() ? changePage(props.nowPage + 1) : ''"
		>
		</i>
		<div class="bcb-wrap">
			<select v-model="rowCount" @change="changeRowCount(rowCount)">
				<!-- <option :value="3">3</option> -->
				<option :value="5">5</option>
				<option :value="10">10</option>
				<option :value="50">50</option>
			</select>
		</div>
	</div>
	<div>Total: {{ props.totalCount }}</div>
	<!-- <div>nowPage: {{ props.nowPage }}</div>
	<div>rowCount: {{ rowCount }}</div> -->
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
	totalCount: { type: Number, default: 0 }, // 총 목록 수
	nowPage: { type: Number, default: 1 }, // 현재 페이지
	// rowCount: { type: Number, default: 10 }, // 한 페이지에 표시할 목록 수
	pageBarCount: { type: Number, default: 5 }, // 페이지 버튼 표시 수
});
const emit = defineEmits(['changePage', 'changeRowCount']);

const rowCount = ref(5); // default row count
const totalPage = computed(() => {
	return Math.max(Math.round(props.totalCount / rowCount.value), 1);
});

/** 1. nowPage가 중간에 오도록 버튼 표시: pageBarCount는 홀수 */
const xxpageList = computed(() => {
	let pageCount = Math.min(props.pageBarCount, totalPage.value);
	let start = props.nowPage - Math.ceil((pageCount - 1) / 2);
	let end = props.nowPage + Math.ceil((pageCount - 1) / 2);

	if (totalPage.value < end) {
		let gap = end - totalPage.value;
		end = Math.min(end - gap, totalPage.value);
		start = Math.max(1, start - gap);
	} else if (start < 1) {
		let gap = 1 - start;
		end = Math.min(end + gap, totalPage.value);
		start = Math.max(start + gap, 1);
	}
	console.log({ start, end });
	return Array.from({ length: end - start + 1 }, (_, i) => i + start);
});

/** 2. 10개(pageBarCount)단위로 버튼 표시 */
const pageList = computed(() => {
	let pageCount = Math.min(props.pageBarCount, totalPage.value);
	let start = 0;
	let end = 0;
	if (props.nowPage <= pageCount) {
		start = 1;
		end = pageCount;
	} else {
		start =
			Math.floor((props.nowPage - 1) / props.pageBarCount) *
				props.pageBarCount +
			1;
		end = Math.min(start + props.pageBarCount - 1, totalPage.value);
	}
	// console.log({ start, end });
	return Array.from({ length: end - start + 1 }, (_, i) => i + start);
});

/** < 버튼 활성화 체크 */
const checkAcitveBeforeArrow = () => {
	return props.nowPage > 1;
};
/** > 버튼 활성화 체크 */
const checkActiveAfterArrow = () => {
	return props.nowPage < totalPage.value;
};

const changePage = (page = 1) => {
	emit('changePage', page);
};

const changeRowCount = count => {
	emit('changeRowCount', count);
};
</script>

<style>
.pagination {
	width: 100%;
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.pagination i.fa-solid {
	font-size: 20px;
	color: rgb(90, 90, 90);
	padding: 5px 15px;
	cursor: pointer;
}
.pagination i.disabled {
	color: #ccc;
	cursor: default;
}
.pagination ol#numbers {
	display: flex;
	justify-content: center;
}
.pagination ol#numbers li.pagenum {
	padding: 5px 15px;
	font-size: 20px;
	font-family: 'Pretendard';
	cursor: pointer;
}
.pagination ol#numbers li.pagenum.active {
	color: rgb(185, 24, 40);
}
.btn_wrap {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
}
.write_btn {
	background: #000;
	color: #fff;
	font-family: 'Pretendard';
	font-size: 16px;
	padding: 15px 25px;
	transition: 0.3s;
}
.write_btn:hover {
	background: rgb(185, 24, 40);
}
@media (max-width: 1000px) {
	.write_btn {
		width: 100%;
	}
}
</style>
