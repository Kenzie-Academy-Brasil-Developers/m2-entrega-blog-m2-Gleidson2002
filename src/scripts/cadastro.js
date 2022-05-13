import {Api} from "./script.js"
let content = document.getElementById("content")
let botao = document.getElementById("submit3")
let url = document.getElementsByName("avatarUrl")[0]
let username = document.getElementsByName("username")[0]
let email= document.getElementsByName("email")[0]
let password= document.getElementsByName("password")[0]
console.log(botao)

botao.addEventListener("click",(event)=>{
event.preventDefault()


const dados = {
    username:username.value,
    email:email.value,
    avatarUrl:url.value,
    password: password.value
    
}
Api.fazerCadastro(dados)
})


// pegar informacoes


let botaologin = document.getElementById("submit2")
botaologin.addEventListener("click",(event)=>{
event.preventDefault()
window.location.href = "./login.html"
})