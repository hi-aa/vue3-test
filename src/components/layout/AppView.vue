<template>
	<RouterView></RouterView>

	<FloatingButton
		v-show="show"
		:icon-type="icon"
		@click-event="clickEvent"
	></FloatingButton>

	<LoadingBlock></LoadingBlock>
</template>

<script setup>
import FloatingButton from '@/components/icons/FloatingButton.vue';
import { useFloatingButton } from '@/hooks/floatingButton';
import LoadingBlock from '@/components/icons/LoadingBlock.vue';

const { show, icon, clickEvent } = useFloatingButton();
</script>
