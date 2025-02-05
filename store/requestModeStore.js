import { defineStore } from "pinia";
import {ref} from 'vue'
//聊天模式
export const useRequestModeStore = defineStore('requestModeStore',()=>{
const model = ref("gpt-3.5-turbo")
const max_tokens=ref(1600)
const temperature = ref(0.5)  //介于 0 和 2 之间。较高的值（如 0.8）将使输出更加随机，而较低的值（如 0.2）将使输出更加集中和确定。
const stream = ref(false)     
const n = ref(1)
const presence_penalty = ref(0)//-2.0 和 2.0 之间的数字。正值会根据到目前为止是否出现在文本中来惩罚新标记，从而增加模型谈论新主题的可能性。
const frequency_penalty = ref(0)//-2.0 和 2.0 之间的数字。正值会根据新标记在文本中的现有频率对其进行惩罚，从而降低模型逐字重复同一行的可能性。



return {model,max_tokens,temperature,stream,n,presence_penalty,frequency_penalty}
})