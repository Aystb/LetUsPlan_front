// ../../../../LetUsPlan_front/node_modules/uview-plus/libs/function/test.js
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}
function date(value) {
  if (!value)
    return false;
  if (typeof value === "number") {
    if (value.toString().length !== 10 && value.toString().length !== 13) {
      return false;
    }
    return !isNaN(new Date(value).getTime());
  }
  if (typeof value === "string") {
    const numV = Number(value);
    if (!isNaN(numV)) {
      if (numV.toString().length === 10 || numV.toString().length === 13) {
        return !isNaN(new Date(numV).getTime());
      }
    }
    if (value.length < 10 || value.length > 19) {
      return false;
    }
    const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{1,2}:\d{2}(:\d{2})?)?$/;
    if (!dateRegex.test(value)) {
      return false;
    }
    const dateValue = new Date(value);
    return !isNaN(dateValue.getTime());
  }
  return false;
}
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}
function string(value) {
  return typeof value === "string";
}
function digits(value) {
  return /^\d+$/.test(value);
}
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value
  );
}
function carNo(value) {
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}
function amount(value) {
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}
function chinese(value) {
  const reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}
function enOrNum(value) {
  const reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}
function contains(value, param) {
  return value.indexOf(param) >= 0;
}
function range(value, param) {
  return value >= param[0] && value <= param[1];
}
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}
function landline(value) {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}
function empty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value)
        return true;
      break;
    case "number":
      if (value === 0 || isNaN(value))
        return true;
      break;
    case "object":
      if (value === null || value.length === 0)
        return true;
      for (const i in value) {
        return false;
      }
      return true;
  }
  return false;
}
function jsonString(value) {
  if (typeof value === "string") {
    try {
      const obj = JSON.parse(value);
      if (typeof obj === "object" && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function object(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function code(value, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value);
}
function func(value) {
  return typeof value === "function";
}
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}
function image(value) {
  const newValue = value.split("?")[0];
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}
function video(value) {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}
function regExp(o) {
  return o && Object.prototype.toString.call(o) === "[object RegExp]";
}
var test_default = {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range,
  rangeLength,
  empty,
  isEmpty: empty,
  jsonString,
  landline,
  object,
  array,
  code,
  func,
  promise,
  video,
  image,
  regExp,
  string
};

export {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  string,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range,
  rangeLength,
  landline,
  empty,
  jsonString,
  array,
  object,
  code,
  func,
  promise,
  image,
  video,
  regExp,
  test_default
};
//# sourceMappingURL=chunk-AGZPZJIU.js.map
