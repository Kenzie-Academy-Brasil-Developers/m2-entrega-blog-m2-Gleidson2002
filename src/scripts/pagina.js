import {Api} from "./script.js"
// Header
let token = localStorage.getItem("token")
let id = localStorage.getItem("userid")
const user = await Api.pegarusuario(token,id)
let header = document.querySelector("header")
let divusuario = document.createElement("div")
divusuario.id= "divusuario"
let imagem = document.createElement("img")
imagem.src = user.avatarUrl
imagem.id = "imgusuario"
let nome = document.createElement("p")
nome.id ="p"
nome.innerText= user.username
let logout = document.createElement("button")
logout.id = "logout"
logout.innerText="Logout"
divusuario.appendChild(imagem)
divusuario.appendChild(nome)
header.appendChild(divusuario)
header.appendChild(logout)

logout.addEventListener("click",(event)=>{
    localStorage.clear()
    window.location.href = "/index.html"
})
// Fim do header

//Criar post e content

let content = document.createElement("div")
content.id = "content"
let criarpost = document.createElement("div")
criarpost.id= "criarpost"
let escreverpost = document.createElement("textarea")
escreverpost.id = "escrever"
escreverpost.rows = "5"
escreverpost.cols="33"
escreverpost.placeholder= "Comece seu post incrivel!!"
let body = document.querySelector("body")
let submit =document.createElement("div")
submit.innerText= "+"

submit.id="submit"


criarpost.appendChild(escreverpost)
content.appendChild(criarpost)
criarpost.appendChild(submit)
body.appendChild(content)

//botão da janela de editar
submit.addEventListener("click", async(event)=>{
    event.preventDefault()
    let dados= {
        
            "content": `${escreverpost.value}`
          
    }
    await Api.criarpost(token,dados)
    escreverpost.value = ""
    await listarpagina(1)

})

// gerandos cards

let content2 = document.createElement("div")
content2.id="content2"

async function listarpagina(pagina){
content2.innerHTML=""
const data = await Api.listarpost(token,pagina)

for(let i = 0 ;i< data.data.length;i++){

  let card = document.createElement("div")
  card.classList = "card"
  let divperfil = document.createElement("div")
  divperfil.classList= "divperfil"
  let imagemperfil = document.createElement("img")
  imagemperfil.src = `${data.data[i].owner.avatarUrl}`
  imagemperfil.alt = ""
  imagemperfil.classList = "imagemperfil"
  let conteudo = document.createElement("div")
  conteudo.classList = "conteudo"
  conteudo.innerHTML = `
  <p class= "nomeuser">${data.data[i].owner.username}</p>
  <p class ="pcontent" id= "${data.data[i].id}2">${data.data[i].post}</p>

  `
  
  let editarcontent = document.createElement("div")
  editarcontent.classList = "editarcontent"
  
  if(data.data[i].owner.id=== id){
    let fantasma= document.createElement("div")
    fantasma.classList= "fantasma"
    
    let btneditar = document.createElement("button")
    btneditar.classList="editar"
    btneditar.innerText="Editar"
    btneditar.id=data.data[i].id

    let btndeletar = document.createElement("button")
    btndeletar.classList= "deletar"
    btndeletar.id= data.data[i].id
    btndeletar.innerText= "Deletar"
    let datas= document.createElement("div")
    datas.innerHTML= `<p class = criado>${data.data[i].createdAt}</p>`
    editarcontent.appendChild(fantasma)
    editarcontent.appendChild(btneditar)
    editarcontent.appendChild(btndeletar)
    editarcontent.appendChild(datas)

    btneditar.addEventListener("click",(e)=>{
      
      e.preventDefault()
      let target = e.target
      let value = document.getElementById(target.id+"2")
      //value.innerText
      
      localStorage.setItem("peditar", target.id)
      let janela = document.getElementById(`${target.id}1`)
      janela.style.display ="flex"
      
      textedit.innerText= value.innerText
    
    })
   
    btndeletar.addEventListener("click", async(e)=>{
        e.preventDefault()
        const target= e.target
        await Api.deletarpost(token,target.id)
        listarpagina(1)
    })
    
  }else{
     editarcontent.innerHTML= `
     <div class = "fantasma"> </div>
     <p class = "criado">${data.data[i].createdAt}</p>`
  }
  

  divperfil.appendChild(imagemperfil)
  card.appendChild(divperfil)
  card.appendChild(conteudo)
  card.appendChild(editarcontent)
  content2.appendChild(card)
  body.appendChild(content2)

    let janela = document.createElement("div")
    janela.classList= "janela"
    janela.id = `${data.data[i].id}1`
    
    let textedit= document.createElement("textarea")
    textedit.classList= "textedit"
    
    janela.appendChild(textedit)
    content2.appendChild(janela)
    let bsubmitedit = document.createElement("button")
    bsubmitedit.id = "bsubmit"
    bsubmitedit.innerText = "==>"
    janela.appendChild(bsubmitedit)

    
    bsubmitedit.addEventListener("click",async(e)=>{
      e.preventDefault()
      const id3 =localStorage.getItem("peditar")
      let texto = textedit.value
      let data = {
       "newContent": `${texto}`
       
      }

      await Api.editarpost(token,id3,data)
      localStorage.removeItem("peditar")
      document.location.reload()
   
      
    })
    


} 


}


listarpagina(1)
