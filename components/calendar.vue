<template>
  <view>
    <!-- 切换日历 -->
    <reserveCalendar
      @showMyDuty="showMyDuty()"
      @update:month-year="handleMonthYearUpdate"
    ></reserveCalendar>

    <!-- 我的日程 -->
    <myDuty
      @close="close()"
      @showAddDuty="showAddDuty()"
      :visible="isMyDutyVisible"
      :month="curMonth"
      :year="curYear"
      :duties="duties"
    ></myDuty>

    <!-- 添加日程 -->
    <addDuty
      @closeModal="closeAddDuty()"
      :visible="isAddDutyVisible"
      :color="dutyColor"
      @showChangeColor="showChangeColor()"
      @addOneDuty()="handleAddDuty"
    ></addDuty>

    <!-- 更改日程颜色 -->
    <changeColor
      @chosenColor="chosenColor"
      @closeChangeColor="closeChangeColor()"
      :visible="isChangeColorVisible"
      :color="dutyColor"
    ></changeColor>
  </view>
</template>

<script setup>
import reserveCalendar from "./reserve-calendar.vue";
import myDuty from "./myDuty.vue";
import addDuty from "./addDuty.vue";

import changeColor from "./changeColor.vue";

import { ref } from "vue";

const curMonth = ref();
const curYear = ref();

const handleMonthYearUpdate = (payload) => {
  curMonth.value = payload.month;
  curYear.value = payload.year;
  console.log("接收到日历更新：", payload);
};

const duties = ref([]);

// 我的日程
const isMyDutyVisible = ref(false);

// 添加日程
const isAddDutyVisible = ref(false);

// 更改日程颜色
const isChangeColorVisible = ref(false);

// 日程颜色
const dutyColor = ref("#F7DFB4");

// 显示添加我的日程弹窗
function showMyDuty() {
  isMyDutyVisible.value = true;
}
// 关闭我的日程弹窗
function close() {
  isMyDutyVisible.value = false;
}

// 显示添加日程弹窗
function showAddDuty() {
  isAddDutyVisible.value = true;
}
// 关闭添加日程弹窗
function closeAddDuty() {
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

function handleAddDuty(duty) {
  duties.value.push(duty);
}
</script>

<style scoped></style>
