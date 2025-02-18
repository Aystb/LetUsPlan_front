<!--ai对话历史记录侧边栏-->
<template>
    <view  class="flex-y ">
     <text class="title">历史对话</text>
      <view class="flex-y">
<view v-for="(item,index) in requestHistoryStore.contents" :key="index">{{ item.messages[1].content }}</view>
      </view>

   </view>
   
    
    </template>
    
    <script setup>
    import {ref} from 'vue'
     import { useRequestHistoryStore } from '../../store/requestHistoryStore';

   const requestHistoryStore = useRequestHistoryStore()

    </script>
    
    <style scopd>
    
   .title{
font-size: 20px;
font-weight: 600;
   }


    </style>