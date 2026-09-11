document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.negative-impact-section .interactive-block').forEach(block => {
  const line = block.querySelector('.bar-line');
  line.addEventListener('click', () => {
    block.classList.add('is-revealed');
  });
});

  // 1. Lógica de fuentes (! y X) en las demás secciones
  const sourceBlocks = document.querySelectorAll('.source-toggle-block');
  sourceBlocks.forEach(block => {
    const titleContainer = block.querySelector('.section-title');
    const infoBtn = block.querySelector('.info-btn');
    const sourceContainer = block.querySelector('.source-display-container');
    const closeBtn = block.querySelector('.close-btn');

    if (infoBtn && sourceContainer && closeBtn) {
      infoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        titleContainer.classList.add('hidden');
        sourceContainer.classList.remove('hidden');
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sourceContainer.classList.add('hidden');
        titleContainer.classList.remove('hidden');
      });
    }
  });

  // 2. Lógica del botón de interrogación (?) / X en Sección 1
  const chartSection = document.querySelector('.chart-section');
  if (chartSection) {
    const questionBtn = chartSection.querySelector('.question-toggle-btn');
    const initialTitle = chartSection.querySelector('.initial-title');
    const altTitle = chartSection.querySelector('.alt-title');
    const section1Legend = chartSection.querySelector('.section1-legend-box');
    const barsDefault = chartSection.querySelector('.bars-group-default');
    const barsAlt = chartSection.querySelector('.bars-group-alt');

    let isAltActive = false;

    if (questionBtn && initialTitle && altTitle && section1Legend && barsDefault && barsAlt) {
      questionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isAltActive = !isAltActive;

        if (isAltActive) {
          initialTitle.classList.add('hidden');
          altTitle.classList.remove('hidden');
          section1Legend.classList.remove('hidden');
          barsDefault.classList.add('hidden');
          barsAlt.classList.remove('hidden');
          questionBtn.textContent = 'X';
        } else {
          altTitle.classList.add('hidden');
          initialTitle.classList.remove('hidden');
          section1Legend.classList.add('hidden');
          barsAlt.classList.add('hidden');
          barsDefault.classList.remove('hidden');
          questionBtn.textContent = '?';
        }
      });
    }
  }

  // 3. Función genérica de interacción con las rayas (Grupo por defecto)
  function setupBarInteractions(containerSelector) {
    const barItems = document.querySelectorAll(`${containerSelector} .bar-item`);

    barItems.forEach(item => {
      const line = item.querySelector('.bar-line');

      if (line) {
        line.addEventListener('click', (e) => {
          e.stopPropagation();
          item.classList.add('is-revealed');
        });

        line.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.classList.add('is-revealed');
          }
        });
      }
    });
  }

  // 4. Función de interacción para los bloques unificados (Grupo Alternativo - Raya Completa)
  function setupUnifiedBlockInteractions(containerSelector) {
    const blocks = document.querySelectorAll(`${containerSelector} .unified-block`);

    blocks.forEach(block => {
      block.addEventListener('click', (e) => {
        e.stopPropagation();
        block.classList.add('is-revealed');
      });

      block.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          block.classList.add('is-revealed');
        }
      });
    });
  }

  setupBarInteractions('.bars-group-default');
  setupUnifiedBlockInteractions('.bars-group-alt');
  setupBarInteractions('.negative-impact-section');

  // 5. Lógica de giro (Flip) en Sección 3
  const flipContainer = document.getElementById('impact-flip-container');
  const toggleBtn = document.getElementById('toggle-flip-btn');
  const toggleBackBtn = document.getElementById('toggle-flip-back-btn');
  
  if (flipContainer && toggleBtn && toggleBackBtn) {
    const viewDefault = flipContainer.querySelector('.view-default');
    const viewGenerations = flipContainer.querySelector('.view-generations');

    toggleBtn.addEventListener('click', () => {
      viewDefault.classList.remove('active');
      viewGenerations.classList.add('active');
    });

    toggleBackBtn.addEventListener('click', () => {
      viewGenerations.classList.remove('active');
      viewDefault.classList.add('active');
    });
  }

  // 6. Lógica de Radar (Sección 2)
  const radarContainer = document.getElementById('radar-hover-zone');
  const radarBadges = document.querySelector('.radar-badges');

  if (radarContainer && radarBadges) {
    radarContainer.addEventListener('mouseenter', () => {
      radarContainer.classList.add('is-active');
      radarBadges.classList.add('is-active');
    });

    radarContainer.addEventListener('mouseleave', () => {
      radarContainer.classList.remove('is-active');
      radarBadges.classList.remove('is-active');
    });
  }

  // 7. Lógica del Modal para Campañas
  const campaignCards = document.querySelectorAll('.campaign-card');
  const modalOverlay = document.getElementById('campaignModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  campaignCards.forEach(card => {
    const imgBox = card.querySelector('.card-img-box');
    const img = card.querySelector('.card-img');
    const titleText = card.querySelector('.card-link').innerHTML;
    const descText = card.querySelector('.hidden-desc').innerText;

    imgBox.addEventListener('click', () => {
      modalImg.src = img.src;
      modalTitle.innerHTML = titleText;
      modalDesc.innerText = descText;
      modalOverlay.classList.add('is-active');
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('is-active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('is-active');
      }
    });
  }

});
