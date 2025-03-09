<template>
  <view>
    <view class="banner">
      <u-icon @click="cancel()" name="close" size="22"></u-icon>
      <view class="flex-x">
        <img src="../../static/ai-helper.png" />
        <img src="../../static/AI助手.png" /> </view
      ><view> </view>
    </view>

    <view class="UP">
      <view class="character">
        <view class="flex-x">
          <img src="../../static/character.png" class="characterIcon" /><img
            src="../../static/角色.png"
          />
        </view>
        <input
          class="characterInput"
          type="text"
          v-model="role"
          placeholder="输入完成任务的角色"
        />
      </view>

      <view class="duty"
        ><view class="flex-x">
          <img src="../../static/duty.png" class="dutyIcon" /><img
            src="../../static/任务.png"
          />
        </view>

        <input
          class="dutyInput"
          type="text"
          v-model="task"
          placeholder="描述你要完成的任务"
      /></view>
      <!--任务-->

      <view class="timeGap"
        ><view class="flex-x">
          <img src="../../static/timegap.png" class="timeIcon" /><img
            src="../../static/时间区间.png"
          />
        </view>
        <input
          class="timeInput"
          type="text"
          v-model="time"
          placeholder="在哪个时间段完成呢"
        /><!--时间区间--></view
      >

      <view class="requerment"
        ><view class="flex-x">
          <img src="../../static/reqiurement.png" class="requermentIcon" /><img
            src="../../static/补充要求.png"
          />
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
      <img
        src="../../static/生成安排.png"
        @click="confirm()"
        class="generate"
      />
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
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.UP {
  /* display: flex; */
  width: 90%;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.UP > view {
  margin-top: 2vh;
}

.flex-x {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 水平起始对齐 */
  margin-bottom: 2vh; /* 图标和文本与输入框的间距 */
}

.flex-x img {
  margin-right: 2vh; /* 图标与文本的间距 */
}

.character,
.duty,
.requerment,
.timeGap {
  margin-top: 1vh;
}
.characterInput,
.dutyInput,
.timeInput {
  width: 80%;
  background-color: #deb0ff;
  border-radius: 20px;
  margin-top: 1vh;
  margin-bottom: 1vh;
  height: 4vh;
  padding-left: 3vh;
}
.requermentInput {
  width: 80%;
  background-color: #deb0ff;
  border-radius: 20px;
  margin-top: 1vh;
  margin-bottom: 5vh;
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

.generate {
  display: block;
  margin: 0 auto;
}
/* .confirm {
  background-color: #ac52ff;
  width: 60%;
  border: 1px solid rgb(163, 120, 163);
  color: rgb(163, 120, 163);
} */
</style>
