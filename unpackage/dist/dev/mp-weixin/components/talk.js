"use strict";
const common_vendor = require("../common/vendor.js");
const request_api = require("../request/api.js");
const store_userStore = require("../store/userStore.js");
if (!Math) {
  talkMode();
}
const talkMode = () => "./talkMode.js";
const _sfc_main = {
  __name: "talk",
  setup(__props) {
    const userStone = store_userStore.useUserStone();
    const { data, startStreaming } = request_api.useStreamData(`http://127.0.0.1:8000/LetUsPlan/AI/${userStone.userid}/StreamData`);
    async function requestAllModels() {
      let res = await request_api.api.requestAllModels();
      console.log(res);
    }
    async function requestChat3_5Per() {
      let data2 = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "早上好！"
          }
        ],
        temperature: 0.5,
        max_tokens: 800,
        stream: false
      };
      let res = await request_api.api.requestChatPerTime(data2);
      console.log(res.choices[0].message);
    }
    async function requestStreamData() {
      let data2 = {
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": "Hello, OpenAI!please give me a long paragraph" }],
        stream: true,
        temperature: 0.5,
        max_tokens: 550
      };
      startStreaming(data2);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => requestAllModels()),
        b: common_vendor.o(($event) => requestChat3_5Per()),
        c: common_vendor.o(($event) => requestStreamData()),
        d: common_vendor.t(common_vendor.unref(data))
      };
    };
  }
};
wx.createComponent(_sfc_main);
