const API_URL = 'http://localhost:8000/api/v1/users/login'; // URL da API

async function autenticarUsuario() {
    const username = document.getElementById('codigo-acesso').value;
    const password = document.getElementById('senha').value;

    if (!username || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Criando o corpo da requisição no formato 'application/x-www-form-urlencoded'
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Garantindo o formato correto
            },
            body: formData.toString(), // Enviando os dados no formato correto
        });

        if (response.ok) {
            const data = await response.json(); // Obtenha a resposta JSON corretamente
            if (data.access_token) {
                localStorage.setItem('token', data.access_token); // Armazena o token no localStorage
                alert('Login realizado com sucesso!');
                window.location.href = '../html/ambiente-usuario.html'; // Redireciona para a página de ambiente do usuário
            } else {
                alert('Token não encontrado na resposta.');
            }
        } else {
            const errorData = await response.json();
            alert(`Erro ao autenticar: ${errorData.detail || response.statusText}`);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
        alert('Erro ao conectar. Verifique sua conexão e tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('botao-acessar').addEventListener('click', (e) => {
        e.preventDefault();
        autenticarUsuario();
    });
});
