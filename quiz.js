document.addEventListener("DOMContentLoaded", loadQuestion);

const questao = document.querySelector("#questao"); // Elemento onde o enunciado será exibido
const opcoes = document.querySelector("#opcoes"); // Elemento para as opções
const proxima = document.querySelector("#proximo"); // Botão "Próximo"
const feedback = document.querySelector("#feedback"); // Elemento para mostrar o resultado
const contador = document.querySelector("#contador"); // Elemento para contar acertos e questões

let respostaCorreta = ""; // Variável para armazenar a resposta correta
let acertos = 0; // Contador de acertos
let contadorQuestoes = 0; // Contador de questões respondidas
const limiteQuestoes = 40; // Limite de questões

// Função para carregar uma pergunta aleatória
async function loadQuestion() {
    if (contadorQuestoes >= limiteQuestoes) {
        feedback.innerHTML = `<strong>Quiz finalizado! Você acertou ${acertos} de ${limiteQuestoes} questões.</strong>`;
        proxima.disabled = true; // Desativa o botão "Próximo"
        return;
    }

    try {
        // Faz a requisição para buscar uma pergunta aleatória
        const resposta = await fetch("http://localhost:3000/Bperguntas", {
            method: "POST", // GET se a API aceita GET
        });

        // Converte a resposta em JSON
        const questaoAtual = await resposta.json();
        const questoes = questaoAtual[0];

        // Atualiza o enunciado da questão
        questao.innerText = questoes.pergunta;

        // Atualiza a resposta correta
        respostaCorreta = questoes.correct_answer.trim(); // Remove espaços extras

        // Atualiza o contador de questões
        contadorQuestoes++;
        contador.innerText = `Questão ${contadorQuestoes} de ${limiteQuestoes}`;

        // Gera os inputs de opções
        opcoes.innerHTML = `
            <label><input type="radio" name="resposta" value="a"> A) ${questoes.a}</label><br>
            <label><input type="radio" name="resposta" value="b"> B) ${questoes.b}</label><br>
            <label><input type="radio" name="resposta" value="c"> C) ${questoes.c}</label><br>
            <label><input type="radio" name="resposta" value="d"> D) ${questoes.d}</label><br>
        `;

        // Limpa o feedback da questão anterior
        feedback.innerHTML = "";

    } catch (error) {
        console.error("Erro ao carregar a questão:", error);
        questao.innerText = "Erro ao carregar a questão.";
    }
}

// Função para verificar a resposta
function verificar() {
   
        const selecionada = document.querySelector('input[name="resposta"]:checked');
        while(contadorQuestoes < 41){
            if (!selecionada) {
                feedback.innerHTML = `<span style="color: black;">❌ Selecione uma resposta para continuar.</span>`;
                return;
            }
        
            // Obtém o valor da resposta selecionada
          
        
            // Verifica se a resposta está correta
            if (selecionada === respostaCorreta) {
                acertos++;
                feedback.innerHTML = `<span style="color: green;">✅ Resposta correta!</span>`;
            } else {
                feedback.innerHTML = `<span style="color: black;">❌ Resposta errada! A correta era: <strong>${respostaCorreta}</strong>.</span>`;
            }
        
            // Atualiza o contador de questões ANTES de carregar a próxima
            contadorQuestoes++;
            contador.innerText = `Questão ${contadorQuestoes} de ${limiteQuestoes}`;
        }
      
    
        // Troca para a próxima questão após 500ms (mais rápido)
   
};


proxima.addEventListener("click", verificar);

// Adiciona funcionalidade ao botão "Próximo"
