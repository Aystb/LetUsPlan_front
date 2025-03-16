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
			@editDuty="handleEditDuty"
			@deleteDuty="handleDeleteDuty"
			@isCheckDuty="handleUpdateDuty"
			:date="date"
			:dutyData="duties"
    ></myDuty>

    <!-- 添加日程 -->
    <addDuty
      :visible="isAddDutyVisible"
      @closeModal="handleCloseModal"
      @resetColor="resetColor"
      @showChangeColor="showChangeColor"
      @addDuty="handleAddDuty"
			@updateDuty="handleUpdateDuty"
      :color="dutyColor"
			:editingDuty="editingDuty"
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
import api from '../request/api';

import { ref,onMounted } from 'vue';
import { props } from 'uview-plus';

onMounted(()=>{
	getDuties()
})

const curMonth = ref();
const curYear = ref();

const handleMonthYearUpdate = (payload) => {
  curMonth.value = payload.month;
  curYear.value = payload.year;
  console.log("接收到日历更新：", payload);
};
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
// 编辑的日程
const editingDuty = ref(null)

// 显示我的日程弹窗
function showMyDuty() {
  isMyDutyVisible.value = true;
}

// 获取日程数据 
async function getDuties () {
	try {
	    const res = await api.getDuties();
			duties.value = res
			// console.log(duties.value);
	  } catch (error) {
	    console.error("获取日程失败:", error);
	  }
	
}

// 添加日程
async function handleAddDuty(newDuty) {
  try {
    const res = await api.addDuty({
			...newDuty,
			isCheck: false,
			date,
		});
		await getDuties();
		isAddDutyVisible.value = false;
    console.log("添加成功:", res);
  } catch (error) {
    console.error("添加失败:", error);
  }
}
// 关闭添加日程弹窗
function handleCloseModal () {
	editingDuty.value = null;
	isAddDutyVisible.value = false
}
// 获取在日历中选择的格式化日程YYYY-MM-DD，并传给myDuty显示对应日程
function handleSelectedDate (formatDate) {
	date = formatDate;
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
// 将获得的editDuty赋值给editingDuty
function handleEditDuty(editDuty) {
	editingDuty.value = {...editDuty};
	dutyColor.value = editingDuty.value.color;
	isAddDutyVisible.value = true;
}

async function handleUpdateDuty(updatedDuty) {
	// console.log(updatedDuty)
	const dutyModified = {
		title: updatedDuty.title,
		description: updatedDuty.description,
		date: updatedDuty.date,
		color: updatedDuty.color,
		isCheck: updatedDuty.isCheck,
		duty_id: updatedDuty.duty_id
	}
	await api.modifyDuty(dutyModified);
  await getDuties(); // 重新获取最新数据
  editingDuty.value = null;
  isAddDutyVisible.value = false;
}


// 删除日程
async function handleDeleteDuty(duty_id) {
	try {
	  const res = await api.deleteDuty({duty_id});
		await getDuties();
	  console.log("删除成功:", res);
	} catch (error) {
	  console.error("删除失败:", error);
	}
}
</script>

<style scoped></style>
