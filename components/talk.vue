<template>
<view>
    <button @click="requestAllModels()">查看可用模型</button>
    <button @click="requestChat3_5Per()">单次请求3.5模型</button>
    <button @click="requestStreamData()">请求流式数据</button>
    <view>{{ data }}</view>
   
</view>

</template>

<script setup>
import {ref} from 'vue'
import { useStreamData } from '../request/api'
import {useUserStone} from '../store/userStore'
import api from '../request/api'
const userStone = useUserStone()
const {data,startStreaming} = useStreamData(`http://127.0.0.1:8000/LetUsPlan/AI/${userStone.userid}/StreamData`)

//查看可用模型
async function requestAllModels(){
let res = await api.requestAllModels()
console.log(res)
}

//单次请求3.5模型
async function requestChat3_5Per(){
	//暂时用静态数据测试,详情查阅api文档
	let data = {
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: "早上好！"
        },
    ],
    temperature: 0.5,
    max_tokens: 800,
    stream: false,
    
}
let res = await api.requestChatPerTime(data)
console.log(res.choices[0].message)
}


//请求流式数据
async function requestStreamData() {
let data = {  
	        model:"gpt-3.5-turbo",
            messages:[{"role": "user", "content": "Hello, OpenAI!please give me a long paragraph"}],
            stream:true,
            temperature:0.5,
            max_tokens:550,}
	startStreaming(data)
}
</script>

<style scoped>

</style>