// Simulações Interativas para a Plataforma "Economia com História"

document.addEventListener("DOMContentLoaded", function() {

    /* ==============================================================
       SIMULAÇÕES - PÁGINA DO FÓRUM
       ============================================================== */
    const forumForm = document.querySelector('.contact-form');
    if (forumForm && window.location.pathname.includes('forum')) {
        forumForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const titleInput = document.getElementById('topic-title');
            const tagsInput = document.getElementById('topic-tags');
            const messageInput = document.getElementById('message');
            
            if (titleInput && titleInput.value.trim() !== '') {
                // Selecionar a coluna de "Tópicos Recentes" (o contentor pai)
                const topicsContainer = document.querySelectorAll('.col-lg-6.col-12.ms-auto')[0];
                const headerElement = topicsContainer.querySelector('h2');
                
                // HTML do novo Tópico
                const newTopicHtml = `
                    <div class="custom-block bg-white shadow-lg p-4 mb-4" style="border-radius: var(--border-radius-medium); border-left: 4px solid var(--primary-color);">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="mb-0"><a href="#" class="text-primary" style="color: #6B0F1A !important;">${titleInput.value}</a></h5>
                            <small class="text-danger fw-bold">Agora mesmo</small>
                        </div>
                        <p class="mb-2">Por: Você | ${messageInput.value.substring(0, 80)}${messageInput.value.length > 80 ? '...' : ''}</p>
                        <div class="d-flex justify-content-between">
                            <span class="badge" style="background-color: var(--secondary-color);">${tagsInput.value || 'Geral'}</span>
                            <span><i class="bi-chat-dots-fill me-1"></i> 0 Respostas</span>
                        </div>
                    </div>
                `;
                
                // Inserir logo a seguir ao H2 "Tópicos Recentes"
                headerElement.insertAdjacentHTML('afterend', newTopicHtml);
                
                // Limpar formulário
                forumForm.reset();
                
                // Feedback visual
                alert('Tópico publicado com sucesso na comunidade!');
            }
        });
    }

    /* ==============================================================
       SIMULAÇÕES - PÁGINA DO QUIZ
       ============================================================== */
    /* ==============================================================
       SIMULAÇÕES - PÁGINA DO QUIZ (VERSÃO ROBUSTA)
       ============================================================== */
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const options = document.querySelectorAll('.quiz-option');
        const btnConfirm = document.getElementById('btn-confirm-quiz');
        const questionView = document.getElementById('quiz-question-view');
        const resultView = document.getElementById('quiz-result-view');
        const timerSpan = document.getElementById('timer-val');

        // 1. Seleção de Opções
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remover active de todas
                options.forEach(opt => opt.classList.remove('active'));
                // Adicionar na clicada
                this.classList.add('active');
            });
        });

        // 2. Cronómetro Funcional (Simples)
        let timeLeft = 120; // 2 minutos
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                return;
            }
            timeLeft--;
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            if (timerSpan) {
                timerSpan.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }
        }, 1000);

        // 3. Confirmar e Mostrar Resultado
        if (btnConfirm) {
            btnConfirm.addEventListener('click', function() {
                const activeOption = document.querySelector('.quiz-option.active');
                if (!activeOption) {
                    alert('Por favor, selecione uma resposta antes de continuar.');
                    return;
                }

                // Feedback visual de carregamento (simulado)
                this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processando...';
                this.disabled = true;

                setTimeout(() => {
                    // Esconder pergunta, mostrar resultado
                    questionView.style.display = 'none';
                    resultView.style.display = 'block';
                    
                    // Reset da barra circular (animação)
                    const circle = document.querySelector('.circular-progress-bar');
                    if (circle) {
                        circle.style.strokeDashoffset = '132'; // Valor do mockup (7/10)
                    }

                    // Parar timer
                    clearInterval(timerInterval);
                    
                    // Scroll para o topo
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 1500);
            });
        }
    }

    /* ==============================================================
       SIMULAÇÕES - MODAL PÁGINA ADMIN
       ============================================================== */
    const btnInserir = document.getElementById('btn-inserir-tabela');
    if (btnInserir) {
        btnInserir.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tituloInput = document.getElementById('ipt-titulo');
            const catInput = document.getElementById('ipt-categoria');
            
            let titulo = tituloInput ? tituloInput.value : '';
            if (titulo.trim() === "") {
                alert("Por favor, introduza o Título da Matéria.");
                return;
            }
            let categoria = catInput ? catInput.value : 'Geral';
            
            const tableBody = document.querySelector('#tabela-conteudos tbody');
            if (tableBody) {
                // Formatar Data atual
                const dataAtual = new Date();
                const dia = String(dataAtual.getDate()).padStart(2, '0');
                const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
                const mes = meses[dataAtual.getMonth()];
                const ano = dataAtual.getFullYear();
                const dataFormatada = `${dia} ${mes} ${ano}`;
                
                // Animacao flash color na nova row
                const novaLinha = document.createElement('tr');
                novaLinha.style.backgroundColor = '#fff3cd'; // Amarelo highlight inicial
                novaLinha.style.transition = 'background-color 2s';
                
                novaLinha.innerHTML = `
                    <td><strong>${titulo}</strong> <span class="badge bg-success ms-2">NOVO</span></td>
                    <td><span class="badge bg-secondary">${categoria}</span></td>
                    <td>${dataFormatada}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary btn-modals-editar"><i class="bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger btn-modals-apagar"><i class="bi-trash"></i></button>
                    </td>
                `;
                
                // Inserir no topo da tabela
                tableBody.insertBefore(novaLinha, tableBody.firstChild);
                
                // Fechar Modal (usando Javascript do Bootstrap)
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalPublicar'));
                if (modal) modal.hide();
                
                // Reset campos
                if(tituloInput) tituloInput.value = '';
                
                // Remover highlight amarelo apos 2s
                setTimeout(() => {
                    novaLinha.style.backgroundColor = 'transparent';
                }, 2000);
            }
        });
    }

    // Apagar / Editar linhas
    const documentBody = document.querySelector('body');
    documentBody.addEventListener('click', function(e) {
        
        // APAGAR (Com ícone da lixeira)
        const btnApagar = e.target.closest('.btn-modals-apagar');
        if (btnApagar) {
            e.preventDefault();
            if (confirm("Tem a certeza que deseja APAGAR este conteúdo?")) {
                const row = btnApagar.closest('tr');
                row.remove();
            }
        }
        
        // EDITAR (Com ícone de lápis)
        const btnEditar = e.target.closest('.btn-modals-editar');
        if (btnEditar) {
            e.preventDefault();
            const row = btnEditar.closest('tr');
            const titleCell = row.cells[0];
            
            let nomeAtual = titleCell.textContent;
            nomeAtual = nomeAtual.replace('NOVO', '').trim();
            
            let novoTitulo = prompt("Deseja alterar o nome deste conteúdo?", nomeAtual);
            if (novoTitulo && novoTitulo.trim() !== "" && novoTitulo !== nomeAtual) {
                // Reconstrói a célula com o novo nome
                titleCell.innerHTML = `<strong>${novoTitulo}</strong>`;
                row.style.backgroundColor = '#cfe2ff'; // highlight azul
                setTimeout(() => { row.style.backgroundColor = 'transparent'; }, 1000);
            }
        }
    });

});
