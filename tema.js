document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const button = document.getElementById('Trocar');
  
    // Aplica o tema salvo
    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo === 'dark') {
      body.classList.add('dark-mode');
    }
  
    // Só adiciona o listener se tiver botão (em algumas páginas pode não ter)
    
      button.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
  
        // Salva a preferência
        if (body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
          button.innerText = '☀️';
        } else {
          localStorage.setItem('theme', 'light');
          button.innerText = '🌙';
        }
      });
   
  });
  
