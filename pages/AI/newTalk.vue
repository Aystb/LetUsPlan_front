<template>
<view >
<view class="flex-y">
<input type="text" :placeholder=role><!--角色-->
<input type="text" :placeholder=task><!--任务-->
<input type="text" :placeholder=time><!--时间区间-->
<textarea  cols="30" rows="10" :placeholder=additional></textarea><!--补充要求-->
</view>
<view class="flex-x"><button @click="confirm()">确认</button><button @click="cancel()">取消</button></view>
</view>

</template>

<script setup>

import {ref} from 'vue'


import api from '../../request/api';

const date = new Date(); // 获取当前日期和时间
const year = date.getFullYear(); // 获取年份
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份，月份从0开始，所以加1
  const day = date.getDate().toString().padStart(2, "0"); // 获取日期
const role = ref("你是一个帮我安排任务的时间助手")
const task = ref("待定任务")

const time = ref(`${year}-${month}-${day}`)
const additional = ref("无额外要求")

async function confirm(){
   
    var res = await api.createNewChat({
    role: role.value,
    task: task.value,
    time: time.value,
    additional: additional.value
    })
    console.log(res)
    uni.navigateTo({url:'/pages/AI/index'})
}

function cancel(){
    uni.navigateTo({url:'/pages/AI/index'})
}
</script>

<style scoped>


</style>