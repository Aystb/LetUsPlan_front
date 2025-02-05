"use strict";
function getRangeDates(startYear, startMonth, monthRange) {
  let result = {};
  if (startMonth <= monthRange) {
    startYear -= 1;
    startMonth = startMonth + 12 - monthRange;
  } else {
    startMonth -= monthRange;
  }
  let currentDate = new Date(startYear, startMonth - 1, 1);
  let endDate = new Date(startYear, startMonth - 1 + monthRange * 2, 0);
  while (currentDate <= endDate) {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let dayOfWeek = currentDate.getDay();
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    if (!result[year]) {
      result[year] = {};
    }
    if (!result[year][month]) {
      result[year][month] = [];
    }
    result[year][month].push({
      date: day,
      // 当月几号
      dayOfWeek
      // 星期几（1-7）
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
}
exports.getRangeDates = getRangeDates;
