<template>
	<div class="text-center py-5">
		<div class="error_wrap">
			<div class="error_img">
				<img src="@/assets/images/main_img/error.png" alt="" />
			</div>
			<h2>Page Not Found</h2>
			<div class="text-muted">찾을수 없는 페이지 입니다.</div>
			<div class="mt-4">
				<RouterLink to="/">
					<button class="btn">HOME</button>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.text-center {
	width: 100%;
	height: 100vh;
	text-align: cener;
	position: relative;
}
.text-center h1,
.text-center h2,
.text-center .text-muted,
.mt-4,
.error_img {
	text-align: center;
}
.error_wrap {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.text-center h2 {
	font-size: 37px;
	font-family: 'Montserrat';
	margin-top: 50px;
}
.text-muted {
	font-size: 24px;
	font-family: 'Pretendard';
}
.btn {
	font-size: 18px;
	font-family: 'Montserrat';
	margin-top: 35px;
}
</style>
