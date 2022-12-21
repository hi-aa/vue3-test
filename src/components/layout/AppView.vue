<template>
	<RouterView></RouterView>

	<FloatingButton
		v-show="show"
		:icon-type="icon"
		@click-event="clickEvent"
	></FloatingButton>
</template>

<script setup>
import FloatingButton from '@/components/icons/FloatingButton.vue';
import { useFloatingButton } from '@/hooks/floatingButton';
const { show, icon, clickEvent } = useFloatingButton();
</script>

<style lang="scss" scoped></style>
