// Dados do fluxograma
const flowchartData = [
    {
        id: 1,
        label: "PROBLEMAS\nAMBIENTAIS",
        type: "problema",
        x: 150,
        y: 50,
        children: [2, 3, 4]
    },
    {
        id: 2,
        label: "Mudança\nClimática",
        type: "problema",
        x: 50,
        y: 150,
        children: [5]
    },
    {
        id: 3,
        label: "Desmatamento",
        type: "problema",
        x: 150,
        y: 150,
        children: [6]
    },
    {
        id: 4,
        label: "Escassez\nde Água",
        type: "problema",
        x: 250,
        y: 150,
        children: [7]
    },
    {
        id: 5,
        label: "TECNOLOGIAS\nIA",
        type: "ia",
        x: 50,
        y: 270,
        children: [8]
    },
    {
        id: 6,
        label: "Machine\nLearning",
        type: "ia",
        x: 150,
        y: 270,
        children: [9]
    },
    {
        id: 7,
        label: "Deep\nLearning",
        type: "ia",
        x: 250,
        y: 270,
        children: [10]
    },
    {
        id: 8,
        label: "SOLUÇÕES",
        type: "solucao",
        x: 50,
        y: 390,
        children: [11]
    },
    {
        id: 9,
        label: "Monitoramento",
        type: "solucao",
        x: 150,
        y: 390,
        children: [12]
    },
    {
        id: 10,
        label: "Otimização",
        type: "solucao",
        x: 250,
        y: 390,
        children: [13]
    },
    {
        id: 11,
        label: "RESULTADOS",
        type: "resultado",
        x: 50,
        y: 510,
        children: []
    },
    {
        id: 12,
        label: "Sustentabilidade",
        type: "resultado",
        x: 150,
        y: 510,
        children: []
    },
    {
        id: 13,
        label: "Planeta Saudável",
        type: "resultado",
        x: 250,
        y: 510,
        children: []
    }
];

// Cores por tipo
const colors = {
    ia: "#9b59b6",
    problema: "#e74c3c",
    solucao: "#27ae60",
    resultado: "#f39c12"
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initFlowchart();
    initNavigation();
    initCards();
});

// Desenhar fluxograma
function initFlowchart() {
    const svg = document.getElementById('flowchart-svg');
    
    // Definir espaço em branco (namespace SVG)
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Criar marcador de seta
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#7f8c8d');
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);
    
    // Desenhar conexões (setas)
    drawConnections(svg);
    
    // Desenhar nós
    drawNodes(svg);
}

function drawConnections(svg) {
    flowchartData.forEach(node => {
        node.children.forEach(childId => {
            const child = flowchartData.find(n => n.id === childId);
            if (child) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const startX = node.x + 100;
                const startY = node.y + 60;
                const endX = child.x + 100;
                const endY = child.y;
                
                const midY = (startY + endY) / 2;
                const pathData = `M ${startX} ${startY} Q ${startX} ${midY} ${endX} ${endY}`;
                
                line.setAttribute('d', pathData);
                line.setAttribute('class', 'flowchart-arrow');
                line.setAttribute('stroke', '#95a5a6');
                
                svg.appendChild(line);
            }
        });
    });
}

function drawNodes(svg) {
    flowchartData.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'flowchart-node');
        g.setAttribute('data-id', node.id);
        
        // Desenhar retângulo
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', node.x);
        rect.setAttribute('y', node.y);
        rect.setAttribute('width', 200);
        rect.setAttribute('height', 60);
        rect.setAttribute('rx', '10');
        rect.setAttribute('fill', colors[node.type]);
        rect.setAttribute('stroke', '#fff');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('opacity', '0.9');
        
        // Desenhar texto
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x + 100);
        text.setAttribute('y', node.y + 35);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', 'bold');
        
        // Tratar quebras de linha
        const lines = node.label.split('\n');
        if (lines.length > 1) {
            lines.forEach((line, index) => {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.setAttribute('x', node.x + 100);
                tspan.setAttribute('dy', index === 0 ? '0' : '1.2em');
                tspan.textContent = line;
                text.appendChild(tspan);
            });
        } else {
            text.textContent = node.label;
        }
        
        g.appendChild(rect);
        g.appendChild(text);
        
        // Adicionar interação
        g.addEventListener('mouseenter', () => highlightNode(node.id, svg));
        g.addEventListener('mouseleave', () => removeHighlight(svg));
        g.addEventListener('click', () => showNodeInfo(node));
        
        svg.appendChild(g);
    });
}

function highlightNode(nodeId, svg) {
    const nodes = svg.querySelectorAll('.flowchart-node');
    nodes.forEach(node => {
        const id = parseInt(node.getAttribute('data-id'));
        if (id === nodeId || isConnected(nodeId, id)) {
            node.style.opacity = '1';
            node.querySelector('rect').style.filter = 'brightness(1.2)';
        } else {
            node.style.opacity = '0.4';
        }
    });
}

function removeHighlight(svg) {
    const nodes = svg.querySelectorAll('.flowchart-node');
    nodes.forEach(node => {
        node.style.opacity = '1';
        node.querySelector('rect').style.filter = 'brightness(1)';
    });
}

function isConnected(nodeId, targetId) {
    const node = flowchartData.find(n => n.id === nodeId);
    if (!node) return false;
    
    if (node.children.includes(targetId)) return true;
    
    return node.children.some(childId => isConnected(childId, targetId));
}

function showNodeInfo(node) {
    const typeLabel = {
        ia: "Tecnologia IA",
        problema: "Problema Ambiental",
        solucao: "Solução",
        resultado: "Resultado"
    };
    
    alert(`${typeLabel[node.type]}\n\n${node.label}`);
}

// Navegação entre seções
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.getAttribute('data-section');
            
            // Remover active de todos
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Adicionar active ao selecionado
            btn.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Cards interativos
function initCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover active de outros cards
            cards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('active');
                }
            });
            
            // Toggle active no card clicado
            this.classList.toggle('active');
        });
    });
}

// Animar elementos ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .impact-box, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// Chamar animação ao carregar
window.addEventListener('load', animateOnScroll);

// Atualizar fluxograma ao redimensionar
window.addEventListener('resize', () => {
    const svg = document.getElementById('flowchart-svg');
    if (svg && svg.parentElement.offsetWidth < 800) {
        // Ajustar para mobile se necessário
        svg.setAttribute('height', '1000');
    }
});

// Adicionar interatividade com teclado
document.addEventListener('keydown', (e) => {
    if (e.key === '1') {
        document.querySelector('[data-section="fluxograma"]').click();
    } else if (e.key === '2') {
        document.querySelector('[data-section="aplicacoes"]').click();
    } else if (e.key === '3') {
        document.querySelector('[data-section="impacto"]').click();
    }
});

// Função para iniciar animação de contador
function animateCounters() {
    const boxes = document.querySelectorAll('.impact-box');
    
    boxes.forEach(box => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    if (progressFill) {
                        progressFill.style.animation = 'fillProgress 2s ease-out forwards';
                    }
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(box);
    });
}

// Chamar função após DOM carregar
setTimeout(animateCounters, 500);

console.log('🌍 Site de IA para Meio Ambiente carregado com sucesso!');
console.log('💡 Dica: Clique nos nós do fluxograma para mais informações!');
console.log('🔧 Use as teclas 1, 2, 3 para navegar entre as seções!');
