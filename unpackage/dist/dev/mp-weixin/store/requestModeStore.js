"use strict";
const common_vendor = require("../common/vendor.js");
const useRequestModeStore = common_vendor.defineStore("requestModeStore", () => {
  const model = common_vendor.ref("gpt-3.5-turbo");
  const max_tokens = common_vendor.ref(1600);
  const temperature = common_vendor.ref(0.5);
  const stream = common_vendor.ref(false);
  const n = common_vendor.ref(1);
  const presence_penalty = common_vendor.ref(0);
  const frequency_penalty = common_vendor.ref(0);
  return { model, max_tokens, temperature, stream, n, presence_penalty, frequency_penalty };
});
exports.useRequestModeStore = useRequestModeStore;
