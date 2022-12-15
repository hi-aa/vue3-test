<template>
	<div class="max">
		<button @click="goBoardPage" class="btn">GO TO LIST</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goBoardPage = () => {
	router.push({
		name: 'BoardView',
	});
};
</script>

<style scoped>
.max {
	position: relative;
	width: 100%;
	height: 80vh;
}
.max button {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-size: 30px;
	padding: 30px;
	height: unset;
}
</style>
