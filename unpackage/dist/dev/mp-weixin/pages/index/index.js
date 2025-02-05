"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    function jumpToCalendar() {
      common_vendor.index.navigateTo({ url: "/pages/calendar/index" });
    }
    function jumpToAi() {
      common_vendor.index.navigateTo({ url: "/pages/AI/index" });
    }
    function jumpToLogin() {
      common_vendor.index.navigateTo({ url: "/pages/login/index" });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "map",
          size: "24"
        }),
        b: common_vendor.o(($event) => jumpToAi()),
        c: common_vendor.o(($event) => jumpToCalendar()),
        d: common_vendor.o(($event) => jumpToLogin())
      };
    };
  }
};
wx.createPage(_sfc_main);
