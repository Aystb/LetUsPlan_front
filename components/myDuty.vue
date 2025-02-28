<template>	
	<view v-if="props.visible" class="modalOverlay" @click="closeMyDuty">
		<view class="z-3">
			<view class="ft-16 mb-10 ml-10 fw-700">{{Year}}年 {{Month}}月 {{Day}}日</view>
			<!-- 白色盒子 -->
			<view class="dutyContainer" @click.stop>
					
					<!-- 头部：我的日程 -->
					<view class="myDuty-font">
						<view class="font fw-600">我的日程</view>
						<view class="ft-18 fw-600">——my duty——</view>
					</view>
					
					<!-- 中部：添加的代办事项 -->
					<view class="duties">
						<view v-for="(duty, index) in filteredDuties" :key="index" class="duty-item">
							<!-- 透明圆圈 -->
							<view class="circle" @click="toggleComplete(index)">
								<view v-if="filteredDuties[index].completed" class="tick">✓</view>
							</view>
							<!-- 日程标题和备注 -->
							<view class="duty-content">
								<view class="duty-title">{{ filteredDuties[index].title }}</view>
								<view class="duty-description">{{ filteredDuties[index].description }}</view>
							</view>
						</view>
					</view>
					
					<!-- 尾部：加号按钮 -->
					<button class="addDuty_btn" @click="showAddDuty">
						<image src="/static/addDuty_btn.png"></image>
					</button>
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
	
	const emit = defineEmits(['close', 'showAddDuty']);
	
	const duties = ref([]);
	
	const Year = computed(() => props.date.split('-')[0]);
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
	
	// 添加日程
	// function addDuty(newDuty) {
	// 	duties.value.push({ ...newDuty, completed: false }); // 初始化时未完成
	// }
	
	// 切换完成状态
	function toggleComplete(index) {
		filteredDuties.value[index].completed = !filteredDuties.value[index].completed;
	}
	
	// 暴露 addDuty 方法给父组件
	// defineExpose({
	// 	addDuty
	// });
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
	  background-color: rgba(227, 226, 226, 0.5);
	  z-index: 2000;
	}

	.dutyContainer {
	  background-color: #fff;
	  padding: 20px;
	  border-radius: 5px;
	  width: 80vw;
	  height: 60vh;
	  border: 1px solid #DEB0FF9C;
	  border-radius:36px;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-evenly;
	}
	.font{
		font-size: 36px;
	}
	.addDuty_btn {
		height: 60px;
		width:60px;
		border-radius: 50%;
		background-color: transparent;
		box-shadow: none;
		padding: 0;
		margin: 0;
		align-self: self-end;
		justify-self: flex-end;
		flex-shrink: 0;
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
	.duty-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	.circle {
		width: 20px;
		height: 20px;
		border: 2px solid #DEB0FF9C;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
		cursor: pointer;
	}
	.tick {
		color: #DEB0FF9C;
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
	.duty-description {
		font-size: 14px;
		color: #666;
	}
</style>