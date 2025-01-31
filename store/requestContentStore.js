import { defineStore } from "pinia";
import {ref} from 'vue'

export const useRequestContentStore = defineStore('requestContentStore',()=>{
//  聊天的历史记录,根据这个的数量渲染侧边栏
    const contents = ref([{
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


    }])
    
return {contents}
})