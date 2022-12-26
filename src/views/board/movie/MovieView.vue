<template>
	<ul class="nav">
		<li @click="selected = 'daily'">
			<a :class="{ active: selected === 'daily' }">일별 박스오피스</a>
		</li>
		<li @click="selected = 'weekly'">
			<a :class="{ active: selected === 'weekly' }">주간/주말 박스오피스</a>
		</li>
	</ul>

	<KeepAlive>
		<component :is="MovieList" :search-type="selected"></component>
	</KeepAlive>
</template>

<script setup>
import MovieList from './MovieList.vue';

// floating button
import { useFloatingButton } from '@/hooks/floatingButton';
import { ref } from 'vue';
useFloatingButton({
	setShow: true,
	setIcon: 'up',
	clickEventFunc: () => {
		console.log('position top');
		window.scrollTo(0, 0);
	},
});

// keepalive
const selected = ref('daily');
</script>

<style scoped>
ul.nav {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
	border: 1px solid #e7e7e7;
	background-color: #f3f3f3;
}

.nav li {
	float: left;
}

.nav li a {
	display: block;
	color: #666;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
}

.nav li a:hover:not(.active) {
	background-color: #ddd;
}

.nav li a.active {
	color: white;
	background-color: #b91828;
}
</style>
