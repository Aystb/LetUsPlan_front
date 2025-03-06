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
						<view v-if="filteredDuties.length === 0" class="empty-duties">
							请您添加日程吧！
						</view>
						<view 
							v-for="(duty, index) in filteredDuties" 
							:key="index" 
							class="duty-item"
							@touchstart="handleTouchStart(index, $event)"
							@touchmove="handleTouchMove(index, $event)"
							@touchend="handleTouchEnd(index)"
							:style="{ transform: `translateX(${duty.offsetX}px)` }"
						>
							<!-- 透明圆圈 -->
							<view class="circle" @click="toggleComplete(index)">
								<view v-if="filteredDuties[index].completed" class="tick">✓</view>
							</view>
							<!-- 日程标题和备注 -->
							<view class="duty-content">
								<view 
									class="duty-title" 
									:class="{ completed: filteredDuties[index].completed }"
								>
									{{ filteredDuties[index].title }}
								</view>
								<view 
									class="duty-description" 
									:class="{ completed: filteredDuties[index].completed }"
								>
									{{ filteredDuties[index].description }}
								</view>
							</view>
							<!-- 删除按钮 -->
							<view class="delete-btn" @click="handleDelete(index)">
								删除
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
	import { defineProps, defineEmits, ref, computed } from "vue";
	
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
	
	const emit = defineEmits(['close', 'showAddDuty', 'deleteDuty']);
	
	const duties = ref([]);
	
	const Year = computed(() => props.date.split('-')[0]);
	const Month = computed(() => props.date.split('-')[1]);
	const Day = computed(() => props.date.split('-')[2]);
	
	const filteredDuties = computed(() => {
	  return props.dutyData.map(duty => ({
			...duty,
			offsetX: 0, // 用于控制左滑偏移量
			isDragging: false, // 是否正在拖动
		}));
	});
	
	// 触摸起始位置
	let startX = 0;
	
	// 触摸开始
	function handleTouchStart(index, event) {
		startX = event.touches[0].clientX;
		filteredDuties.value[index].isDragging = true;
	}
	
	// 触摸移动
	function handleTouchMove(index, event) {
		if (!filteredDuties.value[index].isDragging) return;
		const currentX = event.touches[0].clientX;
		const offsetX = currentX - startX;
		// 限制左滑最大距离
		if (offsetX < -100) {
			filteredDuties.value[index].offsetX = -100;
		} else if (offsetX > 0) {
			filteredDuties.value[index].offsetX = 0;
		} else {
			filteredDuties.value[index].offsetX = offsetX;
		}
	}
	
	// 触摸结束
	function handleTouchEnd(index) {
		filteredDuties.value[index].isDragging = false;
		// 如果滑动距离超过阈值，则触发删除
		if (filteredDuties.value[index].offsetX < -50) {
			handleDelete(index);
		} else {
			// 否则恢复原位
			filteredDuties.value[index].offsetX = 0;
		}
	}
	
	// 删除日程
	function handleDelete(index) {
		emit("deleteDuty", index);
	}
	
	// 关闭我的日程
	function closeMyDuty() {
		emit("close");
	}
	
	// 显示添加日程界面
	function showAddDuty() {
		emit("showAddDuty");
	}
	
	// 切换完成状态
	function toggleComplete(index) {
		filteredDuties.value[index].completed = !filteredDuties.value[index].completed;
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
	}
	.empty-duties {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 16px;
		color: #666;
	}
	.duty-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		transition: transform 0.2s ease;
		position: relative;
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
	/* 完成状态的样式 */
	.completed {
		text-decoration: line-through; /* 添加删除线 */
		color: #999; /* 文字颜色变浅 */
	}
	.delete-btn {
		position: absolute;
		right: -100px;
		width: 100px;
		height: 100%;
		background-color: #FF3B30;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}
</style>
