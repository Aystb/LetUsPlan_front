<template>
	<!-- 背景遮罩 -->
	<view v-if="props.visible" class="modalOverlay" @click="closeModal()">
		<!-- 添加事项 -->
		<view class="addContainer" @click.stop>
			
			<!-- 事项标题和发生按钮 -->
			<view class="flex-center-horizontal pd-10">
				<input class="ft-24 fw-600 dutyTitle" placeholder="在这里记下你的日程待办~"></input>
				<button class="sendDuty_btn" @click="addOneDuty()">
					<image src="/static/sendDuty.png" mode="scaleToFill"></image>
				</button>
			</view>
			
			<!-- 更改颜色 -->
			<view>
				<!-- 样式待更改 -->
				<button class="changeColor_btn" @click="changeColor()">背景颜色</button>
			</view>
			
			<!-- 备忘部分 -->
			
			<view class="flex-x m-5">
				<image class="moreInfo_icon" src="/static/moreInfo.png"></image>
				<textarea class="addInfo" placeholder="输入备忘"></textarea>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { defineProps,defineEmits} from "vue";
	
	const props =defineProps({
		visible: Boolean,
		default:false
	})
	
	const emit = defineEmits(['closeModal'])
	// 点击背景遮罩关闭
	function closeModal () {
		emit("closeModal")
		console.log("关闭添加日程界面")
	}
	
	// 增加一个待办事项——（判断input是否为空？
	function addOneDuty () {
		console.log("增加了一个待办")
	}
	function changeColor () {
		console.log("更改颜色")
	}

</script>

<style scoped>
	.modalOverlay {
	  display: flex;
	  align-items: flex-end;
	  justify-content: center;
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(227, 226, 226, 0.5);
	  z-index: 8000;
	}
	.addContainer {
		height: 50vh;
		width: 100vw;
		border-radius: 15px 15px 0 0;
		background: linear-gradient(180deg, #E8C8FF 19.64%, #F4E4FF 67.76%, #FFFFFF 100%);
	}
	.dutyTitle {
		width: 85%;
		margin-left: 10px;
	}
	.sendDuty_btn {
		
		height: 40px;
		width:40px;
		background-color: transparent;
		box-shadow: none;
		margin: 0;
		padding: 0;
	}
	.sendDuty_btn::after {
	  border: none;
	}
	.sendDuty_btn image {
		height: 40px;
		width:40px;
	}
	.changeColor_btn {
		border: 1px solid #FFFFFF;
		background-color: transparent;
		box-shadow: none;
		font-size: 16px;
		font-weight: 600;

	}
	.changeColor_btn::after {
		border: none;
	}
	.moreInfo_icon {
		height: 36px;
		width:30px;
	}
	.addInfo {
		width: 90%;
		margin:0 auto;
		font-size: 16px;
		font-weight: 600;
		border:1px black solid
	}
</style>