<template>
 
  <view class="otherLogin" >
    <view class="Up">
      <input
        type="text"
        class="phone-input"
        placeholder="请输入手机号码"
        v-model="phoneNumber"
        @blur="validatePhone"
        :disabled="phoneNumberValid"
      />
    </view>
    <view class="Down">
      <input
        type="text"
        class="verification-input"
        placeholder="请输入验证码"
        v-model="verificationCode"
        :disabled="verificationCodeValid"
      />
      <button
        class="send-code-btn"
        @click="sendVerificationCode()"
        :disabled="isCountTime"
        @input="verifyCode()"
      >
        {{ sendCodeBtnText }}
      </button>
      
    </view>
    <button  @click="login()" class="loginBtn">登录/注册</button>
   
  </view>
  <Alert ></Alert>

</template>

<script setup>
import Alert from './alert.vue';
import {ref} from 'vue'
import api from '../request/api';
import { useAlertStore } from '../store/alertStore';
const alertStore = useAlertStore()

const props = defineProps({
  isCheckAgreement:{
    type:Boolean,
    default:false
  }
})

const emit = defineEmits(['openHighlight','closeHighlight'])
const phoneNumberValid = ref(false);

const verificationCodeValid = ref(false);
//暂时验证设置为true
const phoneNumberIsValid = ref(true);

const sendCodeBtnText = ref("发送验证码");

const countDownTime = ref(60);

const isCountTime = ref(false);

const phoneNumber = ref()
const verificationCode = ref()


async function sendVerificationCode() {
  if (props.isCheckAgreement == false) {
  emit('openHighlight')
   
    setTimeout(() => {
     emit('closeHighlight')
    }, 1000);
  } else {
    if (phoneNumberIsValid.value) {
//发送验证码
var res = await api.sendCode({
  phone:phoneNumber.value
})

alertStore.setSuccess("验证码已发送")

let countdown = setInterval(() => {
    if (countDownTime.value > 0) {
      sendCodeBtnText.value = countDownTime.value
        countDownTime.value--;
       
    } else {
        clearInterval(countdown);  // 停止倒计时
        sendCodeBtnText.value = "发送验证码";  // 恢复按钮文字
    }
}, 1000);

countDownTime.value=60

  }
}
}
//手机号+验证码注册登录
async function login(){
//首先检查是否勾选用户协议
if(props.isCheckAgreement==false){
  alertStore.setWarning("请勾选用户协议")
  return
}

//尝试登录,成功返回user_id
var res = await api.loginByCode({phone:phoneNumber.value,code:verificationCode.value})

if(res.user_id>0){
  alertStore.setSuccess("登录成功")
  
  return res.user_id
}
//验证码错误
if(res.user_id==-1){
   alertStore.setAlert("验证码错误")
  return 
}
//用户不存在则注册
if(res.user_id==-2){
var res = await api.register({phone:phoneNumber.value,code:verificationCode.value})
if(res.user_id>0){
  alertStore.setSuccess("注册成功")
  return res.user_id //注册成功
}
//验证码错误
if(res.user_id==-2){
  alertStore.setAlert("验证码错误")
return 
}
}


}
</script>

<style scoped>
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
.loginBtn{
  display: flex;
}

</style>
