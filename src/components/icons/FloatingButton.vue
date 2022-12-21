<template>
	<a href="#" class="float" @click.prevent="$emit('clickEvent')">
		<i class="fa" :class="getIconClass()" style="margin-top: 22px"></i>
	</a>
</template>

<script setup>
const props = defineProps({
	iconType: {
		type: String,
		default: 'plus',
		validator: value => ['plus', 'up'].includes(value),
	},
});
defineEmits(['clickEvent']);

const ICON_TYPE = [
	{ type: 'plus', class: 'fa-plus' },
	{ type: 'up', class: 'fa-arrow-up' },
];

const getIconClass = () => {
	const item = ICON_TYPE.find(item => item.type === props.iconType);
	// console.log(item);
	return item.class ? item.class : ICON_TYPE[0].class;
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
