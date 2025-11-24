function trocarTela(id) {
  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("mapa").style.display = "none";
  document.getElementById("tela-quiz").style.display = "none";
  document.getElementById("tela-resultado").style.display = "none";

  if (id === "tela-inicial" || id === "tela-resultado") {
    document.getElementById(id).style.display = "flex";
  } else {
    document.getElementById(id).style.display = "block";
  }

  if (id === "mapa") {
    atualizarMapaComProgresso();
  }
}

function mostrarMapa() {
  trocarTela("mapa");
}

function voltarMenu() {
  trocarTela("tela-inicial");
}

function getPlacarTotal() {
    const placar = localStorage.getItem('placarTotal');
    return placar ? JSON.parse(placar) : { acertos: 0, erros: 0, fasesCompletas: 0 };
}

function registrarResultadoFase(acertosFase, errosFase) {
    let placar = getPlacarTotal();
    placar.acertos += acertosFase;
    placar.erros += errosFase;
    
    placar.fasesCompletas++;
    
    localStorage.setItem('placarTotal', JSON.stringify(placar));
}

function atualizarMapaComProgresso() {
    const placar = getPlacarTotal();
    const fasesCompletas = placar.fasesCompletas;
    
    document.querySelectorAll(".fase").forEach(faseEl => {
        const numeroFase = parseInt(faseEl.textContent);
        
        faseEl.classList.remove("completa");
        if (numeroFase <= fasesCompletas) {
            faseEl.classList.add("completa");
        }
    });
}

function avancarParaProximaFaseSequencial(faseAtual) {
    const proximaFase = faseAtual + 1;
    const totalFases = 8; 

    if (proximaFase <= totalFases) {
        const proximaFaseEl = document.querySelector(`#mapa .fase:nth-child(${proximaFase + 1})`); 
        
        if (proximaFaseEl) {
            proximaFaseEl.click();
        }
    } else {
        trocarTela("mapa");
    }
}

function reiniciarJogo() {
    localStorage.removeItem('placarTotal');
    
    atualizarMapaComProgresso();
    
    trocarTela("tela-inicial");
}

document.querySelectorAll(".fase").forEach(fase => {
  fase.addEventListener("click", () => {
    document.querySelectorAll(".fase").forEach(f => f.classList.remove("ativa"));
    fase.classList.add("ativa");
    
    const numeroFase = parseInt(fase.textContent); 

    if (typeof iniciarQuiz === 'function') {
        iniciarQuiz(numeroFase);
    } else {
        console.error("Erro: A função iniciarQuiz não foi carregada.");
    }
  });
});

document.addEventListener("DOMContentLoaded", atualizarMapaComProgresso);