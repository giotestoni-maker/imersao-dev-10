const resultadosContainer = document.getElementById('resultados-pesquisa');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

/**
 * Renderiza os cards na tela a partir de uma lista de dados.
 * @param {Array} dadosParaRenderizar A lista de personalidades a ser exibida.
 */
function renderizarDados(dadosParaRenderizar) {
    // Limpa os resultados anteriores para não duplicar conteúdo
    resultadosContainer.innerHTML = '';

    if (dadosParaRenderizar.length === 0) {
        resultadosContainer.innerHTML = '<p>Nenhum resultado encontrado para a sua busca.</p>';
        return;
    }

    dadosParaRenderizar.forEach(item => {
        // Cria os elementos HTML para cada card, seguindo o modelo que você deixou comentado no HTML
        const card = document.createElement('article');
        card.classList.add('card');

        const nome = document.createElement('h2');
        nome.textContent = item.nome;

        const descricao = document.createElement('p');
        descricao.textContent = item.descricao;

        const obra = document.createElement('p');
        obra.textContent = `Obra: ${item.obra}`;

        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = 'Ler a obra';
        link.target = '_blank'; // Para abrir o link em uma nova aba

        // Adiciona os elementos criados dentro do card
        card.appendChild(nome);
        card.appendChild(descricao);
        card.appendChild(obra);
        card.appendChild(link);

        // Adiciona o card completo na seção de resultados
        resultadosContainer.appendChild(card);
    });
}

/**
 * Inicia a busca com base no texto digitado pelo usuário.
 */
function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase().trim();
    const dadosFiltrados = dados.filter(item => 
        item.nome.toLowerCase().includes(termoBusca) ||
        item.obra.toLowerCase().includes(termoBusca)
    );
    renderizarDados(dadosFiltrados);
}

// Impede o formulário de recarregar a página ao ser enviado
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    iniciarBusca();
});

// Filtra os resultados em tempo real enquanto o usuário digita
searchInput.addEventListener('input', iniciarBusca);

/**
 * Verifica se há um termo de busca na URL quando a página carrega.
 */
function verificarBuscaUrl() {
    const params = new URLSearchParams(window.location.search);
    const termoBusca = params.get('search');

    if (termoBusca) {
        searchInput.value = termoBusca; // Preenche o campo de busca
        iniciarBusca(); // Executa a busca com o termo da URL
    } else {
        renderizarDados(dados); // Se não houver busca, exibe todos os dados
    }
}

verificarBuscaUrl(); // Executa a verificação assim que o script é carregado
