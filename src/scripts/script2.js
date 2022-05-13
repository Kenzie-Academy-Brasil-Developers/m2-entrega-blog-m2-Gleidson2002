import {Api} from "./script.js"
let email = document.getElementsByName("email")[0]
let senha = document.getElementsByName("password")[0]
let botao = document.getElementById("submit2")


botao.addEventListener("click",async(event)=>{
    
    event.preventDefault()
    let data = {
        email:email.value,
        password:senha.value
    }
    
    const status = await Api.fazerLogin(data)
    status.message
    if(status.status != "error"){
       window.location.href = "/pagina.html"
    }
    else{
        alert(status.message)
    }
        
   
   
})