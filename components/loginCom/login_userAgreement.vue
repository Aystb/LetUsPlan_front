<template>
  <view>
    <view v-if="props.visible" class="modal">
      <view class="modal-content">
        <span class="close" @click="close">&times;</span>
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  visible: Boolean,
  default:false
});
const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 300px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;

  text-decoration: none;

  cursor: pointer;
}
</style>
