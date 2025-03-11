<!--ai对话模块-->

<template>
  <view class="flex-y">
    <view class="banner">
      <view
        ><img src="../../static/xiaozi.png" />
        <img src="../../static/首部.png" alt=""
      /></view>

      <view>
        <img
          class="newTalk"
          @click="openNewTalk()"
          src="../../static/newTalk.png"
        />
        <img
          @click="jumpToHistory()"
          class="historyIcon"
          src="../../static/historyTalk.png"
        />
      </view>
    </view>
    <view class="flex-y">
      <talkMode></talkMode>

      <!--展示聊天记录,v-for根据用户是user还是system来判断渲染模式-->
      <view class="flex-y wd-100">
        <view
          v-for="(item, index) in requestNowHistoryStore.messages"
          :key="index"
        >
          <view class="system" v-if="item.role == 'system'">
            {{ item.content }}</view
          >
          <view class="humanSide" v-if="item.role == 'user'">
            {{ item.content }}</view
          >
          <view class="aiSide" v-if="item.role == 'assistant'">{{
            item.content
          }}</view>
        </view>
      </view>
      <view class="userText" v-if="!isTalking">
        <img src="../../static/语音.png" @click="voiceInput" />
        <textarea
          auto-height="true"
          @keydown="textKeyDown"
          class="userInput"
          type="text"
          v-model="userInputText"
          placeholder="发消息..."
        ></textarea>
        <img
          src="../../static/加号.png"
          class="otherInput"
          @click="otherInput"
        />
        <img src="../../static/发送.png" class="sendMes" @click="sendMes()" />
      </view>

      <view class="userTalk" v-if="isTalking">
        <img src="../../static/键盘.png" @click="keyboardInput()" />
        <img
          src="../../static/按住说话.png"
          class="talking"
          @touchstart="startTalking"
          @touchend="stopTalking"
          @touchcancel="cancelTalking"
        />
        <view
          ><img
            src="../../static/加号.png"
            class="otherInput"
            @click="otherInput()"
          />
          <img src="../../static/发送.png" class="sendMes" @click="sendMes()" />
        </view>
      </view>
      <alert></alert>
    </view>
  </view>
</template>

<script setup>
import { useAlertStore } from "../../store/alertStore";
import alert from "../alert.vue";
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  onDeactivated,
  computed,
} from "vue";
import { useStreamData } from "../../request/api";
import { useUserStone } from "../../store/userStore";
import api from "../../request/api";
import talkMode from "./talkMode.vue";
import { useRequestModeStore } from "../../store/requestModeStore";
import { useRequestHistoryStore } from "../../store/requestHistoryStore";
const userStone = useUserStone();
const { data, startStreaming, streamEndFlag } = useStreamData(
  `http://127.0.0.1:8000/LetUsPlan/AI/${userStone.userid}/StreamData`
);
const requestModeStore = useRequestModeStore();
const userInputText = ref("");
const isTalking = ref(false);
const requestNowHistoryStore = ref({ chatId: 2, user_id: 1, messages: [] });
const alertStore = useAlertStore();
const originalImage = require("../../static/按住说话.png"); // 原始图片路径
const talkingImage = require("../../static/说话中.png"); // 说话中的图片路径
const currentImage = ref(originalImage); // 默认显示原始图片
const startTalking = () => {
  currentImage.value = talkingImage;
};

const stopTalking = () => {
  currentImage.value = originalImage;
};
//用户可以主动暂停的逻辑还没实现

//监听到flag变化的时候，也就是流结束，再改变历史记录中动态的部分为静态，不然会出现覆盖的情况
watch(
  () => {
    return streamEndFlag.value;
  },
  (oldValue, newValue) => {
    if (oldValue == true) {
      requestNowHistoryStore.value.messages.pop();
      requestNowHistoryStore.value.messages.push({
        role: "assistant",
        content: data.value,
      });
      data.value = "";
    }
  }
);

onMounted(async () => {
  await useRequestHistoryStore().loadHistory(); //从后端拉取后赋值

  requestNowHistoryStore.value =
    useRequestHistoryStore().contents[userStone.nowRequestAIHistoryId - 1];
  //如果是第一次进入或者上次进入没有等ai回答完（历史记录底端不是ai的回答），将会自动回答，默认sse模式
  if (
    requestNowHistoryStore.value.messages[
      requestNowHistoryStore.value.messages.length - 1
    ].role != "assistant"
  ) {
    requestAi();
  }
});
//在组件销毁，隐藏之前上传历史记录，短时间多次请求，可能会有问题，需要解除异步请求，但是过于复杂，以后再研究
onBeforeUnmount(async () => {
  //注意，无论是哪个模式，都需要设置不能在回答没有完毕的时候上传内容
  //普通模式
  if (requestModeStore.stream == false) {
    const res = await api.updateSingleHistory(requestNowHistoryStore.value);
  }
  //流式模式
  else if (requestModeStore.stream == true) {
    if (streamEndFlag.value) {
      const res = await api.updateSingleHistory(requestNowHistoryStore.value);
    }
  }
});

onDeactivated(async () => {
  //注意，无论是哪个模式，都需要设置不能在回答没有完毕的时候上传内容
  //普通模式
  if (requestModeStore.stream == false) {
    const res = await api.updateSingleHistory(requestNowHistoryStore.value);
  }

  //流式模式
  else if (requestModeStore.stream == true) {
    if (streamEndFlag.value) {
      const res = await api.updateSingleHistory(requestNowHistoryStore.value);
    }
  }
});

//查看可用模型
async function requestAllModels() {
  let res = await api.requestAllModels();
  console.log(res);
}
//当前ai回答是否结束的封装标志，用这个判断用户能否输入
const answerEndFlag = computed(() => {
  if (requestModeStore.stream == true) {
    if (streamEndFlag.value == false) {
      return false;
    }
  }
  if (requestModeStore.stream == false) {
    if (
      requestNowHistoryStore.value.messages[
        requestNowHistoryStore.value.messages.length - 1
      ].role != "assistant"
    ) {
      return false;
    }
  }
  return true;
});

//绑定textarea的按钮事件
const textKeyDown = (event) => {
  if (event.key == "Enter") {
    event.preventDefault();

    if (!answerEndFlag.value) {
      return;
    }
    sendMes();
  }
};

//发送请求
const sendMes = () => {
  if (userInputText.value == "") {
    alertStore.setWarning("请输入要提问的内容");
    return;
  } else {
    requestNowHistoryStore.value.messages.push({
      role: "user",
      content: userInputText.value,
    });
    requestAi();
    userInputText.value = "";
  }
};

function voiceInput() {
  isTalking.value = !isTalking.value;
}

function keyboardInput() {
  isTalking.value = !isTalking.value;
}

function otherInput() {}

//发起请求
function requestAi() {
  if (requestModeStore.stream == false) {
    requestChat3_5Per();
  }
  if (requestModeStore.stream == true) {
    requestStreamData();
    requestNowHistoryStore.value.messages.push({
      role: "assistant",
      content: data,
    });
  }
}

//普通请求
async function requestChat3_5Per() {
  //暂时用静态数据测试,详情查阅api文档
  let data = {
    model: requestModeStore.model,
    messages: requestNowHistoryStore.value.messages,
    // [
    //     {
    //         role: "user",
    //         content: "早上好！"
    //     },],
    temperature: requestModeStore.temperature,
    max_tokens: requestModeStore.max_tokens,
    stream: false,
  };
  let res = await api.requestChatPerTime(data);

  requestNowHistoryStore.value.messages.push(res.choices[0].message);
  //console.log(res.choices[0].message)
}

//请求流式数据
async function requestStreamData() {
  let data = {
    model: requestModeStore.model,
    messages: requestNowHistoryStore.value.messages,
    stream: true,
    temperature: requestModeStore.temperature,
    max_tokens: requestModeStore.max_tokens,
  };
  startStreaming(data);
}

function openNewTalk() {
  uni.navigateTo({ url: "/pages/AI/newTalk" });
}

function jumpToHistory() {
  uni.navigateTo({ url: "/pages/AI/talkHistory" });
}
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.banner > view {
  display: flex;
  align-items: center; /* 使内部图片垂直居中对齐 */
}

.sendMes {
  width: 30px;
  height: 30px;
}
.userText {
  position: fixed;
  bottom: 20px;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid gray;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 边框 + 阴影 */
  display: flex;
  align-self: center;
  width: 80%;
  height: 5vh;
}

.userTalk {
  position: fixed;
  bottom: 20px;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid gray;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 边框 + 阴影 */
  display: flex;
  align-self: center;
  width: 80%;
  height: 5vh;
  justify-content: space-between;
}

.aiSide {
  background-color: aqua;
  border-radius: 10px;
  margin: 10px 20px 10px 20px;
  padding: 10px;
}
.humanSide {
  border-radius: 10px;
  margin: 10px 20px 10px 20px;
  padding: 10px;
  background-color: aquamarine;
}
.system {
  border-radius: 10px;
  margin: 10px 20px 10px 20px;
  background-color: bisque;
  padding: 10px;
}
.userInput {
  margin-left: 1vh;
  width: 90vw;
}

.sendMes {
  margin-left: 0.8vh;
  margin-right: 0.8vh;
}
.newTalk {
  border-radius: 20px;
  padding: 10px;
}
.historyIcon {
  width: 30px;
  height: 30px;
}
</style>
