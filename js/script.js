let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ''

function comecarEtapa() {
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''
   votoBranco = false 

    for (let cont = 0; cont < etapa.numeros; cont++) {
        if (cont === 0){
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
             numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.ineerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizarInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `nome: ${candidato.nome}<br/>partido: ${candidato.partido}`
        let fotosHtml = ''
        for (let i in candidato.foto) {
            if (candidato.foto[i].url) {
                 fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.foto[i].url}" alt="">${candidato.foto[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.foto[i].url}" alt="">${candidato.foto[i].legenda}</div>`
            }                 
        }
        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso-grande pisca">voto nulo</div>'
    }
}

function clicou(n) {
   let elNumero = document.querySelector('.numero.pisca')
   if(elNumero !== null) {
        elNumero.innerHTML = n 
        numero = `${numero}${n}`
        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizarInterface()
        }
   }
}

function branco() {
    if(numero === '') {
        votoBranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros,ineerHTML = ''
        descricao.innerHTML = '<div class="aviso-grande pisca">voto em branco</div>'
    } else {
        alert('para votar em branco, não pode ter digitado nenhum número')
    }
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false
    if(votoBranco) {
        votoConfirmado = true
        console.log('confirmando como voto em branco')
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        console.log('confirmando como ' + numero)
    } else {
        alert('você precisa digitar a quantidade de números correta')
    } 

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
        }
    }
}


comecarEtapa()