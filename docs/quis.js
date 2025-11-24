function iniciarQuiz(fase) {
  trocarTela("tela-quiz");
  
  document.getElementById("proxima-pergunta").style.display = "none";
  
  document.getElementById("numero-fase").textContent = fase;

  let acertos = 0;
  let erros = 0;

  const perguntasPorFase = {
    1: [{ pergunta: "2 + 2 = ?", respostas: ["3", "4", "5"], correta: 1 }],
    2: [{ pergunta: "5 * 3 = ?", respostas: ["15", "10", "8"], correta: 0 }],
    3: [{ pergunta: "Qual é o plural de 'pão'?", respostas: ["Pães", "Pãos", "Pãoses"], correta: 0 }],
    4: [{ pergunta: "O contrário de 'feliz' é...", respostas: ["Triste", "Alegre", "Sorridente"], correta: 0 }],
    5: [{ pergunta: "Como se escreve corretamente?", respostas: ["Enchergar", "Enxergar", "Inxergar"], correta: 1 }],
    6: [{ pergunta: "Qual palavra está correta?", respostas: ["Casa", "Kasa", "Caza"], correta: 0 }],
    7: [{ pergunta: "Qual é o plural de 'flor'?", respostas: ["Flores", "Florês", "Flors"], correta: 0 }],
    8: [{ pergunta: "O sol está ____ no céu.", respostas: ["brilhando", "brilha", "brilhou"], correta: 0 }],
  };

  const perguntas = perguntasPorFase[fase];
  let perguntaAtual = 0;

  const perguntaEl = document.getElementById("pergunta");
  const respostasEl = document.getElementById("respostas");
  const feedbackEl = document.getElementById("feedback");
  const proximaPerguntaBtn = document.getElementById("proxima-pergunta");
  
  proximaPerguntaBtn.onclick = () => {
    finalizarFase(acertos, erros); 
  };

  mostrarPergunta();

  function mostrarPergunta() {
    proximaPerguntaBtn.style.display = "none";
    feedbackEl.textContent = "";

    if (!perguntas || perguntas.length === 0) {
        alert("Nenhuma pergunta disponível para esta fase.");
        trocarTela("mapa");
        return;
    }
    
    const atual = perguntas[perguntaAtual];
    perguntaEl.textContent = `${atual.pergunta}`;
    respostasEl.innerHTML = "";

    atual.respostas.forEach((resp, i) => {
      const btn = document.createElement("button");
      btn.textContent = resp;
      btn.onclick = () => verificarResposta(i);
      respostasEl.appendChild(btn);
    });
  }

  function verificarResposta(i) {
    const atual = perguntas[perguntaAtual];
    
    document.querySelectorAll("#respostas button").forEach(btn => btn.disabled = true);
    
    if (i === atual.correta) {
      feedbackEl.textContent = "🎉 Correto! Muito bem!";
      acertos++;
      feedbackEl.style.color = "limegreen";
    } else {
      feedbackEl.textContent = `❌ Errado! A resposta correta é: ${atual.respostas[atual.correta]}`;
      erros++;
      feedbackEl.style.color = "red";
    }

    proximaPerguntaBtn.textContent = "Continuar >";
    proximaPerguntaBtn.style.display = "inline-block";
  }
  
  function finalizarFase(acertosFase, errosFase) {
      if (typeof registrarResultadoFase === 'function') {
          registrarResultadoFase(acertosFase, errosFase);
      }
      
      const TOTAL_FASES = 8;
      
      if (fase < TOTAL_FASES) {
          if (typeof avancarParaProximaFaseSequencial === 'function') {
              avancarParaProximaFaseSequencial(fase); 
          } else {
              trocarTela("mapa"); 
          }
      } else {
          mostrarResultadoFinal();
      }
  }

  function mostrarResultadoFinal() {
      const placar = getPlacarTotal();
      
      trocarTela("tela-resultado");

      document.getElementById("resultado-fase-numero").textContent = "Final";
      document.getElementById("acertos-count").textContent = placar.acertos;
      document.getElementById("erros-count").textContent = placar.erros;

      const totalPerguntas = placar.acertos + placar.erros;
      let mensagemElogio = "";
      
      if (placar.acertos === totalPerguntas) {
          mensagemElogio = "SUPER HERÓI DO SABER! Você gabaritou o Caminho! 🏆🥇";
      } else if (placar.acertos > (totalPerguntas * 0.75)) {
          mensagemElogio = "VITÓRIA! Excelente desempenho geral! Você é um craque! 🌟";
      } else {
          mensagemElogio = "MUITO BOM! Continue explorando o Caminho para o aprendizado! 💪";
      }
      
      document.getElementById("elogio").textContent = mensagemElogio;
      
      document.getElementById("resultado-proxima-fase").style.display = "none";
  }
}