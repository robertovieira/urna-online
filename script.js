function f (e) {
    return document.querySelector(e);
}

// VARIAVEIS CONTROLE DE INTERFACE
let seuVotoPara = f('.d-1--1 span');
let cargo = f('.d-1--2 span');
let descricao = f('.d-1--4');
let aviso = f('.d-2');
let lateral = f('.d-1--right');
let numeros = f('.d-1--3');

// VARIAVEIS CONTROLE DE AMBIENTE
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i < etapa.numeros; i++) {
        if (i == 0) {
            numeroHtml += '<div class="numero pisca"></div>';    
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter( (item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';

        for (let i in candidato.fotos) {
            fotosHtml += `<div class="d-1--image ${(candidato.fotos[i].small ? 'small' : '')}"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
    }
}

function clicou(n) {
    let elNumero = f('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero += n;

        elNumero.classList.remove('pisca');

        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
    lateral.innerHTML = '';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log(etapas[etapaAtual].nome);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: (etapas[etapaAtual].nome !== undefined ? numero : 'nulo')
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            f('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;
            console.log(votos);
        }
    }
}


comecarEtapa();