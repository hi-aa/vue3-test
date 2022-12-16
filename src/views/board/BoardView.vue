<template>
	<div class="main_content">
		<div class="content_tit">
			<ul>
				<RouterLink
					:to="{ name: 'NoticeList', replace: true }"
					custom
					v-slot="{ href }"
				>
					<li
						class="list"
						:class="$route.path.indexOf(href) === 0 ? 'active' : ''"
					>
						<a class="nav-link" :href="href"> 공지사항 </a>
					</li>
				</RouterLink>
				<li class="list">게시판</li>
			</ul>
		</div>
		<Suspense>
			<router-view></router-view>
			<template #fallback>Loading...</template>
		</Suspense>
	</div>
</template>

<script setup>
import { Suspense } from 'vue';
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.content_tit ul {
	display: flex;
	text-align: center;
	flex: 1;
	justify-content: space-evenly;
}
.content_tit ul li {
	margin-right: 30px;
	font-size: 25px;
	cursor: pointer;
	font-weight: 900;
	transition: 0.3s;
}
.content_tit ul li:hover {
	color: rgb(185, 24, 40);
}
.content_tit ul li.active {
	color: rgb(185, 24, 40);
}

/* @media (max-width: 1000px) {
	.content_tit ul {
		margin-bottom: 30px;
	}
} */
</style>
