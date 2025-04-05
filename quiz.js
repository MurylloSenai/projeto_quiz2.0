document.addEventListener("DOMContentLoaded", loadQuestion);

const questao = document.querySelector("#questao");
const opcoes = document.querySelector("#opcoes");
const proxima = document.querySelector("#proximo");
const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");
const acertosSpan = document.querySelector("#acertos");

let respostaCorreta = "";
let acertos = 0;
let contadorQuestoes = 0;
const limiteQuestoes = 40;

async function loadQuestion() {
    if (contadorQuestoes >= limiteQuestoes) {
        mensagem.innerHTML = `<strong>Quiz finalizado! Você acertou ${acertos} de ${limiteQuestoes} questões.</strong>`;
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/Bperguntas", {
            method: "POST",
        });

        const questaoAtual = await resposta.json();
        const questoes = questaoAtual[0];

        questao.innerText = questoes.pergunta;
        respostaCorreta = questoes.correct_answer;
        
        contadorQuestoes++;
        contador.innerText = `Questão ${contadorQuestoes} de ${limiteQuestoes}`;

        opcoes.innerHTML = `
            <label><input type="radio" name="resposta" value="a"> A) ${questoes.a}</label><br>
            <label><input type="radio" name="resposta" value="b"> B) ${questoes.b}</label><br>
            <label><input type="radio" name="resposta" value="c"> C) ${questoes.c}</label><br>
            <label><input type="radio" name="resposta" value="d"> D) ${questoes.d}</label><br>
        `;

        mensagem.innerHTML = "";

    } catch (error) {
        console.error("Erro ao carregar a questão:", error);
        questao.innerText = "Erro ao carregar a questão.";
    }
}

function verificarResposta() {
    const opcoesMarcadas = document.querySelector('input[name="resposta"]:checked');

    if (!opcoesMarcadas) {
        mensagem.innerHTML = `<span style="color: red;">Selecione uma opção antes de continuar.</span>`;
        return false;
    }

    const respostaSelecionada = opcoesMarcadas.value;

    if (respostaSelecionada === respostaCorreta) {
        acertos++;
        acertosSpan.innerText = `Acertos: ${acertos}`;
        mensagem.innerHTML = `<span style="color: green;">Resposta correta!</span>`;
    } else {
        mensagem.innerHTML = `<span style="color: red;">Resposta incorreta. A correta era: ${respostaCorreta.toUpperCase()}</span>`;
    }

    return true;
}

proxima.addEventListener("click", () => {
    const foiRespondida = verificarResposta();
    if (!foiRespondida) return;

    setTimeout(() => {
        loadQuestion();
    }, 1500);
});
