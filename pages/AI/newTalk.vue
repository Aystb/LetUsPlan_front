<template>
  <view>
    <view class="flex-y pd-10  ">
      <view class="flex-x justify-between">
        <u-icon @click="cancel()" name="close" size="22"></u-icon>
        <view class=" flex-x items-center">
          <img class="robotImg" src="../../static/ai-helper.png" />
          <text  style="font-family: inter">AI助手</text></view
        >
        <view></view>
      </view>

      <view class="flex-y flex-center-horizontal item-con">
        <view class="flex-x items-center self-start">
          <img class="robotImg" src="../../static/character.png"  /> 
          <text class="ml-10 fw-600">角色</text
          >
        </view>
        <input
          class="characterInput"
          type="text"
          v-model="role"
          placeholder="输入完成任务的角色"
        /><!--角色-->
        <view class="flex-x items-center self-start">
          <img class="robotImg" src="../../static/duty.png"  /><text class="ml-10 fw-600">任务</text>
        </view>

        <input
          class="dutyInput"
          type="text"
          v-model="task"
          placeholder="描述你要完成的任务"
        /><!--任务-->
        <view class="flex-x items-center self-start">
          <img class="robotImg" src="../../static/timegap.png"  /><text class="ml-10 fw-600"
            >时间区间</text
          >
        </view>
        <input
          class="timeInput"
          type="text"
          v-model="time"
          placeholder="在哪个时间段完成呢"
        /><!--时间区间-->
        <view class="flex-x items-center self-start">
          <img class="robotImg" src="../../static/reqiurement.png"  /><text class="ml-10 fw-600"
            >补充要求</text
          >
        </view>
        <textarea
          class="requermentInput"
          cols="30"
          rows="10"
          v-model="additional"
          placeholder="任何补充的要求都可以哦"
        ></textarea
        ><!--补充要求-->
      </view>

      <view class="generate"
        ><button class="confirm" style="color: white" @click="confirm()">
          生成安排
        </button></view
      >
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

import api from "../../request/api";
import { useUserStone } from "../../store/userStore";
import { getTimeStamp } from "../../js/time";
const userStone = useUserStone();

const date = new Date(); // 获取当前日期和时间
const year = date.getFullYear(); // 获取年份
const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份，月份从0开始，所以加1
const day = date.getDate().toString().padStart(2, "0"); // 获取日期

const role = ref();
const task = ref();
const time = ref();
const additional = ref();

async function confirm() {
  var res = await api.createNewChat({
    role: role.value || "你是一个帮我安排任务的时间助手",
    task: task.value || "待定任务",
    time: time.value || `${year}-${month}-${day}`,
    additional: additional.value || "无额外要求",
    lastUpdateTime: getTimeStamp(),
  });
  userStone.nowRequestAIHistoryId = res.chatId;

  role.value = "";
  task.value = "";
  time.value = "";
  additional.value = "";

  uni.navigateTo({ url: "/pages/AI/index" });
}

function cancel() {
  uni.navigateTo({ url: "/pages/AI/index" });
}
</script>

<style scoped>
.characterInput,
.dutyInput,
.timeInput {
  width: 100%;
  background-color: #F5E8FF;
  border-radius: 20px;
  margin-top: 1vh;
  margin-bottom: 1vh;
  height: 4vh;
  padding-left: 3vh;
}
.requermentInput {
  width: 100%;
  background-color: #F5E8FF;
  border-radius: 20px;
  margin-top: 1vh;
  margin-bottom: 1vh;
  height: 10vh;
  padding-left: 3vh;
  padding-top: 1vh;
}

.characterInput,
.dutyInput,
.timeInput,
.requermentInput ::placeholder {
  font-size: 16px;
  color: #7a7979;
}

.close-start {
  margin-right: auto;
}

.tip {
  font-size: 12px;
}
.btn-bottom {
  position: relative;
}

.generate {
  margin-top: 6vh;
  width: 100%;
}
.confirm {
  background-color: #ac52ff;
  width: 60%;
  border: 1px solid rgb(163, 120, 163);
  color: rgb(163, 120, 163);
}
.item-con{
 margin:50px
}
.robotImg{
  height: 2rem;
  width: 2rem;
}
</style>
