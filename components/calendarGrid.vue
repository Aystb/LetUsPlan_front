<template>
  <view
    class="flex-y mt-5"
    v-for="(row, index1) in Array.from({ length: props.weeks })"
    :key="index1"
  >
    <!-- 生成行 -->
    <view class="flex-x">
      <view
        class="flex-fill shrink"
        v-for="(week, index2) in Array.from({ length: 7 })"
        :key="index2"
      >
        <!-- 生成日期 -->
        <text class="ml-20" v-if="index1 == 0">{{ weekTitle(index2) }}</text>

        <view v-if="isShow(index1, index2)" class="dayContainer">
          <!--日期方块组件-->
          <view
            @click="choose(index1, index2)"
            :class="['all-btn']"
            :style="{ border: '1px solid #efecec' }"
            >{{
              curMonthArray[index1 * 7 + index2 - curMonthBasicInfo.startIndex]
                ?.date
            }}
          </view>
          <!-- <view>点击安排日程</view> -->
          <view @click="showMyDuty()">点击安排日程</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

// 通过 props 接收当前月份的数组数据及基本信息（比如第一天在网格中的起始位置和当月天数）
const props = defineProps({
  curMonthArray: {
    type: Array,
    required: true,
  },
  curMonthBasicInfo: {
    type: Object,
    required: true,
  },
});

// 定义向父组件传递的事件
const emits = defineEmits(["chooseDate", "showMyDuty"]);

// 计算需要渲染的周数：若开始位置 + 天数大于35，则显示6行，否则5行
const weeks = computed(() => {
  return props.curMonthBasicInfo.startIndex + props.curMonthBasicInfo.length >
    35
    ? 6
    : 5;
});

// 构造一个 0 到 (weeks-1) 的数组用于行遍历
const rows = computed(() => {
  return Array.from({ length: weeks.value }, (_, i) => i);
});

// 根据索引返回星期标题（从“日”开始）
function weekTitle(index) {
  if (index === 1) return "一";
  if (index === 2) return "二";
  if (index === 3) return "三";
  if (index === 4) return "四";
  if (index === 5) return "五";
  if (index === 6) return "六";
  return "日";
}

// 判断该格子是否应显示日期（只显示当月日期）
function isShow(row, col) {
  const index = col + row * 7;
  return (
    index >= props.curMonthBasicInfo.startIndex &&
    index < props.curMonthBasicInfo.startIndex + props.curMonthBasicInfo.length
  );
}

// 点击日期块时，发出选中日期的事件
function choose(row, col) {
  const index = col + row * 7;
  const dayIndex = index - props.curMonthBasicInfo.startIndex;
  if (props.curMonthArray[dayIndex]) {
    const chosenDate = props.curMonthArray[dayIndex].date;
    emits("chooseDate", chosenDate);
    console.log("当前选择日期：", chosenDate);
  }
}

// 点击“点击安排日程”时，发出对应事件
function onShowMyDuty() {
  emits("showMyDuty");
  console.log("点击安排日程");
}
</script>

<style scoped></style>
