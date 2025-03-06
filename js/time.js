export function getTimeStamp(){
const now = new Date();
let year = now.getFullYear().toString()
let month = (now.getMonth() + 1).toString().padStart(2, '0');
let day = now.getDate().toString().padStart(2, '0');

let timeStamp = year+month+day
return Number.parseInt(timeStamp)


//加padStart是为了把2 -》02，免得格式不一致

}

//将时间划分为2004/03/02的形式
export function spiltByLean(timeStamp){
    let str = String(timeStamp)
  
  let year = str.substring(0,4)
  let month = str.substring(4,6)
  let day =  str.substring(6,8)
  let newTimeStamp = year+"/"+month+"/"+day
  
    return newTimeStamp
}

//判断时间是否是今天，昨天，七天内，一个月内
export function judgeTimeStamp(timeStamp){
    const now = new Date();
    const targetDate = new Date(timeStamp.toString().slice(0, 4), timeStamp.toString().slice(4, 6) - 1, timeStamp.toString().slice(6, 8));
  
    const diffTime = now - targetDate;
    const diffDays = diffTime / (1000 * 3600 * 24);
  
    if (diffDays < 1) {
      return 1; // 今天
    } else if (diffDays < 2) {
      return 2; // 昨天
    } else if (diffDays < 7) {
      return 3; // 七天内
    } else if (diffDays <30) {
      return 4; // 30天内
    }
  
    return 0; // 超过30天

}