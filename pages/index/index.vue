<template>
	<view >
		this is LUP
		<u-icon name="map" size="24" ></u-icon>
		<button @click="jumpToAi()">jump to ai</button>
		<button @click="jumpToCalendar()">jump to calendar</button>
		<button @click="jumpToLogin()">jump to login</button>
	</view>
</template>

<script setup>
//本页面作为一个测试性质的主页存在，可以存放一些快捷跳转的逻辑
function jumpToCalendar(){
uni.navigateTo({ url: '/pages/calendar/index' })
}
function jumpToAi(){
uni.navigateTo({url:'/pages/AI/newTalk'})
}
function jumpToLogin(){
	uni.navigateTo({ url: '/pages/login/index' })

}
</script>

<style>
	

	
</style>
