<template>
	<a href="#" class="float" @click.prevent="emits('clickFloating')">
		<i class="fa" style="margin-top: 22px" :class="getIconClass"></i>
	</a>
</template>

<script setup>
const emits = defineEmits(['clickFloating']);
const props = defineProps({
	iconType: {
		type: String,
		default: 'plus',
		// validator: value => ['plus', 'top'].includes(value),
	},
});

const ICON_TYPE = [
	{ type: 'plus', class: 'fa-plus' },
	{ type: 'up', class: 'fa-arrow-up' },
];

const getIconClass = () => {
	console.log(ICON_TYPE);
	const item = ICON_TYPE.filter(item => item.type === props.iconType);
	console.log(item);
	return item.class;
};
</script>

<style scoped>
.float {
	position: fixed;
	width: 60px;
	height: 60px;
	bottom: 40px;
	right: 40px;
	background-color: #cd2838;
	color: #fff;
	border-radius: 50px;
	text-align: center;
}
</style>
