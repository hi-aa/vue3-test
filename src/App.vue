<template>
	<div class="wrap">
		<header>
			<AppNav></AppNav>
		</header>
		<AppView></AppView>
		<AppFooter></AppFooter>
	</div>
</template>

<script setup>
import AppNav from '@/layout/AppNav.vue';
import AppView from '@/layout/AppView.vue';
import AppFooter from '@/layout/AppFooter.vue';
</script>
