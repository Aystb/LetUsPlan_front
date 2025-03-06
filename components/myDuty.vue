
<template>
  <view v-if="visible" class="modalOverlay" @click="closeMyDuty()">
    <view class="z-3">
      <view class="ft-16 mb-10 ml-10 fw-700">
        {{ year }}年{{ month }}月{{}}日
      </view>
      <!-- 白色盒子 -->
      <view class="dutyContainer" @click.stop>
        <!-- 头部：我的日程 -->
        <view class="myDuty-font">
          <view class="font fw-600">我的日程</view>
          <view class="ft-18 fw-600">——my duty——</view>
        </view>

        <!-- 中部：添加的代办事项 -->
        <view v-if="duties && duties.length > 0" class="duties">
          <view v-for="(duty, index) in duties" :key="index">
            <img src="../static/duty未完成.png" @click="dutyIsDone()" />
            <p class="" @click="showDescripition()">{{ duty.title }}</p>
          </view>
        </view>

        <!-- 尾部：加号按钮 -->
        <button class="addDuty_btn" @click="showAddDuty()">
          <image src="/static/addDuty_btn.png"></image>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import ModalComponents from "./ModalComponents.vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  duties: {
    type: Array,
    default: () => [],
  },
  year: Number,
  month: Number,
});

// 关闭我的日程
const emit = defineEmits(["close", "showAddDuty"]);

function closeMyDuty() {
  emit("close");
  console.log("关闭我的日程页面");
}

// 显示添加日程界面
function showAddDuty() {
  emit("showAddDuty");
  console.log("显示添加日程页面");
}

</script>

<style scoped>
.modalOverlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(227, 226, 226, 0.5);
  z-index: 2000;
}


.dutyContainer {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 80vw;
  height: 60vh;
  border: 1px solid #deb0ff9c;
  border-radius: 36px;
}
.font {
  font-size: 36px;
}
.addDuty_btn {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: transparent;
  /* border: none; */
  box-shadow: none;
  padding: 0;
  margin: 0;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.addDuty_btn image {
  height: 60px;
  width: 60px;
}
</style>

