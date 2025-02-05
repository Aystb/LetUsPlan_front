"use strict";
const common_vendor = require("../common/vendor.js");
class Request {
  http(param) {
    const url = param.url;
    const method = param.method;
    let header = param.header || {};
    const data = Object.assign(param.data || {});
    if (method == "POST") {
      header = Object.assign({
        "content-type": "application/json"
      }, param.header);
    } else if (method == "GET") {
      header = Object.assign({
        "content-type": "application/json"
      }, param.header);
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url,
        method,
        header,
        data,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
            console.log(res.data);
          } else {
            console.info("request bug - success:", res);
            reject(new Error("Request succeeded but with a non-success status"));
          }
        },
        fail: (err) => {
          console.info("request bug - fail:", err);
          reject(err);
        }
      });
    });
  }
}
exports.Request = Request;
