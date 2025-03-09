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
      <view class="userText">
        <textarea
          auto-height="true"
          @keydown="textKeyDown"
          class="userInput"
          type="text"
          v-model="userInputText"
          placeholder="发消息..."
        ></textarea>
        <view
          ><svg
            v-if="answerEndFlag"
            class="sendMes"
            @click="sendMes"
            t="1739774614593"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7327"
            width="200"
            height="200"
          >
            <path
              d="M938.666667 337.92v348.586667c0 150.613333-96.896 252.16-241.493334 252.16H327.253333C182.613333 938.666667 85.333333 837.12 85.333333 686.506667V337.92C85.333333 186.88 182.613333 85.333333 327.253333 85.333333h369.92C841.770667 85.333333 938.666667 186.88 938.666667 337.92zM480 415.146667v270.933333c0 17.92 14.506667 32 32 32 17.92 0 32-14.08 32-32V415.146667l105.386667 105.813333c5.973333 5.973333 14.506667 9.386667 22.613333 9.386667 8.064 0 16.213333-3.413333 22.613333-9.386667 12.373333-12.373333 12.373333-32.853333 0-45.226667l-160-160.853333a33.024 33.024 0 0 0-45.226666 0l-160 160.853333c-12.373333 12.373333-12.373333 32.853333 0 45.226667 12.8 12.373333 32.853333 12.373333 45.653333 0l104.96-105.813333z"
              fill="#130F26"
              p-id="7328"
            ></path></svg
          ><svg
            v-if="!answerEndFlag"
            class="sendMes"
            t="1740661984632"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="17714"
            width="200"
            height="200"
          >
            <path
              d="M938.666667 686.250667V337.749333C938.666667 186.752 841.557333 85.333333 696.96 85.333333h-369.92C182.442667 85.333333 85.333333 186.752 85.333333 337.749333v348.501334C85.333333 837.205333 182.485333 938.666667 327.082667 938.666667h369.877333C841.557333 938.666667 938.666667 837.205333 938.666667 686.250667z"
              fill="#200E32"
              opacity=".4"
              p-id="17715"
            ></path>
            <path
              d="M694.613333 475.52L534.613333 314.88a32.981333 32.981333 0 0 0-45.397333 0L329.386667 475.52a32 32 0 0 0 45.397333 45.184l105.258667-105.728v271.146667a32 32 0 1 0 64 0V415.018667l105.216 105.642666a31.957333 31.957333 0 0 0 45.269333 0.128 32.042667 32.042667 0 0 0 0.085333-45.269333z"
              fill="#200E32"
              p-id="17716"
            ></path></svg
        ></view>
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

const requestNowHistoryStore = ref({ chatId: 2, user_id: 1, messages: [] });
const alertStore = useAlertStore();

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
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 边框 + 阴影 */
  display: flex;
  align-self: center;
  width: 93%;
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
  width: 90vw;
  background-color: antiquewhite;
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
