import { defineStore } from "pinia";
import {ref} from 'vue'
export const useUserStone = defineStore('userStone',()=>{

const userid = ref(1)
const nowRequestAIHistoryId = ref()


return {userid,nowRequestAIHistoryId}
})