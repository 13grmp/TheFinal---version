const id = localStorage.getItem("id")
const usuario = localStorage.getItem("nome")

divp.innerHTML += `
<div class="container row text-end"><p>Olá, ${usuario}, <a href="http://127.0.0.1:5500/frontend/index.html"onclick = "sair()">sair</a></p></div> 
`

document.addEventListener('DOMContentLoaded', () => {

    fetch("http://localhost:8080/agendamentos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            let divpai = document.getElementById("div-p")

            for (let i = 0; i < data.length; i++) {
                if(data[i].usuario.idUsuario == id){
                    const nome = data[i].servico.nome
                    const idAgendamento = data[i].idAgendamento
                    const prestador = data[i].servico.usuario.nome
                    const dia = data[i].data
                    const hora = data[i].hora
                   
    
    
                    displayNone()
                    divpai.innerHTML += `
                        <div class="row alert alert-success div-agendamento" "id=${idAgendamento}">
                            <div class = "col-9">
                            <p class="p-a4"><strong class="a1">${nome}</strong></p> 
                            
                            <p class="p-a4"><strong class="a1">Prestador: </strong>${prestador}</p>
                            <p class="p-a4"><strong class="a1">Dia: </strong>${dia}</p>
                            <p class="p-a4"><strong class="a1">Horário: </strong>${hora}</p>
                            </div>
                            <div class = "col-3" >
                            <a href="../pages/editar-agendamento-cliente.html"><img class="a1-img divdiv"id = "${idAgendamento}" onclick = "salveId(this.id)"
                            src="../img/edit_square_FILL0_wght400_GRAD0_opsz48.png"></a>
                            <a href=""><img
                            class="a2-img" src="../img/delete_FILL0_wght400_GRAD0_opsz48.png" id = "${idAgendamento}" onclick = "deletaItem(this.id)"></a>
                            
                            </div>
                            
                        </div>
                      `
                }
            }    
            })
    .catch((error) => {
        console.error("Error:", error);
    });
    
})
    
        
                
function salveId(id) {
    localStorage.setItem("idAgendamento", id)
}

function displayNone() {

    const divDisplay = document.getElementById("div-p-alert")

    divDisplay.className = "display"
}

function deletaItem(id) {
    fetch(`http://localhost:8080/agendamentos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error:", error);
        });
}
function sair(){
    localStorage.clear()
    
}