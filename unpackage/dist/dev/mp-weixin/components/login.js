"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
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
    function loginByPhone_quick() {
      if (isCheckAgreement.value == false) {
        shouldHighlight.value = true;
        setTimeout(() => {
          shouldHighlight.value = false;
        }, 1e3);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: !isChangeBtn.value
      }, !isChangeBtn.value ? {
        c: common_vendor.o(($event) => loginByPhone_quick())
      } : {}, {
        d: isChangeBtn.value
      }, isChangeBtn.value ? {
        e: common_vendor.p({
          isCheckAgreement: isCheckAgreement.value
        })
      } : {}, {
        f: common_vendor.o(($event) => checked()),
        g: common_vendor.o(($event) => openAgreement()),
        h: shouldHighlight.value ? 1 : "",
        i: common_assets._imports_1,
        j: common_vendor.t(btnText.value),
        k: common_vendor.o(($event) => loginByPhone_other()),
        l: common_vendor.o(hideModal),
        m: common_vendor.p({
          visible: isModalVisible.value
        })
      });
    };
  }
};
wx.createComponent(_sfc_main);
