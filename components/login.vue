<template>
  <view class="flex-y custom-color hv-95 flex-center-horizontal">
    <!--上半-->
    <view class="flex-y items-center mt-10 mr-20 ml-20 flex-grow1">
      <image
        src="../static/logo.png"
        mode="scaleToFill"
        class="round-image mbt-15"
      />
      <view class="quickLogin" v-if="!isChangeBtn">
        <view class="mbt-10 ft-24"> 欢迎使用酱紫安排! </view>
        <button class="quick-btn" @click="loginByWx_quick()">
         微信快捷登录
        </button>
      </view>

      
        <otherLogin v-if="isChangeBtn" :isCheckAgreement="isCheckAgreement" @openHighlight="onOpenHighlight()" @closeHighlight="onCloseHighlight()"></otherLogin>
       
     

      <view
        class="ft-12 flex-center-both"
        :class="{ Highlight: shouldHighlight }"
      >
        <checkbox class="checkbox-box" @click="checked()"></checkbox>

        若手机号未注册将自动注册，注册即同意
        <Text class="link" @click="openAgreement()">《用户协议》</Text>
      </view>
    </view>

    <!--下半-->
    <view class="flex-center-both flex-y">
      <view class="flex-x flex-center-both">
        <view class="line mr-20"></view><text>其他登录方式</text>
        <view class="line ml-20"></view>
      </view>
      <button class="other-btn" @click="loginByPhone_other()">
        <img src="../static/loginByPhone_other.png" />
        <br />
        {{ btnText }}
      </button>
    </view>
  </view>

  <ModalComponent
    class="agreement"
    :visible="isModalVisible"
    @close="hideModal"
  >
  </ModalComponent>
</template>

<script setup>
import ModalComponent from "./ModalComponents.vue";
import otherLogin from "./otherLogin.vue";
import { ref } from "vue";
import api from "../request/api";
//是否勾选同意用户协议
const isCheckAgreement = ref(false);

//是否点击用户协议
const isModalVisible = ref(false);

//提醒勾选用户协议
const shouldHighlight = ref(false);

const btnText = ref("手机验证");

const isChangeBtn = ref(false);


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
function loginByWx_quick() {
  if (isCheckAgreement.value == false) {
    shouldHighlight.value = true;
    setTimeout(() => {
      shouldHighlight.value = false;
    }, 1000);
  }
else {
//先获取code再向后端请求
uni.login({
    success: function (res) {
        if (res.code) {
          
            // 获取到的 code 可以发送到后端进行微信登录验证
            var res = api.loginByWx({code:res.code})
            console.log(res)
        } else {
            console.log('登录失败: ' + res.errMsg);
        }
    },
    fail: function (err) {
        console.log('uni.login 调用失败', err);
    }
});


}

}

//手机验证
function loginByPhone_other() {
  
    isChangeBtn.value = !isChangeBtn.value;
    if (isChangeBtn.value == true) {
      btnText.value = "手机快捷登陆";
    } else {
      btnText.value = "手机验证";
    }
  
}
function onOpenHighlight(){
shouldHighlight.value=true
}

function onCloseHighlight(){
shouldHighlight.value=false
}
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

.other-btn::after {
  border: none;
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
.agreement {
  position: fixed;
  top: 0px;
}

@keyframes Highlight {
  10% {
    transform: rotate(10deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(3deg);
  }
  40% {
    transform: rotate(-3deg);
  }
  50%,
  100% {
    transform: rotate(0deg);
  }
}

.Highlight {
  animation: Highlight 1s ease;
}

.quickLogin {
  width: 36vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.otherLogin {
  width: 36vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.Up {
  width: 40vh;
  height: 6vh;
  margin-top: 5vh;
  margin-bottom: 2vh;
  background-color: white;
  border-radius: 18px;
  align-items: center;
  justify-content: space-around;
}
.Down {
  width: 40vh;
  height: 6vh;
  margin-bottom: 3vh;
  background-color: white;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.phone-input {
  margin-left: 3vh;
  margin-right: 3vh;
  width: 100%;
  height: 85%;
  position: relative;
  text-align: left;
}

.verification-input {
  margin-left: 3vh;
  margin-right: 6vh;
  width: 50%;
  height: 85%;
  text-align: left;
}

.send-code-btn {
  width: 40%;
  height: 85%;
  margin-right: 1vh;
  border: none;
  outline: none;
  background-color: white;
  color: red;
  font-size: 1.6vh;
}

.send-code-btn::after {
  border: none;
}
</style>
