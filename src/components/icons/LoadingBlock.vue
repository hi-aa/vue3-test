<template>
	<div :class="{ loading, hide: !loading }">
		<div class="loader-icon"></div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loading = computed(() => store.state.loading.show);
</script>

<style scoped>
.hide {
	display: none;
}
.loading {
	display: block; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.loader-icon {
	border: 15px solid #f3f3f3; /* Light grey */
	border-top: 15px solid #3498db; /* Blue */
	border-radius: 50%;
	width: 70px;
	height: 70px;
	animation: spin 2s linear infinite;
	margin: auto;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
