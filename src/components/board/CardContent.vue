<template>
	<div class="flip-card">
		<div class="flip-card-inner" :class="{ 'selected-card': props.isSelected }">
			<div class="flip-card-front inner_txt">
				<p class="big_txt"><slot name="title"></slot></p>
				<p v-if="$slots.regnm" class="">
					<slot name="regnm"></slot>
				</p>
				<p class="sm_txt reg_date"><slot name="regdt"></slot></p>
			</div>
			<div class="flip-card-back inner_txt">
				<p class="big_txt"><slot name="title"></slot></p>
				<p style="float: right">조회수: <slot name="hitcnt">0</slot></p>
				<p class="mid_txt contents"><slot name="contents"></slot></p>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	isSelected: { type: Boolean, default: false },
});
</script>
<style scoped>
.flip-card {
	background-color: transparent;
	width: 23%;
	min-width: 300px;
	height: 230px;
	perspective: 1000px;
	display: inline-block;
	margin: 10px;
}

.flip-card-inner {
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: transform 0.6s;
	transform-style: preserve-3d;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
	transform: rotateY(180deg);
	cursor: pointer;
}

.flip-card-front,
.flip-card-back {
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	box-sizing: border-box;
	padding: 10px;
}

.flip-card-front {
	background-color: #e7e7e7;
	color: black;
}

.flip-card-back {
	background-color: #cd2838;
	color: white;
	transform: rotateY(180deg);
}
.flip-card-inner.selected-card {
	transform: rotateY(180deg);
}
.title {
	font-size: large;
	vertical-align: middle;
}
.reg_date {
	position: absolute;
	bottom: 10px;
	right: 10px;
}
.contents {
	float: left;
	text-overflow: ellipsis;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
