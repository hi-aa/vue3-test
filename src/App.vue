<template>
	<div class="wrap">
		<header>
			<AppNav></AppNav>
		</header>
		<div class="container">
			<AppView></AppView>
		</div>

		<footer>
			<AppFooter></AppFooter>
		</footer>
	</div>
</template>

<script setup>
import AppNav from '@/layout/AppNav.vue';
import AppView from '@/layout/AppView.vue';
import AppFooter from '@/layout/AppFooter.vue';
</script>

<style scoped>
.container {
	position: relative;
	width: 100%;
	height: 80vh;
}
</style>
