<template>
	<div class="pagination">
		<i
			v-if="props.nowPage > 1"
			class="fa-solid fa-chevron-left"
			@click="changePage(props.nowPage - 1)"
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
			v-if="props.nowPage < totalPage"
			class="fa-solid fa-chevron-right"
			@click="changePage(props.nowPage + 1)"
		>
		</i>
	</div>
	<div>Total: {{ props.totalCount }}</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	totalCount: { type: Number, default: 0 },
	nowPage: { type: Number, default: 1 },
	rowCount: { type: Number, default: 10 },
});
const emit = defineEmits(['changePage']);
const totalPage = computed(() => {
	return Math.max(Math.round(props.totalCount / props.rowCount), 1);
});

const PAGE_BAR_COUNT = 5; // page 버튼 표시 수
const pageList = computed(() => {
	// page 버튼 목록
	let pageCount = Math.min(PAGE_BAR_COUNT, totalPage.value);
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
</script>
