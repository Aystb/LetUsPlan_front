<template>
	<view class="modalOverlay">
		<view class="addContainer">
			<view class="dutyTitle flex-center-horizontal">
				<input class="pd-10 ft-24 fw-600" placeholder="在这里记下你的日程待办~"></input>
				<button class="sendDuty_btn" @click="addOneDuty()">
					<image src="/static/sendDuty.png" mode="scaleToFill"></image>
				</button>
			</view>
			<button class="changeColor_btn">更改颜色</button>
			<textarea class="addInfoInput" placeholder="输入备忘"></textarea>
		</view>
		
	</view>
</template>

<script setup>
	function addOneDuty () {
		console.log("增加了一个待办")
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
		height: 50%;
		width: 100%;
		border-radius: 20px 20px 0 0;
		padding: 10px;
		background: linear-gradient(180deg, #E8C8FF 19.64%, #F4E4FF 67.76%, #FFFFFF 100%);
	}
	.sendDuty_btn {
		height: 40px;
		width:40px;
		background-color: transparent;
		box-shadow: none;
		margin: 0;
		padding: 0;
		border: none;
	}
	.sendDuty_btn image {
		height: 40px;
		width:40px;
	}
	.changeColor_btn {
		border: 1px solid #FFFFFF;
	}
	.addInfoInput {
		height: 30%;
		border:1px black solid
	}
</style>