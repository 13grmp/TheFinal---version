//referenciar os elementos html
const form = document.getElementById("form-signin")
const nome = document.getElementById("inputNome")
const email = document.getElementById("inputEmail")
const senha = document.getElementById("inputSenha")
const senha2 = document.getElementById("inputSenha2")
const divNome = document.getElementById("div-nome")
const divEmail = document.getElementById("div-email")
const divSenha = document.getElementById("div-senha")
const divSenha2 = document.getElementById("div-senha2")
const divBotao = document.getElementById("botao")
const data = document.getElementById("data")
const hora = document.getElementById("hora")

const serv_op = document.getElementById("servico-options")
const id = localStorage.getItem("id")
const usuario = localStorage.getItem("nome")

divp.innerHTML += `
<div class="container row text-end"><p>Olá, ${usuario}, <a href="http://127.0.0.1:5500/frontend/index.html"onclick = "sair()">sair</a></p></div> 
`
document.addEventListener('DOMContentLoaded', () => {
    listarServicos(serv_op)
})

document.addEventListener('submit', () => {
    console.log("MANDOU?")
    if (data.value === "" || data.value == null) {
        console.log('Não é permitido algo nulo1')
    } else if (hora.value === "" || hora.value == null) {
        console.log('Não é permitido algo nulo2')
    } else {
        const serv_opid = serv_op.options[serv_op.selectedIndex].value

        fazAgendamento(data, hora,serv_opid, id)
        window.location.replace("http://127.0.0.1:5500/frontend/pages/agenda-cliente.html")  
    }
    
})

async function listarServicos(serv_op){
    await fetch(`http://localhost:8080/servicos`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        }
    }) 
    .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            for(let i = 0; i < data.length; i++){
                serv_op.add(new Option(data[i].nome)) //gerando uma option com o nome do servico
                //setando o id do option pra ter como referenciar depois no post
                serv_op.options[i].value = data[i].idServico
                console.log(serv_op.options[i].id)
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

function fazAgendamento(data, hora,serv_op, id){
    const data1  = data.value
    const hora1 = hora.value


    
    fetch(`http://localhost:8080/agendamentos`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: data1,
            hora: hora1,
            servico:{
                idServico: serv_op
            },
            usuario:{
                idUsuario: id
            }
        })
    }) 
    .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });


}