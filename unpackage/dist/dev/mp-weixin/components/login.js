"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const request_api = require("../request/api.js");
if (!Array) {
  const _component_Text = common_vendor.resolveComponent("Text");
  _component_Text();
}
if (!Math) {
  (otherLogin + ModalComponent)();
}
const ModalComponent = () => "./ModalComponents.js";
const otherLogin = () => "./otherLogin.js";
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const isCheckAgreement = common_vendor.ref(false);
    const isModalVisible = common_vendor.ref(false);
    const shouldHighlight = common_vendor.ref(false);
    const btnText = common_vendor.ref("手机验证");
    const isChangeBtn = common_vendor.ref(false);
    function checked() {
      isCheckAgreement.value = !isCheckAgreement.value;
    }
    function openAgreement() {
      isModalVisible.value = true;
    }
    function hideModal() {
      isModalVisible.value = false;
    }
    function loginByWx_quick() {
      if (isCheckAgreement.value == false) {
        shouldHighlight.value = true;
        setTimeout(() => {
          shouldHighlight.value = false;
        }, 1e3);
      } else {
        common_vendor.index.login({
          success: function(res) {
            if (res.code) {
              var res = request_api.api.loginByWx({ code: res.code });
              console.log(res);
            } else {
              console.log("登录失败: " + res.errMsg);
            }
          },
          fail: function(err) {
            console.log("uni.login 调用失败", err);
          }
        });
      }
    }
    function loginByPhone_other() {
      isChangeBtn.value = !isChangeBtn.value;
      if (isChangeBtn.value == true) {
        btnText.value = "手机快捷登陆";
      } else {
        btnText.value = "手机验证";
      }
    }
    function onOpenHighlight() {
      shouldHighlight.value = true;
    }
    function onCloseHighlight() {
      shouldHighlight.value = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: !isChangeBtn.value
      }, !isChangeBtn.value ? {
        c: common_vendor.o(($event) => loginByWx_quick())
      } : {}, {
        d: isChangeBtn.value
      }, isChangeBtn.value ? {
        e: common_vendor.o(($event) => onOpenHighlight()),
        f: common_vendor.o(($event) => onCloseHighlight()),
        g: common_vendor.p({
          isCheckAgreement: isCheckAgreement.value
        })
      } : {}, {
        h: common_vendor.o(($event) => checked()),
        i: common_vendor.o(($event) => openAgreement()),
        j: shouldHighlight.value ? 1 : "",
        k: common_assets._imports_1,
        l: common_vendor.t(btnText.value),
        m: common_vendor.o(($event) => loginByPhone_other()),
        n: common_vendor.o(hideModal),
        o: common_vendor.p({
          visible: isModalVisible.value
        })
      });
    };
  }
};
wx.createComponent(_sfc_main);
