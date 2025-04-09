document.addEventListener("DOMContentLoaded", async () => {
    await loadUserProfile(); // Carrega o perfil do usuário ao abrir a página

    // Botão de salvar alterações
    const botaoSalvar = document.getElementById("Salvar");
    botaoSalvar.addEventListener("click", async (event) => {
        event.preventDefault();

        const id = document.getElementById("userId").value;
        const nome = document.getElementById("nome").value;

        if (id && nome) {
             editUser(id, nome); // Atualiza apenas o nome
        } else {
            alert("Preencha o campo corretamente!");
        }
    });
});

// Carrega os dados do usuário logado
async function loadUserProfile() {
    try {
        const response = await fetch("http://localhost:3000/usuario/perfil");
        if (response.ok) {
            const user = await response.json();

            // Preenche os dados do usuário na página
            document.getElementById("userId").value = user.id_usuario;
            document.getElementById("nome").value = user.usuario;
            document.getElementById("perfilNome").textContent = user.usuario;
            document.getElementById("perfilTipo").textContent = user.tipo === "admin" ? "Admin" : "Aluno";
            document.getElementById("perfilFoto").src = user.foto || "https://i.pinimg.com/736x/f1/ba/f3/f1baf33f2684d5e55d2e413c8d6723a4.jpg";
        } else {
            alert("Erro ao carregar perfil do usuário.");
        }
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        alert("Não foi possível carregar os dados do usuário.");
    }
}


async function editUser(id, nome) {
    try {
        const res = await fetch(`http://localhost:3000/usuario/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario }), // Envia o novo nome no corpo da requisição
        });

        if (res.ok) {
            alert("Nome atualizado com sucesso!");
            await loadUser(); // Atualiza os dados na tela
        } else {
            alert("Erro ao atualizar nome.");
        }
    } catch (error) {
        console.error("Erro ao atualizar nome:", error);
        alert("Falha ao atualizar nome.");
    }
}
