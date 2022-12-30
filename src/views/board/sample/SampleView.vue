<template>
	<h2 class="header">Slide Image</h2>
	<h5 class="header">이미지를 클릭 시 팝업을 볼 수 있다.</h5>
	<!-- 슬라이드 이미지 클릭 시 팝업 -->
	<div
		class="popup"
		:style="{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px` }"
	>
		<span class="popuptext">
			<span
				v-for="num in 5"
				:key="num"
				class="fa fa-star"
				:class="{ checked: img_arr[selectedIndex].rating >= num }"
			></span>
		</span>
	</div>

	<!-- 슬라이드 -->
	<div class="slideshow-container">
		<div
			class="mySlides fade"
			v-for="(item, index) in img_arr"
			:key="index"
			:class="{ active: index === selectedIndex }"
		>
			<div class="numbertext">{{ index + 1 }} / {{ img_arr.length }}</div>
			<img :src="item.src" @click="updateMousePosition" />
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

	<!-- 슬라이드 버튼 -->
	<div style="text-align: center">
		<span
			v-for="(item, index) in img_arr"
			:key="index"
			class="dot"
			:class="{ active: index === selectedIndex }"
			@click="selectedIndex = index"
		></span>
	</div>

	<!-- 텍스트 타이핑 -->
	<h2 style="display: inline-block; margin-right: 8px">Lorem Text</h2>
	<button class="pause" @click="pause = true">
		<i class="fa fa-light fa-pause"></i>
	</button>
	<button
		class="play"
		@click="
			pause = false;
			lorem = '';
			typeWriter();
		"
	>
		<i class="fa fa-light fa-play"></i>
	</button>
	<div style="font-size: 17px">{{ lorem }}</div>
</template>

<script setup>
import { ref } from 'vue';

// slide image
const selectedIndex = ref(0);
const img_arr = [
	{ src: '/images/test1.jpg', title: '1 caption', rating: 1 },
	{ src: '/images/test2.jpg', title: '2 caption', rating: 2 },
	{ src: '/images/test3.jpg', title: '3 caption', rating: 3 },
	{ src: '/images/test4.jpg', title: '4 caption', rating: 4 },
	{ src: '/images/test5.jpg', title: '5 caption', rating: 5 },
	{ src: '/images/test6.jpg', title: '6 caption', rating: 4 },
	{ src: '/images/test7.jpg', title: '7 caption', rating: 2 },
	{ src: '/images/test8.jpg', title: '8 caption', rating: 3 },
];

// infinite text typing
const SAMPLE_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const lorem = ref('');
const pause = ref(true); // 일시정지

const typeWriter = (i = 0) => {
	if (pause.value) return;

	// console.log(i);
	if (i < SAMPLE_TEXT.length) {
		lorem.value += SAMPLE_TEXT[i];
		i++;
		setTimeout(() => typeWriter(i), 100);
	} else {
		setTimeout(() => {
			lorem.value = '';
			typeWriter(0);
		}, 2000);
	}
};
typeWriter(0);

// star rating
const mousePosition = ref({ x: 0, y: 0 });
const updateMousePosition = e => {
	mousePosition.value.x = e.pageX;
	mousePosition.value.y = e.pageY;
	// console.log(mousePosition.value);
};
</script>

<style scoped>
.header {
	margin: 15px auto;
	text-align: center;
}
hr {
	margin: 20px auto;
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

/* typing */
button {
	margin: 0 4px;
}
.pause,
.play {
	border-radius: 50%;
	background-color: #aaa;
	border: none;
	width: 30px;
	height: 30px;
	color: white;
}

/* star rating */
.checked {
	color: orange;
}
/* Popup container */
.popup {
	position: absolute;
	display: inline-block;
	cursor: pointer;
}

/* The actual popup (appears on top) */
.popup .popuptext {
	width: 160px;
	background-color: #555;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 8px 0;
	position: absolute;
	z-index: 1;
	bottom: 125%;
	left: 50%;
	margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #555 transparent transparent transparent;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
	/* visibility: visible; */
	-webkit-animation: fadeIn 1s;
	animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
