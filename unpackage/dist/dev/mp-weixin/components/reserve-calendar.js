"use strict";
const common_vendor = require("../common/vendor.js");
require("../request/api.js");
const js_date = require("../js/date.js");
const static_staticData = require("../static/staticData.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "reserve-calendar",
  props: {},
  setup(__props) {
    const calendar = common_vendor.ref();
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const month = (/* @__PURE__ */ new Date()).getMonth() + 1;
    (/* @__PURE__ */ new Date()).getDate();
    const static_calendar = common_vendor.ref();
    const curMonth = common_vendor.ref();
    const curYear = common_vendor.ref();
    const curMonthArray = common_vendor.ref(static_staticData.monthDate);
    const curMonthBasicInfo = common_vendor.ref({ startIndex: 0, length: 30 });
    const weeks = common_vendor.computed(() => {
      if (curMonthBasicInfo.value.startIndex + curMonthBasicInfo.value.length > 35) {
        return 6;
      } else {
        return 5;
      }
    });
    function weekTitle(index) {
      if (index == 1) {
        return "一";
      }
      if (index == 2) {
        return "二";
      }
      if (index == 3) {
        return "三";
      }
      if (index == 4) {
        return "四";
      }
      if (index == 5) {
        return "五";
      }
      if (index == 6) {
        return "六";
      } else {
        return "日";
      }
    }
    common_vendor.onMounted(async () => {
      calendar.value = static_staticData.dateInfo;
      static_calendar.value = js_date.getRangeDates(
        year,
        month,
        6
      );
      curMonth.value = (/* @__PURE__ */ new Date()).getMonth() + 1;
      curYear.value = (/* @__PURE__ */ new Date()).getFullYear();
    });
    common_vendor.watch([curYear, curMonth], (newValue, oldValue) => {
      curMonthArray.value = static_calendar.value[curYear.value][curMonth.value];
      curMonthBasicInfo.value.startIndex = curMonthArray.value[0].dayOfWeek;
      curMonthBasicInfo.value.length = curMonthArray.value.length;
    });
    const isShow = (index1, index2) => {
      var day = index2 + index1 * 7;
      if (day < curMonthBasicInfo.value.startIndex || day > curMonthBasicInfo.value.startIndex + curMonthBasicInfo.value.length) {
        return false;
      }
      return true;
    };
    const nextMonth = () => {
      curMonth.value += 1;
      if (curMonth.value > 12) {
        curMonth.value = 1;
        curYear.value += 1;
      }
    };
    const frontMonth = () => {
      curMonth.value -= 1;
      if (curMonth.value < 1) {
        curMonth.value = 12, curYear.value -= 1;
      }
    };
    function choose(index1, index2) {
      var index = index1 * 7 + index2;
      var chooseDate = curMonthArray.value[index - curMonthBasicInfo.value.startIndex].date;
      console.log("当前选择日期：", chooseDate);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(frontMonth),
        b: common_vendor.p({
          size: "18",
          name: "arrow-left"
        }),
        c: common_vendor.t(curYear.value),
        d: common_vendor.t(curMonth.value),
        e: common_vendor.o(nextMonth),
        f: common_vendor.p({
          size: "18",
          name: "arrow-right"
        }),
        g: common_vendor.f(Array.from({
          length: weeks.value
        }), (row, index1, i0) => {
          return {
            a: common_vendor.f(Array.from({
              length: 7
            }), (week, index2, i1) => {
              var _a;
              return common_vendor.e(index1 == 0 ? {
                a: common_vendor.t(weekTitle(index2))
              } : {}, {
                b: isShow(index1, index2)
              }, isShow(index1, index2) ? {
                c: common_vendor.t((_a = curMonthArray.value[index1 * 7 + index2 - curMonthBasicInfo.value.startIndex]) == null ? void 0 : _a.date),
                d: common_vendor.o(($event) => choose(index1, index2), index2)
              } : {}, {
                e: index2
              });
            }),
            b: index1 == 0,
            c: index1
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f04e0436"]]);
wx.createComponent(Component);
