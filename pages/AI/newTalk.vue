<template>
<view >
<view class="flex-y pd-10">
    
   
    <view class="flex-x justify-between ">  <u-icon @click="cancel()"  name="close" size="22"></u-icon> <view class="flex-x"> <u-icon name="map-fill" size="22"></u-icon> <text>AI助手</text></view>   <view></view> </view>

   <view class="flex-y m-10">
    <view class="flex-x "> <u-icon name="map-fill" size="22"></u-icon><text>角色</text> </view>
<input class="gray-ellipse" type="text" v-model=role placeholder="输入完成任务的角色"><!--角色-->
<view class="flex-x"> <u-icon name="map-fill" size="22"></u-icon><text>任务</text> </view>

<input class="gray-ellipse" type="text" v-model=task placeholder="描述你要完成的任务"><!--任务-->
<view class="flex-x"> <u-icon name="map-fill" size="22"></u-icon><text>时间区间</text> </view>
<input class="gray-ellipse" type="text" v-model=time placeholder="在哪个时间段完成呢"><!--时间区间-->
<view class="flex-x"> <u-icon name="map-fill" size="22"></u-icon><text>补充要求</text> </view>
<textarea class="gray-ellipse" cols="30" rows="10" v-model=additional  placeholder="任何补充的要求都可以哦"></textarea><!--补充要求-->
<view> <text class="tip">tip:如果不输入直接确认可以以默认形式进入AI界面</text></view>
</view>

<view class="flex-x btn-bottom"><button class="confirm" @click="confirm()">生成安排</button></view>
</view>
</view>
</template>

<script setup>

import {ref} from 'vue'


import api from '../../request/api';
import { useUserStone } from '../../store/userStore';
import { getTimeStamp } from '../../js/time';
const userStone = useUserStone()

const date = new Date(); // 获取当前日期和时间
const year = date.getFullYear(); // 获取年份
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份，月份从0开始，所以加1
  const day = date.getDate().toString().padStart(2, "0"); // 获取日期

const role = ref()
const task = ref()
const time = ref()
const additional = ref()

async function confirm(){
   
    
    var res = await api.createNewChat({
    role: role.value||"你是一个帮我安排任务的时间助手",
    task: task.value||"待定任务",
    time: time.value||`${year}-${month}-${day}`,
    additional: additional.value||"无额外要求",
    lastUpdateTime:getTimeStamp()
    })
    userStone.nowRequestAIHistoryId = res.chatId
   
    role.value =""
    task.value = ""
    time.value = ""
    additional.value = ""

    uni.navigateTo({url:'/pages/AI/index'})
}

function cancel(){
    uni.navigateTo({url:'/pages/AI/index'})
}
</script>

<style scoped>
.gray-ellipse{
    background-color: rgb(243, 240, 240);
    border-radius: 10px;
    width: 100%;
    padding: 3px 0px 3px 8px;
}
.close-start{
    margin-right: auto;
}
.confirm{
    background-color: rgb(231, 217, 231);
    border: 1px solid rgb(163, 120, 163);
    color: rgb(163, 120, 163);
}
.tip{
    font-size: 12px;
}
.btn-bottom{
    position: relative;
  
}
</style>