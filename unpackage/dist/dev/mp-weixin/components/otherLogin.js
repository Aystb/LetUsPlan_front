"use strict";
const common_vendor = require("../common/vendor.js");
const request_api = require("../request/api.js");
const store_alertStore = require("../store/alertStore.js");
if (!Math) {
  Alert();
}
const Alert = () => "./alert.js";
const _sfc_main = {
  __name: "otherLogin",
  props: {
    isCheckAgreement: {
      type: Boolean,
      default: false
    }
  },
  emits: ["openHighlight", "closeHighlight"],
  setup(__props, { emit: __emit }) {
    const alertStore = store_alertStore.useAlertStore();
    const props = __props;
    const emit = __emit;
    const phoneNumberValid = common_vendor.ref(false);
    const verificationCodeValid = common_vendor.ref(false);
    const phoneNumberIsValid = common_vendor.ref(true);
    const sendCodeBtnText = common_vendor.ref("发送验证码");
    const countDownTime = common_vendor.ref(60);
    const isCountTime = common_vendor.ref(false);
    const phoneNumber = common_vendor.ref();
    const verificationCode = common_vendor.ref();
    async function sendVerificationCode() {
      if (props.isCheckAgreement == false) {
        emit("openHighlight");
        setTimeout(() => {
          emit("closeHighlight");
        }, 1e3);
      } else {
        if (phoneNumberIsValid.value) {
          await request_api.api.sendCode({
            phone: phoneNumber.value
          });
          alertStore.setSuccess("验证码已发送");
          let countdown = setInterval(() => {
            if (countDownTime.value > 0) {
              sendCodeBtnText.value = countDownTime.value;
              countDownTime.value--;
            } else {
              clearInterval(countdown);
              sendCodeBtnText.value = "发送验证码";
            }
          }, 1e3);
          countDownTime.value = 60;
        }
      }
    }
    async function login() {
      if (props.isCheckAgreement == false) {
        alertStore.setWarning("请勾选用户协议");
        return;
      }
      var res = await request_api.api.loginByCode({ phone: phoneNumber.value, code: verificationCode.value });
      if (res.user_id > 0) {
        alertStore.setSuccess("登录成功");
        return res.user_id;
      }
      if (res.user_id == -1) {
        alertStore.setAlert("验证码错误");
        return;
      }
      if (res.user_id == -2) {
        var res = await request_api.api.register({ phone: phoneNumber.value, code: verificationCode.value });
        if (res.user_id > 0) {
          alertStore.setSuccess("注册成功");
          return res.user_id;
        }
        if (res.user_id == -2) {
          alertStore.setAlert("验证码错误");
          return;
        }
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.validatePhone && _ctx.validatePhone(...args)),
        b: phoneNumberValid.value,
        c: phoneNumber.value,
        d: common_vendor.o(($event) => phoneNumber.value = $event.detail.value),
        e: verificationCodeValid.value,
        f: verificationCode.value,
        g: common_vendor.o(($event) => verificationCode.value = $event.detail.value),
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
