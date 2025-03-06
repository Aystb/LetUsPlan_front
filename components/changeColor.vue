<template>
  <view v-if="props.visible" class="changeColorContainer z-9">
    <!-- 标题：选择颜色 -->
    <view class="selectTitle fw-400 ft-20">选择颜色</view>
    <hr />

    <!-- 8个颜色块 -->
    <view class="colors">
      <!-- 每一个色块 -->
      <view class="colorBlock" v-for="(color, index) in colorList">
        <view
          class="color-item"
          @click="selectColor(index)"
          :style="{
            backgroundColor: color,
            border: isSelected(index) ? '2px solid #666' : 'none',
          }"
        ></view>
      </view>
    </view>

    <!-- 取消/确认btn -->
    <view class="buttonContainer">
      <button class="pickerCancel" @click="closeChangeColor()">取消</button>
      <button class="pickerIdentify" @click="pickOneColor()">确认</button>
    </view>
  </view>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  color: {},
});

const emit = defineEmits(["chosenColor", "closeChangeColor"]);

// 颜色
const colorList = [
  "#F7DFB4",
  "#DAB2FF",
  "#54A2F2",
  "#F5E877",
  "#7DE7B4",
  "#A94DEB",
  "#22D7E7",
  "#F8BDE4",
];

const selectedIndex = ref(0);

function isSelected(index) {
  // 检查当前索引是否与 selectedIndex 相等
  return selectedIndex.value == index;
}

function selectColor(index) {
  // 更新 selectedIndex 为当前点击的索引
  selectedIndex.value = index;
}

// 关闭更改颜色弹窗
function closeChangeColor(index) {
  emit("closeChangeColor");
  selectedIndex.value = 0;
}

// 把选中的颜色传给calendar组件，显示在addDuty组件的按钮处，关闭弹窗
function pickOneColor() {
  emit("chosenColor", colorList[selectedIndex.value]);
  selectedIndex.value = 0;
  emit("closeChangeColor");
}
</script>

<style>
.changeColorContainer {
  background: linear-gradient(180deg, #e8c9ff 0%, #fefcff 25%);
  position: fixed;
  bottom: 0;
  width: 100%;
  border: 1px solid black;
}
.selectTitle {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.colors {
  display: flex;
  flex-wrap: wrap;
}
.colorBlock {
  width: 25%;
  text-align: center;
}
.color-item {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  padding: 5px;
  margin: 10px auto;
}
.buttonContainer {
  display: flex;
  flex-direction: row;
  margin: 10px;
}
.pickerCancel {
  border-radius: 16px;
  background-color: #ededed;
  width: 40%;
  border: 1px solid #a4a4a4;
}
.pickerIdentify {
  border-radius: 16px;
  background-color: #deb0ff;
  width: 40%;
  border: 1px solid #a4a4a4;
}
</style>
