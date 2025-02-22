<template>
  <view>
    <!-- 切换日历 -->
    <reserveCalendar @showMyDuty="showMyDuty"></reserveCalendar>

    <!-- 我的日程 -->
    <!-- <myDuty 
	@close="close()" 
	@showAddDuty="showAddDuty()" 
	:visible="isMyDutyVisible"
	></myDuty> -->

    <myDuty
      :visible="isMyDutyVisible"
      @close="isMyDutyVisible = false"
      @showAddDuty="isAddDutyVisible = true"
      ref="myDutyRef"
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
const myDutyRef = ref(null);
// 我的日程
const isMyDutyVisible = ref(false);

// 添加日程
const isAddDutyVisible = ref(false);

// 更改日程颜色
const isChangeColorVisible = ref(false);

// 日程颜色
const dutyColor = ref('#FABAC8');

// 显示添加我的日程弹窗
function showMyDuty() {
  isMyDutyVisible.value = true;
}

// 关闭添加日程弹窗
function handleAddDuty(newDuty) {
  myDutyRef.value.addDuty(newDuty);
  isAddDutyVisible.value = false;
}

// 获得选择的颜色
const chosenColor = function (color) {
  dutyColor.value = color;
  console.log(dutyColor.value, typeof dutyColor.value);
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
