"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "ModalComponents",
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
    function onScroll(event) {
      event.target;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.visible
      }, props.visible ? {
        b: common_vendor.o(close),
        c: common_vendor.o(onScroll)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-437fde5a"]]);
wx.createComponent(Component);
