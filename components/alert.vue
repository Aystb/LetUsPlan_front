<template>

    <view v-if="alertStore.warning" class="warning both" :class="[{'fade-out':alertStore.fadeOut}]  " > {{ alertStore.alertText }}</view>
    <view v-if="alertStore.alert" class="alert both" :class="[{'fade-out':alertStore.fadeOut}]  "  > {{ alertStore.alertText }}</view>
    <view v-if="alertStore.success" class="success both" :class="[{'fade-out':alertStore.fadeOut}]  " >{{ alertStore.alertText }}</view>


</template>

<script setup>
import {ref} from 'vue'
const props = defineProps({

})
import { useAlertStore } from '../store/alertStore';
const alertStore = useAlertStore()


</script>

<style scoped>

.warning{
background-color: #FFA500;
}
.alert{
background-color: #D32F2F;
}
.success{
background-color: #388E3C;
}
.both{
  position: fixed;
  top: 70px;
  
    left: 50%;
    transform: translate(-50%, -50%); 
  padding: 8px;
  border-radius: 10px;
  font-size: 20px;
}


/* 渐出动画 */
.fade-out {
    animation: fadeOut 3s ease-out;  /* 持续2秒，使用ease-out缓动函数 */
}


/* 定义渐出动画 */
@keyframes fadeOut {
    0% {
        opacity: 1;  /* 开始时透明度为1 */
    }
    100% {
        opacity: 0;  /* 结束时透明度为0 */
    }
}
</style>