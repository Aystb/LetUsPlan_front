<template >
  <view class="main-container">
		<view class="calendarBackground"></view>
    <view class="fixed">
      <view class="flex-x justify-end items-center pd-bt-10 relative">
        <view class="flex-center-both calendar-select absolute ">
          <text class="ft-22 whiteFont fw-600">{{ curYear }}年{{ curMonth }}月</text>
          <img src="../static/倒三角 1.png" @click="showPicker" class="chooseDateBtn" />
        </view>

        <!-- 点击头像登录 -->
        <image
          src="/static/user-avatar.png"
          class="user-avatar mr-20"
          @click="login"
        ></image>
      </view>

      <!--日期选择部分-->
      <view
        class="flex-y"
        v-for="(row, index1) in Array.from({ length: weeks })"
        :key="index1"
      >
        <!-- 生成行 -->
        <view class="flex-x">
          <view
            class="flex-fill shrink autoHeight"
            v-for="(week, index2) in Array.from({ length: 7 })"
            :key="index2"
          >
            <!-- 生成日期 -->
            <text class="whiteFont mb-10 fw-400 ft-20" v-if="index1 == 0">{{
              weekTitle(index2)
            }}</text>

            <view
              v-if="isShow(index1, index2)"
              class="dayContainer"
							@click="!isOtherMonth(index1, index2) && showMyDuty()"
            >
              <!--日期方块组件-->
              <view @click="choose(index1, index2)" :class="['all-btn']">
                <!-- 日期部分 -->
                <view class="fw-400 ft-16">{{
                  curMonthArray[
                    index1 * 7 + index2 - curMonthBasicInfo.startIndex
                  ]?.date
                }}</view>

                <!-- 日历上的日程单元 -->
                <view
                  v-for="(duty, index) in getdutyForDate(
                    curYear,
                    curMonth,
                    curMonthArray[
                      index1 * 7 + index2 - curMonthBasicInfo.startIndex
                    ]?.date
                  )"
                  :key="duty.duty_id"
                  class="duty-item"
                  :style="{ 'background-color': duty.color }"
                  >{{ duty.title }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 年月选择器 -->
  <ModalComponents :visible="IsShowPicker" class="PickerModal">
    <p class="pickTime">{{ PickerCurYear }}年{{ PickerCurMonth }}月</p>
    <br />
    <view class="scrollContainer">
      <scrollPicker v-model="PickerCurYear" type="year" />
      <scrollPicker v-model="PickerCurMonth" type="month" />
    </view>
    <view class="buttonContainer">
      <button class="pickerCancel" @click="pickerCancel">取消</button>
      <button class="pickerIdentify" @click="pickerIdentify">确定</button>
    </view>
  </ModalComponents>

  <!-- AI 图标 -->
  <movable-area>
    <!-- 可拖动图标 -->
    <movable-view
      direction="all"
      :x="position.x"
      :y="position.y"
      @click="navigateToAI"
    >
      <image src="/static/ai-icon.png" class="icon-image" />
    </movable-view>
  </movable-area>
</template>

<script setup>
import { watch, ref, onMounted, computed } from "vue";
import api from "../request/api";
import { getRangeDates } from "../js/date";
import { dateInfo, monthDate } from "../static/staticData";
import scrollPicker from "./scrollPicker.vue";
import ModalComponents from "./ModalComponents.vue";

const IsShowPicker = ref(false);

const props = defineProps({
  dutyData: Array,
});

const calendar = ref();

//客观上当前的时间
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1; // 月份是从0开始的，所以加1
const day = new Date().getDate();
const static_calendar = ref();

//可以使用curMonth，year和month，year的差值来计算index，暂且放一个思路在这里
const curMonth = ref(0);
const curYear = ref(0);
const PickerCurMonth = ref(0);
const PickerCurYear = ref(0);

//当前月数组
const curMonthArray = ref(monthDate);

//当前月的起始位置，长度,因为有35-42个按钮，需要知道当前月份第一天的起始位置
const curMonthBasicInfo = ref({ startIndex: 0, length: 30 });
//要渲染的周数，如果一号是周六开始，有31天，那么有六行，一般情况是五行，需要根据startIndex,length计算
const weeks = computed(() => {
  if (
    curMonthBasicInfo.value.startIndex + curMonthBasicInfo.value.length >
    35
  ) {
    return 6;
  } else {
    return 5;
  }
});

function showPicker() {
  PickerCurYear.value = curYear.value;
  PickerCurMonth.value = curMonth.value;
  IsShowPicker.value = !IsShowPicker.value;
}

function weekTitle(index) {
  if (index == 1) {
    return "一";
  }
  if (index == 2) {
    return "二";
  }
  if (index == 3) {
    return "三";
  }
  if (index == 4) {
    return "四";
  }
  if (index == 5) {
    return "五";
  }
  if (index == 6) {
    return "六";
  } else {
    return "日";
  }
}

onMounted(() => {
  calendar.value = dateInfo;

  static_calendar.value = getRangeDates(year, month, 99999);

  //用来触发第一次watch，不知道为什么immediate无效
  curMonth.value = new Date().getMonth() + 1;
  curYear.value = new Date().getFullYear();

  PickerCurYear.value = curYear.value;
  PickerCurMonth.value = curMonth.value;

  emit("update:month-year", {
    month: curMonth.value,
    year: curYear.value,
  });
});
watch([curYear, curMonth], (newValue, oldValue) => {
  curMonthArray.value = static_calendar.value[curYear.value][curMonth.value];
  curMonthBasicInfo.value.startIndex = curMonthArray.value[0].dayOfWeek;
  curMonthBasicInfo.value.length = curMonthArray.value.length;
});

//计算当前按钮是否要显示,不在当前月份之内的不予显示
const isShow = (index1, index2) => {
  // var day = index2 + index1 * 7;
  // if (
  //   day < curMonthBasicInfo.value.startIndex ||
  //   day >= curMonthBasicInfo.value.startIndex + curMonthBasicInfo.value.length
  // ) {
  //   return false;
  // }
	
	// 不筛选——可能待修改
	return true;
};

// 判断是否是上个月或下个月的日期
const isOtherMonth = (index1, index2) => {
  const dayIndex = index1 * 7 + index2;
  return (
    dayIndex < curMonthBasicInfo.value.startIndex ||
    dayIndex >= curMonthBasicInfo.value.startIndex + curMonthBasicInfo.value.length
  );
};

function pickerCancel() {
  IsShowPicker.value = !IsShowPicker.value;
}

function pickerIdentify() {
  curMonth.value = PickerCurMonth.value;
  curYear.value = PickerCurYear.value;
  IsShowPicker.value = !IsShowPicker.value;
}

let curDay;

//选择这个按钮
function choose(index1, index2) {
	try{
		var index = index1 * 7 + index2; //日期
		var chooseDate =
		  curMonthArray.value[index - curMonthBasicInfo.value.startIndex].date;
		curDay = chooseDate;
	} catch(err){
		// 空白格子点击时暂不报错
		return true
	}
  
}

// ------------登录/切换账号---------------
function login() {
  console.log("切换账号/返回");
	uni.navigateTo({ url: "/pages/login/index" });
}

// ---------日程部分----------------

// 日历方格显示对应日程

function getdutyForDate(year, month, day) {
  const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const dutyForDate = props.dutyData.filter((duty) => duty.date === date);
  return dutyForDate;
}

// 显示添加日程的组件，并将选择的日期YYYYMMDD传给父组件calendar
const emit = defineEmits(["showMyDuty", "sendDateToCalendar"]);

function showMyDuty() {
  // 将选择的日期以YYYY-MM-DD传给calendar组件 —— eg. '2025-02-25'
  const formatDate = `${curYear.value}-${String(curMonth.value).padStart(2,'0')}-${String(curDay).padStart(2, '0')}`;
  emit("sendDateToCalendar", formatDate);
  emit("showMyDuty");
}

//  ---------------AI图标部分-----------------

// 图标位置状态
const position = ref({ x: 0, y: 0 });

// 初始化图标位置
const systemInfo = uni.getSystemInfoSync();
position.value = {
  x: systemInfo.windowWidth - 60,
  y: systemInfo.windowHeight - 120,
};

// 点击跳转
const navigateToAI = () => {
  console.log("跳转至AI页面");
	uni.navigateTo({ url: "/pages/AI/index" });
};
</script>

<style scoped>
.pickTime {
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 25px;
  margin-top: 20px;
}
.PickerModal {
  overflow: hidden;
  position: fixed;
  top: 0px;
  z-index: 1500;
  display: flex;
  flex-direction: column;
}

.scrollContainer {
  display: flex;
  flex-direction: row;
}
.buttonContainer {
  display: flex;
  flex-direction: row;
}

.pickerCancel {
  border-radius: 15px;
  background-color: #fff;
  width: 40%;
  color: #9b2fff;
  font-size: 20px;
  font-weight: 600;
}

.pickerIdentify {
  border-radius: 15px;
  background-color: #9b2fff;
  width: 40%;
  font-size: 20px;
  font-weight: 600;
	color: #FFFFFF;
}
.in-range {
  background-color: #007bff;
}
.main-container {
	position: relative;
}
/* 日程较多时，该行会拉伸height */
.autoHeight {
  display: flex;
  flex-wrap: wrap;
}
.whiteFont {
	width: 100%;
	text-align: center;
	color: #fff;
}
.dayContainer {
  border: 1px solid #efecec;
  width: calc(100vw / 7);
  box-sizing: border-box;
  padding-bottom: 2px;
	background-color: #fff;
}
.all-btn {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  min-height: 16vh;
  align-content: center;
  flex: 1;
}
.fixed {
  width: 100%;
  height: 100%;
	position: relative;
}
.calendarBackground {
	height: 20vh;
	z-index: -1000;
	width: 100vw;
	background: linear-gradient(180deg, #8E1DF1 0%, rgba(142, 29, 241, 0) 100%);
	backdrop-filter: blur(13.5914px);
	position: absolute;
}
.user-avatar {
  border-radius: 50%;
  height: 25px;
  width: 25px;
}
.chooseDateBtn {
	height: 10px;
	width: 10px;
	padding-left: 5px;
}
.calendar-select {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 一个个日程 */
.duty-item {
  width: 95%;
  text-align: center;
  border-radius: 10px;
  height: 20px;
  margin-top: 2px;
  line-height: 20px;
  font-size: 16px;
  overflow: hidden;
}

/* ai图标部分 */
movable-area {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  pointer-events: none;
}
movable-view {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
}

.icon-image {
  width: 60px;
  height: 60px;
  display:fixed;
  
}
</style>
