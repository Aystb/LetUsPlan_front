"use strict";
const common_vendor = require("../common/vendor.js");
require("../request/api.js");
const _sfc_main = {
  __name: "otherLogin",
  props: {
    isCheckAgreement: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const phoneNumberValid = common_vendor.ref(false);
    const verificationCodeValid = common_vendor.ref(false);
    const phoneNumberIsValid = common_vendor.ref(false);
    const sendCodeBtnText = common_vendor.ref("发送验证码");
    common_vendor.ref(60);
    const isCountTime = common_vendor.ref(false);
    function sendVerificationCode() {
      if (isCheckAgreement.value == false) {
        shouldHighlight.value = true;
        setTimeout(() => {
          shouldHighlight.value = false;
        }, 1e3);
      } else {
        if (phoneNumberIsValid.value == ture)
          ;
      }
    }
    function login() {
      if (props.isCheckAgreement == false) {
        console.log("请勾选用户协议");
        return;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.validatePhone && _ctx.validatePhone(...args)),
        b: phoneNumberValid.value,
        c: _ctx.phoneNumber,
        d: common_vendor.o(($event) => _ctx.phoneNumber = $event.detail.value),
        e: verificationCodeValid.value,
        f: _ctx.verificationCode,
        g: common_vendor.o(($event) => _ctx.verificationCode = $event.detail.value),
        h: common_vendor.t(sendCodeBtnText.value),
        i: common_vendor.o(($event) => sendVerificationCode()),
        j: isCountTime.value,
        k: common_vendor.o(($event) => _ctx.verifyCode()),
        l: common_vendor.o(($event) => login())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8ba4e267"]]);
wx.createComponent(Component);
