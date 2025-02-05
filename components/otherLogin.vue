<template>
  <view class="otherLogin" v-if="isChangeBtn">
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
  </view>
</template>

<script setup>
const phoneNumberValid = ref(false);

const verificationCodeValid = ref(false);

const phoneNumberIsValid = ref(false);

const sendCodeBtnText = ref("发送验证码");

const countDownTime = ref(60);

const isCountTime = ref(false);

function sendVerificationCode() {
  if (isCheckAgreement.value == false) {
    shouldHighlight.value = true;
    setTimeout(() => {
      shouldHighlight.value = false;
    }, 1000);
  } else {
    if (phoneNumberIsValid.value == ture) {
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
</style>
