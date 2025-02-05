import { defineStore } from "pinia";
import {ref} from 'vue'
export const useAlertStore = defineStore('alertStore',()=>{

    const warning = ref(false)
    const alert = ref(false)
    const success = ref(false)
    const alertText = ref("")
   
    const fadeOut = ref(false)

function setWarning(text){

    fadeOut.value=false
   
    alertText.value = text
    warning.value=true
setTimeout(()=>{
 
},3000)
fadeOut.value=true

    setTimeout(() => {
    warning.value=false
      
    }, 3000);

}

function setSuccess(text){
    
    fadeOut.value=false
    success.value=true
    alertText.value = text
setTimeout(()=>{
   
},3000)
fadeOut.value=true

    setTimeout(() => {
      success.value=false
      
    }, 3000);
   
}

function setAlert(text){
    alert.value=true
    fadeOut.value=false
    
    alertText.value = text
setTimeout(()=>{
  
},3000)
fadeOut.value=true

    setTimeout(() => {
     alert.value=false
      
    }, 3000);
}

return {fadeOut,warning,alert,success,alertText,setAlert,setSuccess,setWarning}



})