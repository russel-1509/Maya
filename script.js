const items = {
  problema: {
    title: 'Problemas da Mata Atlântica',
    text: 'A Mata Atlântica sofre com desmatamento, incêndios, perda de biodiversidade e fragmentação de habitats. A ação humana e a pressão econômica aceleram o ritmo de degradação.',
    bullets: [
      'Desmatamento para agricultura e urbanização',
      'Incêndios provocados ou acidentais',
      'Perda de espécies endêmicas',
      'Degradação de rios, solos e microclimas'
    ]
  },
  monitoramento: {
    title: 'Monitoramento inteligente',
    text: 'A IA pode analisar imagens de satélite, drones e sensores para detectar áreas em risco, mudanças de cobertura vegetal e focos de incêndio em tempo real.',
    bullets: [
      'Mapeamento automático de áreas desmatadas',
      'Detecção de incêndios com alertas rápidos',
      'Análise de imagens para comparar anos e regiões',
      'Identificação de áreas prioritárias para proteção'
    ]
  },
  restauracao: {
    title: 'Restauração ecológica',
    text: 'Modelos de IA ajudam a escolher espécies adequadas, prever a regeneração natural e planejar ações de reflorestamento em regiões com maior impacto.',
    bullets: [
      'Escolha de espécies nativas por bioma e solo',
      'Planejamento de corredores ecológicos',
      'Previsão de sobrevivência das mudas',
      'Acompanhamento do crescimento da floresta'
    ]
  },
  prevencao: {
    title: 'Prevenção e resposta',
    text: 'Com dados históricos e aprendizado de máquina, é possível prever riscos, identificar padrões de incêndio e orientar equipes de combate antes que o dano seja irreversível.',
    bullets: [
      'Análise de clima, umidade e temperatura',
      'Modelos de risco para áreas vulneráveis',
      'Ajuda na logística de resposta emergencial',
      'Monitoramento de atividades suspeitas'
    ]
  },
  comunidade: {
    title: 'Engajamento da comunidade',
    text: 'A IA também pode apoiar escolas, comunidades e gestores públicos com alertas, educação ambiental e ferramentas acessíveis para o cuidado com a floresta.',
    bullets: [
      'Aplicativos para reportar focos de destruição',
      'Campanhas com linguagem acessível e visual',
      'Indicadores para gestores e moradores',
      'Ação coletiva com dados em tempo real'
    ]
  },
  resultado: {
    title: 'Resultado esperado',
    text: 'Quando as tecnologias são usadas com responsabilidade e junto da população, a IA pode fortalecer a proteção da Mata Atlântica, reduzir perdas e acelerar a recuperação dos ecossistemas.',
    bullets: [
      'Menos desmatamento e incêndios',
      'Mais proteção para espécies e rios',
      'Gestão pública mais eficiente',
      'Restauração mais rápida e inteligente'
    ]
  }
};

const nodes = document.querySelectorAll('.node');
const panelTitle = document.getElementById('panel-title');
const panelText = document.getElementById('panel-text');
const panelList = document.getElementById('panel-list');

function renderItem(key) {
  const item = items[key];
  if (!item) return;

  panelTitle.textContent = item.title;
  panelText.textContent = item.text;
  panelList.innerHTML = '';

  item.bullets.forEach((bullet) => {
    const li = document.createElement('li');
    li.textContent = bullet;
    panelList.appendChild(li);
  });
}

nodes.forEach((node) => {
  node.addEventListener('click', () => {
    const key = node.dataset.target;
    renderItem(key);

    nodes.forEach((n) => n.classList.remove('active'));
    node.classList.add('active');
  });
});

renderItem('monitoramento');
