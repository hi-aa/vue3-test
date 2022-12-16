<template>
	<div class="pagination">
		<i
			class="fa-solid fa-chevron-left"
			@click="props.nowPage > 1 ? changePage(props.nowPage - 1) : ''"
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
			@click="props.nowPage < totalPage ? changePage(props.nowPage + 1) : ''"
		>
		</i>

		<div class="bcb-wrap">
			<!-- <p class="breadcrumb">{{ rowValue }}</p>
			<div class="snb-sbox">
				<ul class="slide-wrap">
					<li @click="clickSelect($event)">5</li>
					<li @click="clickSelect($event)">10</li>
					<li @click="clickSelect($event)">15</li>
				</ul>
			</div> -->
			<select v-model="rowCount" @change="changeRowCount(rowCount)">
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="50">50</option>
			</select>
		</div>
	</div>
	<div>Total: {{ props.totalCount }}</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
	totalCount: { type: Number, default: 0 },
	nowPage: { type: Number, default: 1 },
	// rowCount: { type: Number, default: 10 },
	pageBarCount: { type: Number, default: 5 },
});
const emit = defineEmits(['changePage', 'changeRowCount']);
const rowCount = ref(5);
const totalPage = computed(() => {
	return Math.max(Math.round(props.totalCount / rowCount.value), 1);
});

const pageList = computed(() => {
	// page 버튼 목록
	let pageCount = Math.min(props.pageBarCount, totalPage.value);
	let start = props.nowPage - Math.ceil((pageCount - 1) / 2);
	let end = props.nowPage + Math.ceil((pageCount - 1) / 2);
	// console.log({ start, end });

	if (totalPage.value < end) {
		let gap = end - totalPage.value;
		end = Math.min(end - gap, totalPage.value);
		start = Math.max(1, start - gap);
	} else if (start < 1) {
		let gap = 1 - start;
		end = Math.min(end + gap, totalPage.value);
		start = Math.max(start + gap, 1);
	}
	// console.log({ start, end });
	return Array.from({ length: end - start + 1 }, (_, i) => i + start);
});

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
