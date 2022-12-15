<template>
	<div class="main_content">
		<div class="content_tit">
			<ul>
				<li class="list">
					<RouterLink
						:to="{ name: 'SampleList', replace: true }"
						class="nav-link"
						active-class="active"
					>
						공지사항
					</RouterLink>
				</li>
				<li class="list">게시판</li>
			</ul>
			<span class="search_bx">
				<input
					class="search"
					id="search"
					type="text"
					@keyup.enter="searchName"
					placeholder="검색어를 입력해 주세요"
				/>
				<span @click="searchName">
					<i class="search_icon"></i>
				</span>
			</span>
		</div>
		<router-view></router-view>
	</div>
</template>

<script setup>
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

@media (max-width: 1000px) {
	.content_tit ul {
		margin-bottom: 30px;
	}
}
</style>
