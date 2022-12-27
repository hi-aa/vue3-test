<template>
	<div class="slideshow-container">
		<div
			class="mySlides fade"
			v-for="(item, index) in img_arr"
			:key="index"
			:class="{ active: index === selectedIndex }"
		>
			<div class="numbertext">{{ index + 1 }} / {{ img_arr.length }}</div>
			<img :src="item.src" style="width: 100%" />
			<div class="text">{{ item.title }}</div>
		</div>

		<a
			class="prev"
			@click="
				selectedIndex = (selectedIndex + img_arr.length - 1) % img_arr.length
			"
			>&#10094;</a
		>
		<a
			class="next"
			@click="selectedIndex = (selectedIndex + 1) % img_arr.length"
			>&#10095;</a
		>
	</div>
	<br />

	<!-- The dots/circles -->
	<div style="text-align: center">
		<span
			v-for="(item, index) in img_arr"
			:key="index"
			class="dot"
			:class="{ active: index === selectedIndex }"
			@click="selectedIndex = index"
		></span>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const selectedIndex = ref(0);
const img_arr = [
	{ src: '/images/test1.jpg', title: '1 caption' },
	{ src: '/images/test2.jpg', title: '2 caption' },
	{ src: '/images/test3.jpg', title: '3 caption' },
	{ src: '/images/test4.jpg', title: '4 caption' },
	{ src: '/images/test5.jpg', title: '5 caption' },
	{ src: '/images/test6.jpg', title: '6 caption' },
	{ src: '/images/test7.jpg', title: '7 caption' },
	{ src: '/images/test8.jpg', title: '8 caption' },
];
</script>

<style scoped>
* {
	box-sizing: border-box;
}

/* Slideshow container */
.slideshow-container {
	position: relative;
	width: 500px;
	height: 650px;
	margin: 20px auto;
	display: flex;
	overflow-y: hidden;
}

/* Hide the images by default */
.mySlides {
	display: none;
}
.mySlides.active {
	display: block;
}

/* Next & previous buttons */
.prev,
.next {
	cursor: pointer;
	position: absolute;
	top: 50%;
	width: auto;
	margin-top: -22px;
	padding: 16px;
	color: white;
	font-weight: bold;
	font-size: 25px;
	transition: 0.6s ease;
	border-radius: 0 3px 3px 0;
	user-select: none;
}

/* Position the "next button" to the right */
.next {
	right: 0;
	border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
	background-color: rgba(0, 0, 0, 0.8);
}

/* Caption text */
.text {
	color: #f2f2f2;
	font-size: 17px;
	padding: 8px 12px;
	position: absolute;
	bottom: 8px;
	width: 100%;
	text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
	color: #f2f2f2;
	font-size: 14px;
	padding: 10px 15px;
	position: absolute;
	top: 0;
}

/* The dots/bullets/indicators */
.dot {
	cursor: pointer;
	height: 14px;
	width: 14px;
	margin: 0 2px;
	background-color: #bbb;
	border-radius: 50%;
	display: inline-block;
	transition: background-color 0.6s ease;
}

.active,
.dot:hover {
	background-color: #717171;
}

/* Fading animation */
.fade {
	animation-name: fade;
	animation-duration: 1.5s;
}

@keyframes fade {
	from {
		opacity: 0.4;
	}
	to {
		opacity: 1;
	}
}
</style>
