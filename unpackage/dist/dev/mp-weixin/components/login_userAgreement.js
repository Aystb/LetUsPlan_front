"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "login_userAgreement",
  props: {
    visible: Boolean,
    default: false
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function close() {
      emit("close");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.visible
      }, props.visible ? {
        b: common_vendor.o(close)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-542a71e2"]]);
wx.createComponent(Component);
