export function getCurrentDateFormatted() {
  const date = new Date(); // 获取当前日期和时间

  const year = date.getFullYear(); // 获取年份
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份，月份从0开始，所以加1
  const day = date.getDate().toString().padStart(2, "0"); // 获取日期

  return `${year}-${month}-${day}`; // 使用模板字符串返回格式化的日期
}

//获取详细的每一天的日期
export function getRangeDates(startYear, startMonth, monthRange) {
  let result = {}; // 用于存储按年、月、日分层嵌套的结果
  if(startMonth<=monthRange){
startYear-=1;
startMonth=startMonth+12-monthRange
  }else{
    startMonth-=monthRange
  }
  let currentDate = new Date(startYear, startMonth - 1, 1); // 从指定的年份和月份往前推monthRange个月的1号开始
  
  let endDate = new Date(startYear, startMonth - 1 + monthRange*2, 0); // 结束日期：从开始月份加上monthRange后的最后一天

  // 循环从开始日期到结束日期
  while (currentDate <= endDate) {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // 月份，从0开始，所以+1
    let day = currentDate.getDate(); // 当月几号
    let dayOfWeek = currentDate.getDay(); // 星期几，0代表星期日
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // 将星期日从0转换为7

    // 如果该年份不存在，初始化该年份
    if (!result[year]) {
      result[year] = {};
    }

    // 如果该月份不存在，初始化该月份
    if (!result[year][month]) {
      result[year][month] = [];
    }

    // 将日期信息添加到该年份、月份下
    result[year][month].push({
      date: day,           // 当月几号
      dayOfWeek: dayOfWeek // 星期几（1-7）
    });

    // 日期加1天
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}
