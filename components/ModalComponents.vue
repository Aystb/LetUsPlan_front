<template>
  <view>
    <view v-if="props.visible" class="modal">
      <view class="modal-content" @scroll="onScroll">
        <span class="close" @click="close">&times;</span>
        <p>
          购买本服务的企业用户，有责任对其最终用户在使用腾讯统一身份期间的行为及发布的内容进行监督和审计，因最终用户行为及发布内容违反相关法律法规而造成的任何后果和损失，由企业用户和最终用户负全部责任。同时，如果企业用户或企业最终用户违反法律法规、本协议和/或腾讯其他协议、规则，腾讯对企业用户或企业最终用户使用的本产品和/或本服务采取任何行为或措施后，导致企业用户或企业最终用户暂时或永久无法使用腾讯统一身份、无法使用腾讯统一身份登录或使用其他产品和/或服务，企业用户应自行承担相应后果，由此造成企业损失的，企业应自行承担。
          6.4.4
          您应自行对因使用本服务而产生或存储在本服务中的数据，在本服务之外，采取合理、安全的备份。若腾讯根据本协议对您采取永久封号等措施的，对于您的与本服务相关的全部数据或您存储在本服务中的全部数据、信息等，腾讯有权将该等数据全部予以删除，相应后果您应自行承担。
          6.4.5
          您导致任何第三方损害的，您应当独立承担责任；腾讯因此遭受损失的，您也应当一并赔偿。
          6.5
          您充分了解并同意，您必须为自己使用本产品和/或本服务的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对使用本产品和/或本服务时接触到的内容自行加以判断，包括因对内容的正确性、完整性或实用性的依赖而产生的风险，并承担由此引起的相应风险。腾讯在法律允许的范围内不对您因前述风险而导致的任何损失或损害承担责任。
          如您为企业用户，您应对您指定的管理员账号的行为负责，腾讯根据您设置的管理员账号的行为、操作和指示所做的服务调整亦由您承担后果；如您为不具有完全民事行为能力的自然人，您应理解，您的监护人将对您使用本服务的一切行为负责。
          6.6 您需确认并同意以下我们对违规内容和用户投诉的处理规则：
        </p>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  visible: Boolean,
  default: false,
});
const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
function onScroll(event) {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
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
  overflow: hidden;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 65%;
  max-height: 80%;
  overflow-y: auto;
  box-sizing: border-box;
  white-space: normal;
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
