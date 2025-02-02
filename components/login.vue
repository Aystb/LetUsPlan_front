<template>
  <view class="flex-y custom-color hv-95 flex-center-horizontal">
    <!--上半-->
    <view class="flex-y items-center mt-10 mr-20 ml-20 flex-grow1">
      <image
        src="../static/logo.png"
        mode="scaleToFill"
        class="round-image mbt-15"
      />
      <view class="mbt-10 ft-24"> 欢迎使用酱紫安排! </view>
      <button class="quick-btn" @click="loginByPhone_quick()">
        手机号快捷登录
      </button>

      <view class="ft-12 flex-center-both">
        <checkbox class="checkbox-box" @click="checked()"></checkbox>

        若手机号未注册将自动注册，注册即同意
        <Text class="link" @click="openAgreement()">《用户协议》</Text>
      </view>
    </view>

    <ModalComponent visible="isModalVisible" @close="hideModal">
      <p>这里是用户协议的内容</p>
    </ModalComponent>

    <!--下半-->
    <view class="flex-center-both flex-y">
      <view class="flex-x flex-center-both">
        <view class="line mr-20"></view><text>其他登录方式</text>
        <view class="line ml-20"></view>
      </view>
      <button class="other-btn" @click="loginByPhone_other()">
        <img src="../static/loginByPhone_other.png" />
        <br />
        手机验证
      </button>
    </view>
  </view>
</template>

<script setup>
import ModalComponent from "./login_userAgreement.vue";
import { ref } from "vue";

components: {
  ModalComponent;
}
//是否勾选同意用户协议
const isCheckAgreement = ref(false);

//是否点击用户协议
const isModalVisible = ref(false);

//勾选同意用户协议
function checked() {
  isCheckAgreement.value = !isCheckAgreement.value;
}

//打开用户协议
function openAgreement() {
  isModalVisible.value = true;
}

//关闭用户协议
function hideModal() {
  isModalVisible.value = false;
}

//快捷登录
function loginByPhone_quick() {}

//手机验证
function loginByPhone_other() {}
</script>

<style scopd>
.custom-color {
  background-color: #deb0ff;
}
.quick-btn {
  margin-top: 2vh;
  margin-bottom: 1vh;
  border-radius: 30px;
  width: 100%;
}

.other-btn {
  margin-top: 2vh;
  margin-bottom: 3vh;
  border-radius: 30px;
  width: 100%;
  background-color: transparent;
  border: none;
  box-shadow: none;
}

.other-btn img {
  width: 5vh;
}

.round-image {
  border-radius: 50%;
  height: 150px;
  width: 150px;
}
.link {
  color: #007aff;
  text-decoration: underline;
}
.checkbox-box {
  transform: scale(0.6);
}
.line {
  background-color: black;
  width: 150%;
  height: 1px;
}
</style>
