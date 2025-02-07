"use strict";
const common_vendor = require("../common/vendor.js");
const useAlertStore = common_vendor.defineStore("alertStore", () => {
  const warning = common_vendor.ref(false);
  const alert = common_vendor.ref(false);
  const success = common_vendor.ref(false);
  const alertText = common_vendor.ref("");
  const fadeOut = common_vendor.ref(false);
  function setWarning(text) {
    fadeOut.value = false;
    alertText.value = text;
    warning.value = true;
    setTimeout(() => {
    }, 3e3);
    fadeOut.value = true;
    setTimeout(() => {
      warning.value = false;
    }, 3e3);
  }
  function setSuccess(text) {
    fadeOut.value = false;
    success.value = true;
    alertText.value = text;
    setTimeout(() => {
    }, 3e3);
    fadeOut.value = true;
    setTimeout(() => {
      success.value = false;
    }, 3e3);
  }
  function setAlert(text) {
    alert.value = true;
    fadeOut.value = false;
    alertText.value = text;
    setTimeout(() => {
    }, 3e3);
    fadeOut.value = true;
    setTimeout(() => {
      alert.value = false;
    }, 3e3);
  }
  return { fadeOut, warning, alert, success, alertText, setAlert, setSuccess, setWarning };
});
exports.useAlertStore = useAlertStore;
