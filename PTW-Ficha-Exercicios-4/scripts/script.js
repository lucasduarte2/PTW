const filePath = './scripts/ficheiro.json';

function preencherTabela(data) {
  const tabela = document.querySelector('table');
  const tbody = document.createElement('tbody');

  data.forEach(item => {
    const row = document.createElement('tr');
    Object.values(item).forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  tabela.appendChild(tbody);
}

fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo');
    }
    return response.json();
  })
  .then(jsonData => {
    preencherTabela(jsonData);
  })
  .catch(error => {
    console.error('Erro:', error);
  });


  // Tabela 2 - Listar e Ordenar

  function agruparPorAno(data) {
    return Object.values(data.reduce((acc, item) => {
      const ano = item['Ano'];
      if (!acc[ano]) {
        acc[ano] = { 'Ano': ano, 'Chave Móvel Digital': 0, 'Cartão de Cidadão': 0, 'Advogado': 0, 'Solicitador': 0, 'Notário': 0 };
      }
      acc[ano]['Chave Móvel Digital'] += parseInt(item['Chave-Movel-Digital']);
      acc[ano]['Cartão de Cidadão'] += parseInt(item['Cartao-Cidadao']);
      acc[ano]['Advogado'] += parseInt(item['Advogado']);
      acc[ano]['Solicitador'] += parseInt(item['Solicitador']);
      acc[ano]['Notário'] += parseInt(item['Notario']);
      return acc;
    }, {}));
  }
  
  function preencherTabelaAgrupada(data) {
    const tbody = document.getElementById('tabela-lista').getElementsByTagName('tbody')[0];
    data.forEach(item => {
      const row = document.createElement('tr');
      Object.values(item).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
  }
  
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo');
      }
      return response.json();
    })
    .then(jsonData => {
      const dadosAgrupados = agruparPorAno(jsonData);
      preencherTabelaAgrupada(dadosAgrupados);
    })
    .catch(error => {
      console.error('Erro:', error);
    });  