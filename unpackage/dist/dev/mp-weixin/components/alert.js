"use strict";
const common_vendor = require("../common/vendor.js");
const store_alertStore = require("../store/alertStore.js");
const _sfc_main = {
  __name: "alert",
  props: {},
  setup(__props) {
    const alertStore = store_alertStore.useAlertStore();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(alertStore).warning
      }, common_vendor.unref(alertStore).warning ? {
        b: common_vendor.t(common_vendor.unref(alertStore).alertText),
        c: common_vendor.n({
          "fade-out": common_vendor.unref(alertStore).fadeOut
        })
      } : {}, {
        d: common_vendor.unref(alertStore).alert
      }, common_vendor.unref(alertStore).alert ? {
        e: common_vendor.t(common_vendor.unref(alertStore).alertText),
        f: common_vendor.n({
          "fade-out": common_vendor.unref(alertStore).fadeOut
        })
      } : {}, {
        g: common_vendor.unref(alertStore).success
      }, common_vendor.unref(alertStore).success ? {
        h: common_vendor.t(common_vendor.unref(alertStore).alertText),
        i: common_vendor.n({
          "fade-out": common_vendor.unref(alertStore).fadeOut
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-68e3fa88"]]);
wx.createComponent(Component);
