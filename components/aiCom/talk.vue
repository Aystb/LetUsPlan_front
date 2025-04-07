<!--ai对话模块-->

<template>
  <view class="flex-y con">
    <view class="flex-x items-center header ">
      <view class="flex-x items-center"> <img src="../../static/ai-helper.png" class="ai-helper"><text class="ft-20 fw-800">小紫</text></view>
      <view class="flex-x items-center " >
      <view class="newTalk" @click="openNewTalk()"> +新对话</view>
      <svg
        @click="jumpToHistory()"
        t="1739877888904"
        class="historyIcon ml-10"
        viewBox="0 0 1118 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="10896"
        width="200"
        height="200"
      >
        <path
          d="M581.818182 187.671273 581.818182 528.290909 824.366545 671.232 847.965091 631.156364 628.363636 500.549818 628.363636 187.671273Z"
          p-id="10897"
        ></path>
        <path
          d="M202.053818 744.96 149.038545 744.96C233.797818 910.615273 406.202182 1024 605.090909 1024c282.763636 0 512-229.236364 512-512 0-282.763636-229.236364-512-512-512C354.117818 0 145.314909 180.596364 101.515636 418.909091L0 418.909091l116.363636 139.636364L232.727273 418.909091 148.945455 418.909091C192.093091 206.475636 379.904 46.545455 605.090909 46.545455c257.070545 0 465.454545 208.384 465.454545 465.454545s-208.384 465.454545-465.454545 465.454545C432.919273 977.454545 282.530909 883.944727 202.053818 744.96z"
          p-id="10898"
        ></path>
      </svg>
    </view>
    </view>
    <view class="flex-y">
      <talkMode></talkMode>

      <!--展示聊天记录,v-for根据用户是user还是system来判断渲染模式-->
      <view class="flex-y wd-100">
        <scroll-view scroll-y>
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
          <view class="bottom-upper"></view>
        </scroll-view>
      </view>
      <view class="userTextCon">
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
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="17714"
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
              ></path>
            </svg>
          </view>
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
.con {
  background-color: #f3f3f3;
  height: 100%;
  min-height: 100vh;
  display: flex;
}

.sendMes {
  width: 30px;
  height: 30px;
}
.userTextCon {
  position: fixed;
  bottom: 0;

  align-self: center;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  background-color: rgba(243, 243, 243, 1);
  height: 80px;
}
.userText {
  padding: 20px;

  border-radius: 30px;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 边框 + 阴影 */
  display: flex;
  width: 92%;
  background-color: rgba(255, 255, 255, 1);
}

.aiSide {
  background-color: #ffffff;
  border-radius: 10px;
  margin: 20px 20px 10px 20px;
  padding: 10px;
  white-space: normal; /* 允许文本换行 */
  word-wrap: break-word; /* 超出边界时换行 */
}
.humanSide {
  border-radius: 10px;
  margin: 20px 20px 10px 20px;
  padding: 10px;
  background-color: #f3e3ff;
  white-space: normal; /* 允许文本换行 */
  word-wrap: break-word; /* 超出边界时换行 */
}
.system {
  border-radius: 10px;
  margin: 20px 20px 10px 20px;
  background-color: #ffffff;
  padding: 10px;
  white-space: normal; /* 允许文本换行 */
  word-wrap: break-word; /* 超出边界时换行 */
}
.userInput {
  width: 90vw;
  overflow-y: hidden;
  max-height: 50px;
}
.newTalk {
  background-color: #e4efff;
  font-weight: 500;
  color: #1296db;
  border-radius: 20px;
  padding: 10px;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.historyIcon {
  width: 30px;
  height: 30px;
}
.bottom-upper {
  height: 100px;
}
.header{
  margin-top:20px;
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
