<template>
  <view>
	<!-- 切换日历 -->
    <reserveCalendar
      @showMyDuty="showMyDuty()"
    ></reserveCalendar>
	
	<!-- 我的日程 -->
    <myDuty @close="close()" @showAddDuty="showAddDuty()" :visible="isMyDutyVisible"></myDuty>
	
	<!-- 添加日程 -->
    <addDuty @closeModal="closeAddDuty()" :visible="isAddDutyVisible"></addDuty>
  </view>
</template>

<script setup>
import reserveCalendar from './reserve-calendar.vue';
import myDuty from './myDuty.vue';
import addDuty from './addDuty.vue';
import { ref } from 'vue';

// 我的日程
const isMyDutyVisible = ref(false);

// 添加日程
const isAddDutyVisible = ref(false);

// 显示添加我的日程弹窗
function showMyDuty() {
  isMyDutyVisible.value = true;
}
// 关闭我的日程弹窗
function close() {
  isMyDutyVisible.value = false;
}

function showAddDuty() {
  isAddDutyVisible.value = true;
}

// 关闭添加日程弹窗
function closeAddDuty() {
  isAddDutyVisible.value = false;
}


</script>

<style scoped></style>
