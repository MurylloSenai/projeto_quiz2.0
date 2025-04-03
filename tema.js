const Button = document.getElementById('Trocar');
const body = document.body;

// Verifica se há preferência salva no localStorage, tema do Navegador
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    Button.classList.add('dark-mode');
}

Button.addEventListener('click', () => {
    body.classList.toggle('dark-mode');//função toogle == bool, um ou outro
    Button.classList.toggle('dark-mode');

    // Salva a preferência do usuário no localStorage, tema do Navegador
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});