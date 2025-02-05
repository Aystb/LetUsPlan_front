"use strict";
const common_vendor = require("../common/vendor.js");
const store_requestModeStore = require("../store/requestModeStore.js");
const _sfc_main = {
  __name: "talkMode",
  props: {},
  setup(__props) {
    const visible = common_vendor.ref(false);
    const requestModeStore = store_requestModeStore.useRequestModeStore();
    const model = common_vendor.ref("gpt-3.5-turbo");
    const max_tokens = common_vendor.ref(1600);
    const temperature = common_vendor.ref(0.5);
    const stream = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(requestModeStore).model),
        b: common_vendor.o(($event) => visible.value = !visible.value),
        c: visible.value
      }, visible.value ? {
        d: common_vendor.t(model.value),
        e: common_vendor.t(max_tokens.value),
        f: common_vendor.t(temperature.value),
        g: common_vendor.t(stream.value)
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
