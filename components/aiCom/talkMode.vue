<!--控制模型的一些参数-->
<template>
    <view  class="flex-y">
        <button @click="visible=!visible">{{ requestModeStore.model }}</button>
        <view v-if="visible" class="flex-y ">
      
       <view class="flex-y ">
        <view class="m-10"> 模型</view>
          <view v-for="(item,index) in models" :key="index">
               <view class="hover_gray m-10" @click="chooseModel(index)">{{ item }}</view>
          </view>

       </view>

       <view class="flex-x hover_gray m-10">最大生成token数量 <input type="text" class="ml-20" v-model="max_tokens"  :value=max_tokens> </view>
       <view class="flex-x hover_gray m-10">生成随机度<input type="text" class="ml-20" v-model="temperature" @input="temperatureInput()" :value=temperature> <u-icon name="question-circle" class="hover-question"></u-icon> </view>
       <view class="flex-x hover_gray m-10">是否启用流式请求:<switch class="ml-20" @change="streamChange" /></view>
    </view>
</view>
    </template>
    
    <script setup>
    import {ref} from 'vue'
    import { useRequestModeStore } from '../../store/requestModeStore'

    const props = defineProps({
        
    })
const visible = ref(false)
const requestModeStore = useRequestModeStore()
const max_tokens=requestModeStore.max_tokens
const temperature = requestModeStore.temperature  //介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。


const models = ref(["gpt-4o","gpt-3.5-turbo"])


//确认提交修改温度
function temperatureInput(){
    if(temperature.value>2){
        temperature.value=2
    }
   else if(temperature.value<0){
  temperature.value=0
    }
    
}

//修改是否使用流式请求
function streamChange(e){
   requestModeStore.stream = e.detail.value
}

//修改模型
function chooseModel(index){
requestModeStore.model = models.value[index]
}

    </script>
    
    <style scopd>
    .hover_gray:hover{
        background-color: rgb(243, 241, 241);
    }
    .hover_gray{
        color: black;
    }
    .hover-question:hover::after {
            content: "介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。";
            position: absolute;
           
            width: 200px;
            
            background-color: #333;
            color: white;
            padding: 5px;
            border-radius: 4px;
            z-index: 9000;
           
            pointer-events: none; /* 防止伪元素干扰交互 */
        }
       
    </style>