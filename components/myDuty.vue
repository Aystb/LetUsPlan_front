<template>	
	<view v-if="props.visible" class="modalOverlay" @click="closeMyDuty">
		<view class="z-3">
			<view class="ft-16 mb-10 ml-10 fw-700 todayFont">{{Month}}月{{Day}}日</view>
			<!-- 白色盒子 -->
			<view class="dutyContainer" @click.stop>
					
					<!-- 头部：我的日程 -->
					<view class="myDuty-font">
						<view class="font fw-600">我的日程</view>
						<view class="ft-18 fw-600">——my duty——</view>
					</view>
					
					<!-- 中部：添加的代办事项 -->
					<view class="duties">
						<view v-if="filteredDuties.length === 0" class="pleaseAddFont">请添加您的日程吧！</view>
						<view v-for="(duty, index) in filteredDuties" :key="duty.duty_id" class="duty-item">
							<!-- 透明圆圈 -->
							<view
							class="circle" 
							@click="toggleComplete(index)"
							:style="{
								backgroundColor: duty.isCheck ? '#8c8c8c' : '#fff',
								border: duty.isCheck ? 'none' : '1px solid #000' }"
							>
								<view v-if="filteredDuties[index].isCheck" class="tick">✓</view>
							</view>
							<!-- 日程标题和备注 -->
							<view class="duty-content" @click="editDuty(duty)">
								<view class="duty-title" :class="{'duty-title-completed' :duty.isCheck}">{{ filteredDuties[index].title }}</view>
								<image v-if="filteredDuties[index].description !==''" src="/static/descriptionStar.png" class="descriptionStar"></image>
							</view>
							<view @click="deleteDuty(duty.duty_id)">
								<image class="deleteBtn" src="/static/deleteBtn.png"></image>
							</view>
						</view>
					</view>
					
					<!-- 尾部：加号按钮 -->
					<view class="btnBox">
						<view class="flex-center-horizontal">
							<image src="/static/descriptionStar.png" class="descriptionStar mr-10"></image>
							说明有备忘部分
						</view>
						<button class="addDuty_btn" @click="showAddDuty">
							<image src="/static/addDuty_btn.png"></image>
						</button>
					</view>
				
			</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits, ref,computed } from "vue";
	
	const props = defineProps({
		visible: {
			type: Boolean,
			default: false,
		},
		date: {
		  type: String,
		},
		dutyData:{
			type:Array,
		}
	})
	// 关闭我的日程
	
	const emit = defineEmits(['close', 'showAddDuty','editDuty','deleteDuty','isCheckDuty']);
	
	const duties = ref([]);
	
	const Month = computed(() => props.date.split('-')[1]);
	const Day = computed(() => props.date.split('-')[2]);
	
	const filteredDuties = computed(() => {
	  return props.dutyData.filter(duty => duty.date === props.date);
	});
	
	// 关闭我的日程
	function closeMyDuty() {
		emit("close");
	}
	
	// 显示添加日程界面
	function showAddDuty() {
		emit("showAddDuty");
	}
	
	// 切换完成状态
	async function toggleComplete(index) {
		const duty = filteredDuties.value[index];
		duty.isCheck = !duty.isCheck;
    try {
      // 调用父组件的更新方法
			emit("isCheckDuty",duty)
    } catch (error) {
      console.error("更新状态失败:", error);
    }
	}
	
	// 向calendar传要编辑的duty
	function editDuty(duty) {
		emit("editDuty",duty)
	}
	
	function deleteDuty (id) {
		emit("deleteDuty",id)
	}
	
</script>

<style scoped>
	.modalOverlay {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  position: fixed;
	  top: 0;
	  width: 100vw;
	  height: 100vh;
	  background-color: #62626280;
	  z-index: 2000;

	}

	.dutyContainer {
	  background-color: #fff;
	  padding: 20px;
	  width: 80vw;
	  height: 60vh;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-evenly;
		box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.25);
		border-radius: 36px;

	}
	.todayFont {
		color: #fff;
	}
	.font{
		font-size: 36px;
	}
	.btnBox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
		font-weight: 400;
		font-size: 12px;
		color: #8C8C8C;
		
	}
	.addDuty_btn {
		height: 60px;
		width:60px;
		border-radius: 50%;
		background-color: transparent;
		box-shadow: none;
		padding: 0;
		margin: 0;
	}
	.addDuty_btn image {
		height: 60px;
		width:60px;
	}
	.duties {
		flex-grow: 1;
		flex-shrink: 1;
		margin: 10px 5px;
		overflow: scroll;
		/* border: 1px solid black; */
	}
	.pleaseAddFont {
		font-weight: 600;
		font-size: 18px;
		color: #ccc;
	}
	.duty-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	.circle {
		width: 20px;
		height: 20px;
		border: 1px solid #000;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
		cursor: pointer;
	}
	.tick {
		color: #fff;
		font-size: 14px;
		font-weight: bold;
	}
	.duty-content {
		flex: 1;
		display: flex;
		align-items: center;
	}
	.duty-title {
		font-size: 16px;
		font-weight: 600;
		margin-right: 10px;
	}
	.duty-title-completed {
		color: #8c8c8c;
		text-decoration: line-through;
	}
	.descriptionStar {
		width: 16px;
		height: 16px;
	}
	.duty-description {
		font-size: 14px;
		color: #666;
	}
	.deleteBtn {
		height: 16px;
		width: 16px;
	}
</style>