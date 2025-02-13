<!--ai对话模块-->
<template>
<view>
    <talkMode></talkMode>
    <button @click="requestAllModels()">查看可用模型</button>
    <button @click="requestChat3_5Per()">普通请求模型</button>
    <button @click="requestStreamData()">请求流式数据</button>
    <button @click="requestAi()">封装的两种请求</button>
    <view>{{ data }}</view>
   
</view>

</template>

<script setup>
import {ref} from 'vue'
import { useStreamData } from '../../request/api'
import {useUserStone} from '../../store/userStore'
import api from '../../request/api'
import talkMode from './talkMode.vue'
import { useRequestModeStore } from '../../store/requestModeStore'
import { func } from 'uview-plus/libs/function/test'
const userStone = useUserStone()
const {data,startStreaming} = useStreamData(`http://127.0.0.1:8000/LetUsPlan/AI/${userStone.userid}/StreamData`)
const requestModeStore = useRequestModeStore()
//查看可用模型
async function requestAllModels(){
let res = await api.requestAllModels()
console.log(res)
}

//发起请求
function requestAi(){
if(requestModeStore.stream==false){
requestChat3_5Per()
}
if(requestModeStore.stream==true){
requestStreamData()
}
}

//普通请求
async function requestChat3_5Per(){
	//暂时用静态数据测试,详情查阅api文档
	let data = {
    model: requestModeStore.model,
    messages: [
        {
            role: "user",
            content: "早上好！"
        },
    ],
    temperature: requestModeStore.temperature,
    max_tokens: requestModeStore.max_tokens,
    stream: false,
    
}
let res = await api.requestChatPerTime(data)
console.log(res.choices[0].message)
}


//请求流式数据
async function requestStreamData() {
let data = {  
	        model:requestModeStore.model,
            messages:[{"role": "user", "content": "Hello, OpenAI!please give me a long paragraph"}],
            stream:true,
            temperature: requestModeStore.temperature,
            max_tokens: requestModeStore.max_tokens,}
	startStreaming(data)
}
</script>

<style scoped>

</style>