import Request from ".";

import { useUserStone } from "../store/userStore";
const userStone = useUserStone()
const request = new Request().http;
//测试的基础url,可以直接用全部的url，也可以和这个组合使用

let BaseUrl = "http://127.0.0.1:8000/LetUsPlan"

function get(url, header, data) {
    return request({
        url: url,
        method: "GET",
        header: header,
        data: data
    })
}

function post(url, header, data) {
    return request({
        url: url,
        method: "POST",
        header: header,
        data: data
    })
}

//专门为ai请求准备的封装
const apikey = "Bearer sk-w24u2zglNxNY2v8rFa46Ff3b6aBd451083F902242d003aBb"
let header = {Authorization:apikey}

function aiGet(url,data){
return request({
    url:url,
    method: "GET",
    header:header,
    data:data
})

}

function aiPost(url,data){
    return request({
        url:url,
        method: "POST",
        header:header,
        data:data
    })
}

// tag 外部结构,api的使用从这里开始
const  api = {
 //微信登录
 async loginByWx(data){
var url = `${BaseUrl}/loginByWx`
return await post(url,{},data)

 },   
//密码登录
async loginByPassword(data){
  var url = `${BaseUrl}/loginByPassword`
  return await post(url,{},data)
},
//验证码登陆
async loginByCode(data){
  var url = `${BaseUrl}/loginByCode`
  return await post(url,{},data)
},
//注册
async register(data){
   var url = `${BaseUrl}/LetUsPlan/register`
  return await post(url,{},data)
},
//发送短信
async sendCode(data){
 var url = `${BaseUrl}/LetUsPlan/sendMes`
  return await post(url,{},data)
},

//请求所有可用的模型
async requestAllModels(){
    var url = "https://api.gpt.ge/v1/models"
    return await aiGet(url,{})
    
    },
 
//普通请求
async requestChatPerTime(data){
    var url = "https://api.gpt.ge/v1/chat/completions"
    return await aiPost(url,data)
    },
//普通请求，并携带历史记录
    async requestChatWithHistory(data){
        var url = "https://api.gpt.ge/v1/chat/completions"
        return await aiPost(url,data)
    },
    
//向后端传输流式请求需要的参数（模式，是否带历史记录等参数）
    async sendStreamData(data){
    var url = `${BaseUrl}/AI/${userStone.userid}/GetStreamData`
    return await post(url,{},data)
    },

    //上传单条历史记录
  async updateSingleHistory(data){
var url = `${BaseUrl}/updateSingleHistory`
return await post(url,{},data)

  },

    //获取该用户所有的历史记录
async getAllAiHistorys(){
var url =`${BaseUrl}/${userStone.userid}/loadAiHistory`
return await get(url,{})
},
    //创建新对话
    async createNewChat(data){
var url =`${BaseUrl}/${userStone.userid}/newChat`
return await post(url,{},data)
    },

//获取所有日程
async getDuties(){
  var url = `${BaseUrl}/${userStone.userid}/getDuties`
  return await get(url,{})
},
//修改日程
async modifyDuty(data){
var url = `${BaseUrl}/${userStone.userid}/modifyDuty`
//data的形式为{
   // "duty_id": "1956b716f6358a4",
   // "description": "今天的安排是xxx，xxx，xxx",
   // "title": "今日安排",
   // "date": "20240803",
   // "isCheck": false
//}
  return await post(url,{},data)
},
//删除日程
async deleteDuty(data){
var url = `${BaseUrl}/${userStone.userid}/deleteDuty`
//data 为duty_id就行
  return await post(url,{},data)
},
//添加日程
async addDuty(data){
var url = `${BaseUrl}/${userStone.userid}/addDuty`
//data的形式为{
   // "description": "今天的安排是xxx，xxx，xxx",
   // "title": "今日安排",
   // "date": "20240803",
   // "isCheck": false
//}
  return await post(url,{},data)
}

};

export default api;

//流式请求封装的api，流程是前端把请求参数给后端-》后端向gpt服务器发请求-》返回给前端-》前端展示
import { ref, onUnmounted } from "vue";
/**
 * 封装流式请求函数
 * @param {string} url - 后端 API 地址
 * @returns {object} 一个包含 `data` 和 `startStreaming` 的对象
 */
export function useStreamData(url) {
  const data = ref(""); // 用于存储流式返回的数据
  const streamEndFlag = ref(true) 
  let eventSource = null;

  // 开始流式请求，这里的requestData是向gpt发出请求的请求体，也就是各种模型参数
  const startStreaming = async(requestData) => {
    streamEndFlag.value=false
    //首先等待请求体数据传输完毕再等待回传
   await api.sendStreamData(requestData)

    if (eventSource) {
      console.warn("Stream started!");
      return;
    }

    eventSource = new EventSource(url);

    // 监听流数据
    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        stopStreaming(); // 流结束时关闭连接
        streamEndFlag.value=true //通知流结束了
       
      } else {
        data.value += event.data; // 更新响应式数据
        console.log(event.data)
      }
    };

    // 监听错误
    eventSource.onerror = (error) => {
      console.error("Stream error:", error);
      stopStreaming(); // 出现错误时关闭连接
    };
  };

  // 停止流式请求
  const stopStreaming = () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
      console.log("stream received over")
    }
  };

  // 组件卸载时关闭连接
  onUnmounted(() => {
    stopStreaming();
  });

  return {
    data, // 响应式数据
    startStreaming, // 开始流式请求
    stopStreaming, // 停止流式请求
    streamEndFlag  //流是否结束的标志
  };
}
