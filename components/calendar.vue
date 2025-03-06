<template>
  <view>
    <!-- 切换日历 -->
    <reserveCalendar 
		@showMyDuty="showMyDuty"
		@sendDateToCalendar="handleSelectedDate"
		:dutyData="duties"
		></reserveCalendar>

    <!-- 我的日程 -->
    <myDuty
      :visible="isMyDutyVisible"
      @close="isMyDutyVisible = false"
      @showAddDuty="isAddDutyVisible = true"
			:date="date"
			:dutyData="duties"
      @deleteDuty="handleDeleteDuty"
    ></myDuty>

    <!-- 添加日程 -->
    <addDuty
      :visible="isAddDutyVisible"
      @closeModal="isAddDutyVisible = false"
      @resetColor="resetColor"
      @showChangeColor="showChangeColor"
      @addDuty="handleAddDuty"
      :color="dutyColor"
    ></addDuty>

    <!-- 更改日程颜色 -->
    <changeColor
      :visible="isChangeColorVisible"
      @closeChangeColor="closeChangeColor"
      @chosenColor="chosenColor"
    ></changeColor>
  </view>
</template>

<script setup>
import reserveCalendar from './reserve-calendar.vue';
import myDuty from './myDuty.vue';
import addDuty from './addDuty.vue';
import changeColor from './changeColor.vue';

import { ref } from 'vue';

// 我的日程
const isMyDutyVisible = ref(false);

// 添加日程
const isAddDutyVisible = ref(false);

// 更改日程颜色
const isChangeColorVisible = ref(false);

// 日程颜色
const dutyColor = ref('#FABAC8');

// 选中的日期
let date;

// 添加的日程数组
const duties = ref([]);

// 显示添加我的日程弹窗
function showMyDuty() {
  isMyDutyVisible.value = true;
}

// 关闭添加日程弹窗
function handleAddDuty(newDuty) {
	duties.value.push({ ...newDuty, completed: false, date}); // 初始化时未完成)
  isAddDutyVisible.value = false;
	console.log(duties)
}

function handleSelectedDate (formatDate) {
	date = formatDate;
}

// 删除日程
function handleDeleteDuty(index) {
  duties.value.splice(index, 1);
}

// 获得选择的颜色
const chosenColor = function (color) {
  dutyColor.value = color;
};
function closeChangeColor() {
  isChangeColorVisible.value = false;
}
function showChangeColor() {
  isChangeColorVisible.value = true;
}

// 关闭添加日程弹窗后 重置颜色
function resetColor() {
  dutyColor.value = '#FABAC8'; // 重置为第一个颜色
}
</script>

<style scoped></style>