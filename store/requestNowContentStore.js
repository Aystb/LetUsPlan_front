import { defineStore } from "pinia";
import {ref} from 'vue'

export const useRequestNowContentStore = defineStore('requestNowContentStore',()=>{
//  当前要展示的聊天的历史记录
    const content = ref({
     chatId:1,
     messages:[
        {
            role: "user",
            content: [
              //文本类型{ type: "text", text: "hello" },
              //图像类型{type: "image_url",
              //image_url: {
              //  "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
              //}}
            ]
        }
     ]


    })

    return {content}
})