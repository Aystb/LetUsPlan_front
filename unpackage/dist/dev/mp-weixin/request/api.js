"use strict";
const request_index = require("./index.js");
const store_userStore = require("../store/userStore.js");
const common_vendor = require("../common/vendor.js");
const userStone = store_userStore.useUserStone();
const request = new request_index.Request().http;
function post(url, header2, data) {
  return request({
    url,
    method: "POST",
    header: header2,
    data
  });
}
const apikey = "Bearer sk-w24u2zglNxNY2v8rFa46Ff3b6aBd451083F902242d003aBb";
let header = { Authorization: apikey };
function aiGet(url, data) {
  return request({
    url,
    method: "GET",
    header,
    data
  });
}
function aiPost(url, data) {
  return request({
    url,
    method: "POST",
    header,
    data
  });
}
const api = {
  //密码登录
  //验证码登陆
  //注册
  //发送短信
  //请求所有可用的模型
  async requestAllModels() {
    var url = "https://api.gpt.ge/v1/models";
    return await aiGet(url, {});
  },
  //普通请求
  async requestChatPerTime(data) {
    var url = "https://api.gpt.ge/v1/chat/completions";
    return await aiPost(url, data);
  },
  //普通请求，并携带历史记录
  async requestChatWithHistory(data) {
    var url = "https://api.gpt.ge/v1/chat/completions";
    return await aiPost(url, data);
  },
  //向后端传输流式请求需要的参数（模式，是否带历史记录等参数）
  async sendStreamData(data) {
    var url = `http://127.0.0.1:8000/LetUsPlan/AI/${userStone.userid}/GetStreamData`;
    return await post(url, {}, data);
  }
};
function useStreamData(url) {
  const data = common_vendor.ref("");
  let eventSource = null;
  const startStreaming = async (requestData) => {
    await api.sendStreamData(requestData);
    if (eventSource) {
      console.warn("Stream started!");
      return;
    }
    eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        stopStreaming();
      } else {
        data.value += event.data;
        console.log(event.data);
      }
    };
    eventSource.onerror = (error) => {
      console.error("Stream error:", error);
      stopStreaming();
    };
  };
  const stopStreaming = () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
      console.log("stream received over");
    }
  };
  common_vendor.onUnmounted(() => {
    stopStreaming();
  });
  return {
    data,
    // 响应式数据
    startStreaming,
    // 开始流式请求
    stopStreaming
    // 停止流式请求
  };
}
exports.api = api;
exports.useStreamData = useStreamData;
