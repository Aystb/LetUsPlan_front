import { defineStore } from "pinia";
export const useTestStore = defineStore('testStore',{
state(){
    return {
        item:666
    }
},

})