const { json } = require("express");

// Código para a transição de telas
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const main = document.getElementById('main');


      signUpButton.addEventListener('click',() => {
       main.classList.add("right-panel-active");
      })

      signInButton.addEventListener('click',() => {
       main.classList.remove("right-panel-active");
      })
    


// login de usuario
document.querySelector("#botaologin").addEventListener("click", async (event) => {
    event.preventDefault() // impede o envio do formulário

    const usuario = document.querySelector("#usuario").value;
    const senha = document.querySelector("#senha").value;
    
    console.log(usuario, senha)
    if (usuario != '' && senha != '') {
       
        try {
            const response = await fetch(`http://localhost:3000/usuario/senha`);
            if (response.status != 200) {

                // Redireciona para a página home
                alert('Login realizado com sucesso!!')
                  window.location.replace('../HTML/Quizzz.html')
            } 
            
            else {
                alert('Usuário ou senha incorretos!', 'danger');
            }
          
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login. Tente novamente mais tarde.', 'danger');
        }
    } else {
        alert('Preencha todos os campos!', 'warning');
    }
});

// cadastro
document.querySelector("#cadastrar").addEventListener("click", async (event) => {
      event.preventDefault();
    
      const usuario = document.querySelector("#usuario").value;
      const senha = document.querySelector("#senha").value;
      const senhaConfirmacao= document.querySelector("#senhaConfirmacao").value;
    
      if (senha !== senhaConfirmacao) {
          alert('As senhas não se coincidem')
      }
    
      try {
          const response = await fetch('http://localhost:3000/usuario',{
              method: "POST",
              headers: {
                  "Content-Type": "application/json" // Adiciona o cabeçalho correto
              },
              body: JSON.stringify({
          
                  usuario: usuario,
                  senha: senha
                  
              })
          })
    
          if (response.ok) {
              alert("Cadastro realizado com sucesso!", "success");
          } else {
              const data = await response.json();
              alert(data.error || "Erro ao realizar cadastro.", "danger");
          }
      } 
      catch (error) {
  
          alert("Erro ao tentar cadastrar. Tente novamente mais tarde.", "danger");
      }
    });

 

