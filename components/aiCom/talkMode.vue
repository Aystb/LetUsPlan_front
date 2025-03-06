<!--控制模型的一些参数-->
<template>
    <view  class="flex-y">
        <button @click="visible=!visible">{{ requestModeStore.model }}</button>
        <view v-if="visible" class="flex-y hover_gray">
      
       <view>模型:{{ model }}


       </view>

       <view class="flex-x">最大生成token数量{{ max_tokens }}</view>
       <view class="flex-x">生成随机度{{ temperature }}</view>
       <view class="flex-x">是否启用流式请求:{{ stream }}</view>
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

    const model = ref("gpt-3.5-turbo")
const max_tokens=ref(1600)
const temperature = ref(0.5)  //介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。
const stream = ref(false)   
const models = ref(["gpt-4o","gpt-3.5-turbo"])
    </script>
    
    <style scopd>
    .hover_gray{
        background-color: ;
    }
    </style>