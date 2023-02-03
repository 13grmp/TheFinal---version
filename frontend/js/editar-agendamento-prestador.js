//referenciar os elementos html
const form = document.getElementById("form-signin")
const data = document.getElementById("data")
const hora = document.getElementById("hora")
const serv_op = document.getElementById("servico-options")
const id = localStorage.getItem("id")
const idServico = localStorage.getItem("idServico")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    validarEntradas(data, hora)
})



function validarEntradas(d, h) {

    const dataValue = String(d.value)
    const horaValue = String(h.value)

    if (dataValue === "" || dataValue == null) {
        console.log('Não é permitido algo nulo')
    } else if (horaValue === "" || horaValue == null) {
        console.log('Não é permitido algo nulo')
    } else {
        mandarServidor(dataValue, horaValue)
        window.location.replace("http://127.0.0.1:5500/frontend/pages/minha-agenda.html")
    }
}

function mandarServidor (d,h){

    const idAgendamento = localStorage.getItem("idAgendamento")
    fetch("http://localhost:8080/agendamentos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idAgendamento: idAgendamento,
                data: d,
                hora: h
            })
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error:", error);
    });
}