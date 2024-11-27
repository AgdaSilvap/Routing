const API_URL = 'http://localhost:8000/api/v1/addresses/'; // Atualize para o URL correto da API

/**
 * Carrega os endereços do banco e preenche os selects no HTML.
 */
async function carregarEnderecos() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro ao carregar os endereços: ${response.statusText}`);
        }

        const enderecos = await response.json();

        // Seletores de origem e container de pontos de entrega
        const origemSelect = document.getElementById('origem-entrega');
        const pontosEntregaContainer = document.getElementById('pontos-entrega');

        // Limpa o select de origem
        origemSelect.innerHTML = '<option value="" disabled selected>Selecione a origem</option>';

        // Preenche o select de origem com os endereços
        enderecos.forEach((endereco) => {
            const option = document.createElement('option');
            option.value = endereco.id;
            option.textContent = endereco.description;
            origemSelect.appendChild(option);
        });

        // Adiciona o primeiro ponto de entrega
        const primeiroPonto = criarPontoEntrega(enderecos);
        pontosEntregaContainer.appendChild(primeiroPonto);

        // Evento para adicionar novos pontos de entrega
        document.getElementById('adicionar-ponto').addEventListener('click', (event) => {
            event.preventDefault();
            const novoPonto = criarPontoEntrega(enderecos);
            pontosEntregaContainer.appendChild(novoPonto);

            const botaoRemover = novoPonto.querySelector('.botao-remover');
            botaoRemover.addEventListener('click', (event) => {
                event.preventDefault();
                pontosEntregaContainer.removeChild(novoPonto);
                
            });
        });


    } catch (error) {
        console.error(error);
        alert('Erro ao carregar endereços.');
    }
}

/**
 * Cria um novo elemento de ponto de entrega (select).
 * @param {Array} enderecos - Lista de endereços retornada pela API.
 * @returns {HTMLElement} - Um contêiner com o select para o ponto de entrega.
 */
function criarPontoEntrega(enderecos) {
    const container = document.createElement('div');
    container.className = 'ponto-entrega';
    container.style.marginBottom = '10px';

    const select = document.createElement('select');
    select.className = 'input-campo';
    select.innerHTML = '<option value="" disabled selected>Selecione um ponto de entrega</option>';

    enderecos.forEach((endereco) => {
        const option = document.createElement('option');
        option.value = endereco.id;
        option.textContent = endereco.description;
        select.appendChild(option);
    });
    
    container.appendChild(select);
    
    return container;
}



// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEnderecos);


