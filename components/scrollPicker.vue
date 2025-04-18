<template>
  <view class="scroll-picker">
    <scroll-view
      ref="scrollMenuRef"
      class="scrollbar"
      scroll-y
      @scroll="scrollMenu"
    >
      <view
        v-for="(item, index) in list"
        :key="'li' + index"
        class="scroll-item"
        :class="{ 'active-li': item === activeItem }"
      >
        {{ item }}
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";

const props = defineProps({
  modelValue: Number, // 使用 v-model 时的值,由string改为number，保持统一
  type: {
    type: String,
    default: "year",
  },
});

const emit = defineEmits(["update:modelValue"]);

const itemHeight = 40; // 每个列表项的高度
const activeItem = ref(props.modelValue); // 当前激活的项
const scrollTopNum = ref(0); // 滚动条的当前位置
const list = ref([]); // 动态生成的列表数据
const scrollMenuRef = ref(null); // 滚动容器的引用

// 根据类型生成列表数据
// const getDataList = () => {
//   switch (props.type) {
//     case "year":
//       list.value = getYearArr();
//       break;
//     case "month":
//       list.value = generateNumberArray(12);
//       break;
//     case "day":
//       list.value = generateNumberArray(31);
//       break;
//     default:
//       list.value = [];
//   }
//   activeItem.value = props.modelValue || list.value[2]; // 默认选中第三个项

//   nextTick(() => {
//     scrollTo(props.modelValue || list.value[2]);
//   });
// };

const getDataList = () => {
  switch (props.type) {
    case "year":
      list.value = getYearArr();
      break;
    case "month":
      list.value = generateNumberArray(12);
      break;
    case "day":
      list.value = generateNumberArray(31);
      break;
    default:
      list.value = [];
  }
  // 修改初始化逻辑
  const defaultValue = props.modelValue ?? list.value[2];
  activeItem.value = defaultValue;

  nextTick(() => {
    // 确保滚动到正确位置
    if (defaultValue) {
      scrollTo(defaultValue);
    }
  });
};

// 生成数字数组
const generateNumberArray = (n) => {
  let arr = Array.from({ length: n }, (_, i) => i + 1); // 直接返回数字
  arr = [, , ...arr, ,]; // 添加前后缓冲
  return arr;
};

// 生成年份数组
const getYearArr = () => {
  let start = 2020;
  let end = new Date().getFullYear() + 5;
  let arr = Array.from({ length: end - start + 1 }, (_, i) => start + i); // 返回数字
  arr = [, , ...arr, ,]; // 添加前后缓冲
  return arr;
};

// 滚动到指定项
// const scrollTo = (item) => {
//   let index = list.value.indexOf(item);
//   if (index === -1) return;
//   index -= 2; // 考虑前后缓冲
//   let num = index * itemHeight;
//   scrollMenuRef.value.scrollTo(0, num);
// };

const scrollTo = (item) => {
  let index = list.value.findIndex((val) => val === item);
  if (index === -1) return;

  // 调整滚动位置计算
  const scrollTop = (index - 2) * itemHeight;
  scrollMenuRef.value?.scrollTo({
    top: scrollTop,
    behavior: "smooth",
  });
};

// 滚动事件处理
// const scrollMenu = (e) => {
//   scrollTopNum.value = e.detail.scrollTop;
//   let val = Math.round(scrollTopNum.value / itemHeight);
//   activeItem.value = list.value[val + 2]; // 考虑前后缓冲
//   emit("update:modelValue", activeItem.value);
// };

const scrollMenu = (e) => {
  scrollTopNum.value = e.detail.scrollTop;
  const index = Math.round(scrollTopNum.value / itemHeight) + 2;
  const newValue = list.value[index];

  if (newValue !== undefined && newValue !== activeItem.value) {
    activeItem.value = newValue;
    emit("update:modelValue", newValue);
  }
};

// 监听 modelValue 的变化
watch(
  () => props.modelValue,
  (newValue) => {
    activeItem.value = newValue;
    nextTick(() => {
      scrollTo(newValue);
    });
  }
);

defineExpose({
  scrollTo,
});

// 初始化数据
onMounted(() => {
  getDataList();
});
</script>

<style scoped>
.scroll-picker {
  width: 50%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
.scrollbar {
  height: 80%;
  margin: 0, auto;
  justify-content: center;
}

.scroll-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #000;
  font-size: 24px;
  justify-content: center;
  align-items: center;
	font-weight: 600;
	color: #FFFFFF;
}
.active-li {
  color: #FFFFFF;
  font-size: 52px;
}
</style>