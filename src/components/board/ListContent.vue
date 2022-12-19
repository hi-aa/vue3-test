<template>
	<div class="inner_wrap">
		<div class="inner_txt">
			<p class="big_txt">
				<slot name="title"></slot>
			</p>
			<p class="mid_txt">
				Index: <slot name="index"></slot><br />
				<slot name="contents"></slot>
			</p>
			<p v-if="$slots.day" class="sm_txt">
				<slot name="day"></slot>
			</p>
		</div>
		<div class="inner_count" v-if="$slots.hitCnt">
			<p class="count">
				조회수:
				<slot name="hitCnt">0</slot>
			</p>
		</div>
	</div>
</template>
<script setup></script>
<style scoped>
.inner_wrap {
	justify-content: space-between;
	padding-right: 20px;
	padding-left: 20px;
}
</style>
