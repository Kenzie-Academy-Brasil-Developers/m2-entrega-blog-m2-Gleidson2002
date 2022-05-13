
class Api {
    static token = ""
    static user = ""
    static async fazerCadastro(dados){
        const response = await fetch("https://api-blog-m2.herokuapp.com/user/register",
       {
           method: "POST",
           headers:{
               "Content-Type": "application/json",
           },
           body: JSON.stringify(dados),
       }).then((res)=>res.json())
       .then((res)=> {
           console.log(res.status)
           if(res.id != undefined){
            window.location.href = "../login.html"
           }
           if(res.message===`duplicate key value violates unique constraint "UQ_97672ac88f789774dd47f7c8be3"` ){
               alert("Usuario já existente")
           }
    
       })
       .catch((err)=>{
           console.log(err)
       })
    
    
    }
    static async fazerLogin(data){
        let status = ""
   
        const response = await fetch(`https://api-blog-m2.herokuapp.com/user/login`,{
             method:"POST",
             headers:{
                "Content-Type": "application/json" 
             },
             body: JSON.stringify(data),

        }).then((res) => res.json())
        .then((res) => res)
        .catch((err)=> console.log(err.message))
       
        this.token=  response.token
        this.user = response.userId
        localStorage.setItem("token", response.token)
        localStorage.setItem("userid", response.userId)
        
     return response
    }
    static async pegarusuario(token,id) {
        const response = fetch (`https://api-blog-m2.herokuapp.com/user/${id}`,
        {
            method:"GET",
            headers:{
                "authorization" : `Bearer ${token}`
            }
        }).then(res=>res.json())
        return response
    }
    static async listarpost(token, pagina){
       const response= fetch(`https://api-blog-m2.herokuapp.com/post?page=${pagina}`,{
            method:"GET",
            headers:{
                "authorization": `Bearer ${token}`
            }
       }).then((res)=>res.json())
       .then((res)=>res)
       return response
      
       

    }
    static async criarpost(token,post){
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post`,
       {
           method: "POST",
           headers:{
             "authorization": `Bearer ${token}`,
             "content-type": "application/json"
           },
           body: JSON.stringify(post),
       }).then((res)=>res.json())
       

    return response
    
    }
    static async deletarpost(token,id2){
        const response = await fetch(`https://api-blog-m2.herokuapp.com/post/${id2}`,{
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${token}`

            },
        })
      return  response
    }
    static async editarpost(token,id,data){
      const response = fetch(`https://api-blog-m2.herokuapp.com/post/${id}`,
      {
         method:"PATCH",
         headers:{
          "authorization": `Bearer ${token}`,
          "content-type": "application/json"
         },
         body: JSON.stringify(data)
      })
      return response
    }
    
    

}


export {Api}