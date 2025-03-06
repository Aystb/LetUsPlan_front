<template>
	<view v-if="props.visible" class="modalOverlay">
		<view class="changeColorContainer z-9">
			<!-- 标题：选择颜色 -->
			<view class="selectTitle fw-400 ft-20">选择颜色</view>
			<hr />
			
			<!-- 8个颜色块 -->
			<view class="colors">
				<!-- 每一个色块 -->
				<view class="colorBlock" v-for="(color, index) in colorList"  >
					<view
					class="color-item" 
					@click="selectColor(index)"
					:style="{ backgroundColor: color ,border: isSelected(index) ? '2px solid #666' : 'none'}"
					></view>
				</view>
			</view>
			
			<!-- 取消/确认btn -->
			 <view class="buttonContainer">
			      <button class="pickerCancel" @click="closeChangeColor()">取消</button>
			      <button class="pickerIdentify" @click="pickOneColor()">确认</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref ,defineEmits ,defineProps} from 'vue';
	
	const props =defineProps({
		visible: {
			type: Boolean,
			default: false,
		}
	})
	
	const emit=defineEmits(["chosenColor","closeChangeColor"])
	
	// 颜色
	const colorList=
	['#FABAC8', '#D2B9D7', '#B0C5B8', '#82B498',
	'#F7BD3D', '#CFA26A', '#BCE0EC', '#79ABD2'];
	
	
	const selectedIndex= ref(0);
	
	
	function isSelected(index) {
		// 检查当前索引是否与 selectedIndex 相等
		return selectedIndex.value == index;
	}
	
	function selectColor(index) {
		// 更新 selectedIndex 为当前点击的索引
		selectedIndex.value = index;
	}
	
	// 关闭更改颜色弹窗
	function closeChangeColor(index) {
		emit('closeChangeColor')
		selectedIndex.value=0;
	}
	
	// 把选中的颜色传给calendar组件，显示在addDuty组件的按钮处，关闭弹窗
	function pickOneColor () {
		emit("chosenColor",colorList[selectedIndex.value]);
		selectedIndex.value=0;
		emit('closeChangeColor')
	}
</script>

<style>
	.modalOverlay {
	  display: flex;
	  align-items: flex-end;
	  justify-content: center;
	  position: fixed;
	  top: 0;
	  width: 100vw;
	  height: 100vh;
	  background-color: rgba(227, 226, 226, 0.5);
	  z-index: 9000;
	}
	.changeColorContainer {
		background: linear-gradient(180deg, #E8C9FF 0%, #FEFCFF 25%);
		width: 100%;
		/* height: 41vh; */
		box-sizing: border-box;
		border-radius: 16px 16px 0 0;
		
	}
	.selectTitle {
		text-align: center;
		padding-top: 20px;
		padding-bottom: 20px;
		
	}
	.colors {
		display: flex;
		flex-wrap: wrap;
	}
	.colorBlock {
		width: 25%;
		text-align: center;
		margin: 10px 0 10px 0 ;
	}
	.color-item {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		padding: 5px;
		margin: 10px auto;
	}
	.buttonContainer {
	  display: flex;
	  flex-direction: row;
	  margin: 10px;
	}
	.pickerCancel {
	  border-radius: 16px;
	  background-color: #ededed;
	  width: 40%;
	  border: 1px solid #A4A4A4
	}
	.pickerIdentify {
	  border-radius: 16px;
	  background-color: #deb0ff;
	  width: 40%;
	  border: 1px solid #A4A4A4
	}

</style>
