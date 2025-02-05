"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStone = common_vendor.defineStore("userStone", () => {
  const userid = common_vendor.ref(1);
  return { userid };
});
exports.useUserStone = useUserStone;
