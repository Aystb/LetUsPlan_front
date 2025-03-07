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


const curMonth = ref();
const curYear = ref();

const handleMonthYearUpdate = (payload) => {
  curMonth.value = payload.month;
  curYear.value = payload.year;
  console.log("接收到日历更新：", payload);
};

const duties = ref([]);

const myDutyRef = ref([]);
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


// 关闭添加日程弹窗后 重置颜色
function resetColor() {
  dutyColor.value = '#FABAC8'; // 重置为第一个颜色

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
	myDutyRef.value.addDuty(newDuty);
  //在这里发起请求就行
  //duty:{title，description} 还不够，需要加时间，是否完成等tag

	isAddDutyVisible.value = false;
}

</script>

<style scoped></style>