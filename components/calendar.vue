<template>
  <view>
    <!-- this is calendar -->
    <reserveCalendar
      @showMyduty="show"
      @showAddDuty="showAddDuty"
    ></reserveCalendar>
    <myDuty @close="close" :visible="isModalVisible"></myDuty>
    <!-- <addDuty></addDuty> -->
  </view>
</template>

<script setup>
import reserveCalendar from './reserve-calendar.vue';
import myDuty from './myDuty.vue';
import addDuty from './addDuty.vue';
import { ref } from 'vue';

const isModalVisible = ref(false);
const isAddDutyVisible = ref(false);

// 显示添加我的日程弹窗
function show() {
  isModalVisible.value = true;
}
// 关闭我的日程弹窗
function close() {
  isModalVisible.value = false;
}
</script>

<style scoped></style>
