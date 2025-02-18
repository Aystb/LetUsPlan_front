<!--ai对话模块-->
<template>
<view class="flex-y">
  
   
    
  

<view class="flex-x items-center"><view class="newTalk" @click="openNewTalk()"> 新对话+</view> <svg @click="jumpToHistory()" t="1739877888904" class="historyIcon" viewBox="0 0 1118 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10896" width="200" height="200"><path d="M581.818182 187.671273 581.818182 528.290909 824.366545 671.232 847.965091 631.156364 628.363636 500.549818 628.363636 187.671273Z" p-id="10897"></path><path d="M202.053818 744.96 149.038545 744.96C233.797818 910.615273 406.202182 1024 605.090909 1024c282.763636 0 512-229.236364 512-512 0-282.763636-229.236364-512-512-512C354.117818 0 145.314909 180.596364 101.515636 418.909091L0 418.909091l116.363636 139.636364L232.727273 418.909091 148.945455 418.909091C192.093091 206.475636 379.904 46.545455 605.090909 46.545455c257.070545 0 465.454545 208.384 465.454545 465.454545s-208.384 465.454545-465.454545 465.454545C432.919273 977.454545 282.530909 883.944727 202.053818 744.96z" p-id="10898"></path></svg>  </view>
    <view class="items-center flex-y">
      <talkMode ></talkMode>
    
    
    <!--展示聊天记录,v-for根据用户是user还是system来判断是渲染到左边还是右边-->
   <view class="flex-y wv-100 ">
     <view v-for="(item,index) in requestNowHistoryStore.messages" :key="index">
        <view class="system" v-if="item.role=='system' "> {{ item.content }}</view>
        <view class="rightSide" v-if="item.role=='user' "> {{ item.content }}</view>
        <view class="leftSide" v-if="item.role=='assistant' ">{{ item.content }}</view>
     </view>
   </view>
   <view class="userText"> <textarea auto-height="true"  @keydown="textKeyDown" class="userInput" type="text"  v-model="userInputText"  placeholder="给GPT发送消息"></textarea> <svg class="sendMes" @click="sendMes"  t="1739774614593"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7327" width="200" height="200"><path d="M938.666667 337.92v348.586667c0 150.613333-96.896 252.16-241.493334 252.16H327.253333C182.613333 938.666667 85.333333 837.12 85.333333 686.506667V337.92C85.333333 186.88 182.613333 85.333333 327.253333 85.333333h369.92C841.770667 85.333333 938.666667 186.88 938.666667 337.92zM480 415.146667v270.933333c0 17.92 14.506667 32 32 32 17.92 0 32-14.08 32-32V415.146667l105.386667 105.813333c5.973333 5.973333 14.506667 9.386667 22.613333 9.386667 8.064 0 16.213333-3.413333 22.613333-9.386667 12.373333-12.373333 12.373333-32.853333 0-45.226667l-160-160.853333a33.024 33.024 0 0 0-45.226666 0l-160 160.853333c-12.373333 12.373333-12.373333 32.853333 0 45.226667 12.8 12.373333 32.853333 12.373333 45.653333 0l104.96-105.813333z" fill="#130F26" p-id="7328"></path></svg> </view>
   <alert></alert>
</view>
</view>

</template>

<script setup>

import { useAlertStore } from '../../store/alertStore'
import alert from '../alert.vue'
import {ref,watch,onMounted} from 'vue'
import { useStreamData } from '../../request/api'
import {useUserStone} from '../../store/userStore'
import api from '../../request/api'
import talkMode from './talkMode.vue'
import { useRequestModeStore } from '../../store/requestModeStore'
import { useRequestHistoryStore } from '../../store/requestHistoryStore'
const userStone = useUserStone()
const {data,startStreaming,streamEndFlag} = useStreamData(`http://127.0.0.1:8000/LetUsPlan/AI/${userStone.userid}/StreamData`)
const requestModeStore = useRequestModeStore()
const userInputText = ref("")
const chatIndex = ref(0)
const requestNowHistoryStore = ref({chatId:1,
     user_id:1, 
     messages:[]})
const alertStore = useAlertStore();

//监听到flag变化的时候，也就是流结束，再改变历史记录中动态的部分为静态，不然会出现覆盖的情况
watch(()=>{return streamEndFlag.value},(oldValue,newValue)=>{
    if(oldValue==true){
requestNowHistoryStore.value.messages.pop()
requestNowHistoryStore.value.messages.push({role:"assistant",content: data.value })
 data.value=""
    }
})

onMounted(async()=>{
   await useRequestHistoryStore().loadHistory() //从后端拉取后赋值
   requestNowHistoryStore.value = useRequestHistoryStore().contents[chatIndex.value]
   if(requestNowHistoryStore.value.messages[requestNowHistoryStore.value.messages.length-1].role!="assistant"){
   requestAi()}
})

//查看可用模型
async function requestAllModels(){
let res = await api.requestAllModels()
console.log(res)
}


//绑定textarea的按钮事件
const textKeyDown = (event)=>{

     if ( event.key == 'Enter') {
        event.preventDefault(); 
       sendMes()
      }
    
}

//发送请求
const sendMes = ()=>{
if(userInputText.value==""){
    alertStore.setWarning("请输入要提问的内容")
return
}
else{
requestNowHistoryStore.value.messages.push({role:"user",content:  userInputText.value })
requestAi()
userInputText.value=""
}

}


//发起请求
function requestAi(){
if(requestModeStore.stream==false){
requestChat3_5Per()
}
if(requestModeStore.stream==true){
requestStreamData()
requestNowHistoryStore.value.messages.push({role:"assistant",content: data })
}
}

//普通请求
async function requestChat3_5Per(){
	//暂时用静态数据测试,详情查阅api文档
	let data = {
    model: requestModeStore.model,
    messages: requestNowHistoryStore.value.messages,
    // [
    //     {
    //         role: "user",
    //         content: "早上好！"
    //     },],
    temperature: requestModeStore.temperature,
    max_tokens: requestModeStore.max_tokens,
    stream: false,
    
}
let res = await api.requestChatPerTime(data)
requestNowHistoryStore.value.messages.push(res.choices[0].message)
//console.log(res.choices[0].message)
}


//请求流式数据
async function requestStreamData() {
let data = {  
	        model:requestModeStore.model,
            messages:requestNowHistoryStore.value.messages,
            stream:true,
            temperature: requestModeStore.temperature,
            max_tokens: requestModeStore.max_tokens,}
	startStreaming(data)
   
    
}

function openNewTalk(){
    uni.navigateTo({url:'/pages/AI/newTalk'})
}

function jumpToHistory(){
    uni.navigateTo({url:'/pages/AI/talkHistory'})
}
</script>

<style scoped>
.sendMes{
    width: 30px;
    height: 30px;
}
.userText{
    position: fixed;
    bottom: 20px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid gray;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 边框 + 阴影 */
}

.leftSide{
width: 100vw;
background-color: aqua;
}
.rightSide{
    width: 100vw;
    background-color: aquamarine;
}
.userInput{
    width: 90vw;
    background-color: antiquewhite;
  
}
.system{
    width: 100vw;
    background-color: bisque;
}
.newTalk{
    background-color: rgb(189, 244, 244);
    border-radius: 20px;
    padding: 10px;
}
.historyIcon{
    width: 30px;
    height: 30px;
}
</style>