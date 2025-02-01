<template>
<view class="flex-y bg-purple1 hv-95 flex-center-horizontal">
   
  <!--上半-->
   <view class="flex-y items-center mt-10 mr-20 ml-20 flex-grow1">
    <image
        src="../static/Image_1732505080826.jpg"
        mode="scaleToFill"
        class="round-image mbt-15"
    />
    <view class="mbt-10 ft-24">
欢迎使用酱紫安排!
   </view>
<button class="quick-btn " @click="loginByPhone_quick()">手机号快捷登录</button>

<view class="ft-12 flex-center-both"> 
    
      <checkbox class="checkbox-box" @click="checked()"></checkbox>
     
若手机号未注册将自动注册，注册即同意 <text class="link" @click="openAgreement()">《用户协议》</text></view>

   </view>


 <!--下半-->
  <view class="flex-center-both flex-y ">
  <view class="flex-x flex-center-both  "> <view class="line mr-20"></view ><text>其他登录方式</text>  <view class="line ml-20"></view> </view>
<u-icon name="phone" size="80"></u-icon>
  </view>
</view>

</template>

<script setup>
import{ref} from 'vue'
//是否勾选用户协议
const isCheckAgreement=ref(false)

//是否勾选用户协议
function checked(){
isCheckAgreement.value = !isCheckAgreement.value

//打开用户协议
function openAgreement(){

}
}
//快捷登录
function loginByPhone_quick(){

}

</script>

<style scopd>
.quick-btn{
    border-radius: 30px;
   width: 100%;
}
.round-image{
    border-radius: 50%;
    height: 150px;
    width:150px;
}
.link {
  color: #007AFF; 
  text-decoration: underline;  
}
.checkbox-box {
    transform: scale(0.6);
}
.line{
   background-color: black;
   width: 150%;
    height: 1px;
}
</style>