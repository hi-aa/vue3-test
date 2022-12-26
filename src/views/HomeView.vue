<template>
	<div class="container">
		<div
			class="max"
			:class="{ 'bg-filter': show }"
			@mouseover="show = true"
			@mouseleave="show = false"
		>
			<Transition>
				<div class="cover">
					<button @click="goBoardPage" v-if="show" class="btn">
						GO TO LIST
					</button>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const show = ref(false);

const router = useRouter();
const goBoardPage = () => {
	router.push({
		name: 'BoardView',
	});
};
</script>

<style scoped>
.container {
	position: relative;
	width: 100%;
	height: 80vh;
}
.max {
	width: 100%;
	height: 100%;
	background-image: url('@/assets/images/christmas-gift.jpg');
}
/* .container:hover .max {
	opacity: 0.5;
}
.container:hover .cover {
	opacity: 1;
} */
.cover {
	position: absolute;
	width: 100%;
	height: 100%;
	/* opacity: 1; */
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-size: 30px;
	padding: 30px;
	height: unset;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.bg-filter::before {
	content: '';
	opacity: 0.5;
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	/* background-color: #000; */
	background-color: rgba(255, 255, 255, 0.5);
}
</style>
