import { defineStore } from "pinia";
import {ref} from 'vue'
export const useUserStone = defineStore('userStone',()=>{

const userid = ref(1)



return {userid}
})