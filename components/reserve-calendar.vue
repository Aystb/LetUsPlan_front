<template>
  <view class="main-container">
    <view class="fixed">
      <view class="flex-x justify-end items-center mt-20 relative">
        <view class="flex-x justify-center calendar-select absolute">
          <text class="ft-20">{{ curYear }}年{{ curMonth }}月</text>
          <img src="../static/倒三角 1.png" @click="showPicker()" />
        </view>

        <!-- 点击头像登录 -->
        <image
          src="/static/user-avatar.png"
          class="user-avatar mr-20"
          @click="login()"
        ></image>
      </view>

      <!--日期选择部分-->
      <view
        class="flex-y mt-5"
        v-for="(row, index1) in Array.from({ length: weeks })"
        :key="index1"
      >
        <!-- 生成行 -->
        <view class="flex-x">
          <view
            class="flex-fill shrink"
            v-for="(week, index2) in Array.from({ length: 7 })"
            :key="index2"
          >
            <!-- 生成日期 -->
            <text class="ml-20" v-if="index1 == 0">{{
              weekTitle(index2)
            }}</text>

            <view v-if="isShow(index1, index2)" class="dayContainer">
              <!--日期方块组件-->
              <view
                @click="choose(index1, index2)"
                :class="['all-btn']"
                :style="{ border: '1px solid #efecec' }"
                >{{
                  curMonthArray[
                    index1 * 7 + index2 - curMonthBasicInfo.startIndex
                  ]?.date
                }}
              </view>
              <view @click="showMyDuty()">点击安排日程</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <ModalComponents :visible="IsShowPicker" class="PickerModal">
    <p class="pickTime" style="color: #a4a4a4">
      {{ PickerCurYear }}年{{ PickerCurMonth }}月
    </p>
    <br />
    <view class="scrollContainer">
      <scrollPicker v-model="PickerCurYear" type="year" />
      <scrollPicker v-model="PickerCurMonth" type="month" />
    </view>
    <view class="buttonContainer">
      <button class="pickerCancel" @click="pickerCancel">取消</button>
      <button class="pickerIdentify" @click="pickerIdentify">确认</button>
    </view>
  </ModalComponents>
</template>

<script setup>
import { watch, ref, onMounted, computed } from "vue";
import api from "../request/api";
import { getRangeDates } from "../js/date";
import { dateInfo, monthDate } from "../static/staticData";
import scrollPicker from "./scrollPicker.vue";
import ModalComponents from "./ModalComponents.vue";

const IsShowPicker = ref(false);

const props = defineProps({});

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

  static_calendar.value = getRangeDates(year, month, 12);

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
  var day = index2 + index1 * 7;
  if (
    day < curMonthBasicInfo.value.startIndex ||
    day >= curMonthBasicInfo.value.startIndex + curMonthBasicInfo.value.length
  ) {
    return false;
  }
  return true;
};

function pickerCancel() {
  IsShowPicker.value = !IsShowPicker.value;
}

function pickerIdentify() {
  curMonth.value = PickerCurMonth.value;
  curYear.value = PickerCurYear.value;
  IsShowPicker.value = !IsShowPicker.value;
}

//选择这个按钮
function choose(index1, index2) {
  var index = index1 * 7 + index2; //日期
  var chooseDate =
    curMonthArray.value[index - curMonthBasicInfo.value.startIndex].date;

  console.log("当前选择日期：", chooseDate);
}

// 登录/切换账号
function login() {
  console.log("切换账号/返回");
}

// 显示添加日程的组件
const emit = defineEmits(["showMyDuty", "update:month-year"]);

function showMyDuty() {
  emit("showMyDuty");
  console.log("click");
}
</script>

<style scoped>
.pickTime {
  text-align: center;
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
  border-radius: 1px;
  background-color: #ededed;
  width: 40%;
}

.pickerIdentify {
  border-radius: 1px;
  background-color: #deb0ff;
  width: 40%;
}
.in-range {
  background-color: #007bff;
}

.all-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 120rpx;
}
.fixed {
  position: fixed;
  /* top: 20vh; */
  /* left: 0px; */
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
}

.user-avatar {
  border-radius: 50%;
  height: 32px;
  width: 32px;
}

.calendar-select {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
