import { defineStore } from "pinia";
import {ref} from 'vue'
import api from "../request/api";
export const useRequestHistoryStore = defineStore('requestHistoryStore',()=>{
//  聊天的历史记录,根据这个的数量渲染侧边栏
    const contents = ref([{
     chatId:1,
     user_id:1, //对应该用户的标识,用于后端数据库筛选
     messages:[
        //{
           // role: "user",
           // content: [
              //文本类型{ type: "text", text: "hello" },
              //图像类型{type: "image_url",
              //image_url: {
              //  "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
              //}}
            //]
       // }
     ]


    },{

    }])
    
   //加载该用户所有的历史记录
    async function loadHistory() {

      var res = await api.getAllAiHistorys()
       useRequestHistoryStore().contents = res
     

    }
return {contents,loadHistory}
})