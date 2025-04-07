<!--ai对话历史记录侧边栏-->
<template>
    <view  class="flex-y m-15">
     <text class="title mb-20">历史对话</text>
      <view class="flex-y ">
      
       <view v-if="today.length>0"><text>今天</text>
        <view class="flex-y"  v-for="(item,index) in today" :key="index">
            <view class="days">{{ spiltByLean(item.lastUpdateTime) }}</view>
          <view class="history-item" @click="pickup(item.chatId)">
          {{ item.messages[1].content }}
      </view>
        </view>
      </view>

      <view v-if="yesterday.length>0"><text>昨天</text>
        <view class="flex-y"  v-for="(item,index) in yesterday" :key="index">
            <view class="days">{{ spiltByLean(item.lastUpdateTime) }}</view>
          <view class="history-item" @click="pickup(item.chatId)">
          {{ item.messages[1].content }}
      </view>
        </view>
      </view>

      <view v-if="inWeek.length>0"><text>近七天</text>
        <view class="flex-y"  v-for="(item,index) in inWeek" :key="index">
            <view class="days">{{ spiltByLean(item.lastUpdateTime) }}</view>
          <view class="history-item" @click="pickup(item.chatId)">
          {{ item.messages[1].content }}
      </view>
        </view>
      </view>

      <view v-if="inMonth.length>0"><text>近一月</text>
        <view class="flex-y"  v-for="(item,index) in inMonth" :key="index">
            <view class="days">{{ spiltByLean(item.lastUpdateTime) }}</view>
          <view class="history-item" @click="pickup(item.chatId)">
          {{ item.messages[1].content }}
      </view>
        </view>
      </view>




    </view>
   </view>
   
    
    </template>
    
    <script setup>
    import {onMounted, ref} from 'vue'
     import { useRequestHistoryStore } from '../../store/requestHistoryStore';
   import { judgeTimeStamp,spiltByLean } from '../../js/time';
   import { useUserStone } from '../../store/userStore';
   const HistoryStore = ref([])
  const today = ref([])
  const yesterday = ref([])
  const inWeek = ref([])
  const inMonth = ref([])
  
onMounted(async()=>{
  await useRequestHistoryStore().loadHistory() //从后端拉取后赋值
  HistoryStore.value = useRequestHistoryStore().contents
 
//这里分成今天，昨天，近七天，近一个月
for (let i in HistoryStore.value){
 
  let res = judgeTimeStamp(HistoryStore.value[i].lastUpdateTime)
  
  if(res==1){today.value.push(HistoryStore.value[i])}
  else if(res==2){yesterday.value.push(HistoryStore.value[i])}
  else if(res==3){inWeek.value.push(HistoryStore.value[i])}
  else if(res==4){inMonth.value.push(HistoryStore.value[i])}
}


})



//选中某个日期，则改变userStone中的当前历史记录标记，并跳转到对话界面
function pickup(chatId){
  
  let index = HistoryStore.value.findIndex((item)=>{return item.chatId ==chatId})

useUserStone().nowRequestAIHistoryId = index+1
uni.navigateTo({ url: '/pages/AI/index' })
}
    </script>
    
    <style scopd>
    
   .title{
font-size: 20px;
font-weight: 600;

   }
.history-item{
  background-color: #EDEDED;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  padding: 5px;
  
}
.history-item:hover{
  background-color: rgb(246, 243, 243);
}
.days{
  color: #827E7E;
}
    </style>