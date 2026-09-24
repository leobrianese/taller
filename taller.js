document.addEventListener('DOMContentLoaded', () => {

  // Lógica completa de navegación bidireccional y transiciones fluidas
  const nextChartStateBtn = document.getElementById('nextChartStateBtn');
  const prevChartStateBtn = document.getElementById('prevChartStateBtn');
  const barsContainer = document.getElementById('cardsCarouselContainer');

  // Definimos los 4 estados/gráficos con sus respectivos porcentajes para las 5 barras
  const states = [
    [87, 76, 51, 42, 23], // Gráfico 1 (Inicial)
    [76, 87, 51, 42, 23], // Gráfico 2 (Cambian los primeros dos)
    [23, 42, 51, 76, 87], // Gráfico 3 (Cambian todos)
    [42, 23, 51, 76, 87]  // Gráfico 4 (Vuelven a cambiar los dos primeros)
  ];

  let currentStateIndex = 0;

  function updateChartState() {
    const targetValues = states[currentStateIndex];
    const barItemsArray = Array.from(barsContainer.querySelectorAll('.bar-item'));
    
    // El resto de tu código continúa aquí...

    // Control de visibilidad de las flechas si no está resuelto
    if (!barsContainer.classList.contains('is-resolved')) {
      barsContainer.classList.remove('is-wrong', 'is-correct');
      
      if (prevChartStateBtn) {
        prevChartStateBtn.style.visibility = currentStateIndex === 0 ? 'hidden' : 'visible';
        prevChartStateBtn.style.display = 'flex';
      }
      if (nextChartStateBtn) {
        nextChartStateBtn.style.visibility = currentStateIndex === states.length - 1 ? 'hidden' : 'visible';
        nextChartStateBtn.style.display = 'flex';
      }
    }

    // Actualizamos de forma fluida la altura y el porcentaje de cada barra
    barItemsArray.forEach((barItem, index) => {
      const newPct = targetValues[index];
      const percentageSpan = barItem.querySelector('.bar-percentage');
      const barBox = barItem.querySelector('.rounded-bar');

      if (percentageSpan) {
        percentageSpan.style.opacity = '0';
        setTimeout(() => {
          percentageSpan.textContent = newPct + '%';
          percentageSpan.style.opacity = '1';
        }, 150);
      }

      // Altura proporcional en píxeles (100% = 300px máximos)
      const calculatedHeight = Math.max(40, (newPct / 100) * 300);
      if (barBox) {
        barBox.style.height = `${calculatedHeight}px`;
      }

      barItem.setAttribute('data-percentage', newPct);
    });
  }

  if (nextChartStateBtn && prevChartStateBtn && barsContainer) {
    // Evento para avanzar (Flecha derecha)
    nextChartStateBtn.addEventListener('click', () => {
      if (currentStateIndex < states.length - 1) {
        currentStateIndex++;
        updateChartState();
      }
    });

    // Evento para retroceder (Flecha izquierda)
    prevChartStateBtn.addEventListener('click', () => {
      if (currentStateIndex > 0) {
        currentStateIndex--;
        updateChartState();
      }
    });

    // Evento para validar al hacer clic en el recuadro negro
    barsContainer.addEventListener('click', () => {
      if (barsContainer.classList.contains('is-resolved')) return;

      const correctAnswerSubtitle = document.getElementById('correctAnswerSubtitle');
      const revealText = document.getElementById('revealText');

      const triggerSuccessState = () => {
        currentStateIndex = 2; // Forzamos el Gráfico 3 correcto
        barsContainer.classList.add('is-resolved');
        updateChartState(); 
        
        barsContainer.classList.remove('is-wrong');
        barsContainer.classList.add('is-correct'); 

        if (correctAnswerSubtitle) correctAnswerSubtitle.style.display = 'block';
        if (revealText) revealText.style.display = 'block';

        if (prevChartStateBtn) prevChartStateBtn.style.display = 'none';
        if (nextChartStateBtn) nextChartStateBtn.style.display = 'none';
      };

      if (currentStateIndex === 2) {
        triggerSuccessState();
      } else {
        barsContainer.classList.add('is-wrong'); 
        setTimeout(() => {
          triggerSuccessState();
        }, 1000);
      }
    });

    // Inicializar al cargar la página
    updateChartState();
  }

  // Lógica de Radar (Sección 2)
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

  // 5. Lógica del Modal para Campañas (Sección 4)
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

  // 6. Lógica de Sección 3 (Pregunta interactiva y navegación)
  const section3Question = document.getElementById('section3-question');
  const section3Image = document.getElementById('section3-image');
  const section3Description = document.getElementById('section3-description');
  const section3BottomBox = document.getElementById('section3-bottom-box');
  const section3ExtraText = document.getElementById('section3-extra-text');
  const section3ResetBtn = document.getElementById('section3-reset-btn');
  const globalResetBtn = document.getElementById('section3-global-reset-btn'); 
  const pctBtns = document.querySelectorAll('.pct-btn');
  const chartRelativeBox = document.querySelector('.chart-relative-box'); 

  let respondedSection3 = false; 

  // Asegurar visibilidad inicial de la flecha derecha mediante selector dinámico
  const getNextBtn = () => document.getElementById('section3-next-btn');

  if (getNextBtn()) {
    getNextBtn().style.display = 'flex';
    getNextBtn().style.pointerEvents = 'auto';
  }

  // 1. Al hacer clic en el signo de pregunta inicial (?)
  if (section3Question) {
    section3Question.addEventListener('click', () => {
      if (section3Image) section3Image.src = 'media/grafico2.png';
      if (chartRelativeBox) chartRelativeBox.classList.add('grafico2-mode');

      section3Question.style.display = 'none';
      if (section3Description) section3Description.style.display = 'none';
      if (section3BottomBox) section3BottomBox.style.display = 'block';
      
      if (getNextBtn()) getNextBtn().style.display = 'none';
    });
  }

  // 2. Al seleccionar un porcentaje en la trivia (Gráfico 3)
  pctBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (respondedSection3) return; 
      respondedSection3 = true; 

      const isCorrect = btn.getAttribute('data-correct') === 'true';
      const correctBtn = document.querySelector('.pct-btn[data-correct="true"]');
      
      if (isCorrect) {
        btn.classList.add('is-correct');
        if (section3ExtraText) {
          section3ExtraText.style.display = 'block';
          section3ExtraText.innerHTML = `¡Correcto! El rechazo por parte de los clientes aumentó hasta un`;
          section3ExtraText.style.color = '#ffffff';
        }
      } else {
        btn.classList.add('is-wrong');
        if (correctBtn) correctBtn.classList.add('is-correct');
        
        if (section3ExtraText) {
          section3ExtraText.style.display = 'block';
          section3ExtraText.innerHTML = `Incorrecto. El rechazo por parte de los clientes aumentó hasta un`;
          section3ExtraText.style.color = '#ffffff';
        }
      }

      if (section3Image) section3Image.src = 'media/grafico3.png';
      
      if (section3ResetBtn) section3ResetBtn.style.display = 'flex';
      if (getNextBtn()) {
        getNextBtn().style.display = 'flex';
        getNextBtn().style.pointerEvents = 'auto';
      }
      if (globalResetBtn) globalResetBtn.style.display = 'flex';

      if (chartRelativeBox) {
        chartRelativeBox.classList.remove('grafico2-mode');
        chartRelativeBox.classList.add('grafico3-mode');
      }
    });
  });

  // 3. DELEGACIÓN GLOBAL: Captura el clic en la flecha derecha sin importar cuándo se renderizó
  document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('#section3-next-btn') || e.target.closest('.next-arrow-btn');
    if (!nextBtn) return;

    e.preventDefault();
    e.stopPropagation();

    if (section3Image) section3Image.src = 'media/grafico4.png';
    
    if (section3BottomBox) section3BottomBox.style.display = 'none';
    nextBtn.style.display = 'none';
    if (globalResetBtn) globalResetBtn.style.display = 'none';
    
    if (section3ResetBtn) section3ResetBtn.style.display = 'flex';
    if (section3Question) section3Question.style.display = 'none';

    if (section3Description) {
      section3Description.innerHTML = `
        <p class="impact-description" style="color: #ffffff; font-weight: normal; line-height: 1.4;">
          en los clientes se ve<br>
          una clara diferencia<br>
          entre generaciones
        </p>
      `;
      section3Description.style.display = 'block';
    }

    if (chartRelativeBox) {
      chartRelativeBox.classList.remove('grafico2-mode', 'grafico3-mode');
      chartRelativeBox.classList.add('grafico4-mode');
    }
  });

  // 4. Función de reseteo total
  const resetEntireSection3 = () => {
    respondedSection3 = false;
    pctBtns.forEach(b => b.classList.remove('is-correct', 'is-wrong'));

    if (section3Image) section3Image.src = 'media/grafico1.png';
    if (section3Question) section3Question.style.display = 'block';
    
    if (section3Description) {
      section3Description.innerHTML = `
        <p class="impact-description">
          Los anunciantes están<br>
          aumentando<br>
          rápidamente el uso de<br>
          la IA en la creación<br>
          de anuncios, pero las<br>
          actitudes de los<br>
          consumidores se han<br>
          vuelto más negativas.<br>
          La brecha entre la<br>
          percepción del<br>
          anunciante y la<br>
          opinión del<br>
          consumidor sigue<br>
          ampliándose.
        </p>
      `;
      section3Description.style.display = 'block';
    }

    if (section3BottomBox) section3BottomBox.style.display = 'none';
    if (section3ExtraText) section3ExtraText.style.display = 'none';
    if (section3ResetBtn) section3ResetBtn.style.display = 'none';
    if (getNextBtn()) {
      getNextBtn().style.display = 'flex';
      getNextBtn().style.pointerEvents = 'auto';
    }
    if (globalResetBtn) globalResetBtn.style.display = 'none';

    if (chartRelativeBox) {
      chartRelativeBox.classList.remove('grafico2-mode', 'grafico3-mode', 'grafico4-mode');
    }
  };

  // 5. Lógica inteligente de la flecha izquierda
  if (section3ResetBtn) {
    section3ResetBtn.addEventListener('click', () => {
      const isCurrentlyGrafico4 = section3Image && section3Image.src.includes('grafico4.png');

      if (isCurrentlyGrafico4) {
        resetEntireSection3();
      } else {
        respondedSection3 = false;
        pctBtns.forEach(b => b.classList.remove('is-correct', 'is-wrong'));

        if (section3Image) section3Image.src = 'media/grafico2.png';
        if (section3ExtraText) section3ExtraText.style.display = 'none';
        
        section3ResetBtn.style.display = 'none';
        if (getNextBtn()) {
          getNextBtn().style.display = 'flex';
          getNextBtn().style.pointerEvents = 'auto';
        }
        if (globalResetBtn) globalResetBtn.style.display = 'none';

        if (chartRelativeBox) {
          chartRelativeBox.classList.remove('grafico3-mode');
          chartRelativeBox.classList.add('grafico2-mode');
        }
      }
    });
  }

  if (globalResetBtn) {
    globalResetBtn.addEventListener('click', resetEntireSection3);
  }
});

// Mapeo de los IDs de las cards con sus respectivos links de YouTube listos para preview
// Definimos los links con el tiempo de inicio (start) y final (end) en segundos.
// Por ejemplo, de 0 a 10 segundos (?autoplay=1&start=0&end=10)
const youtubeLinksWithTime = {
  "1": "https://www.youtube.com/embed/Yy6fByUmPuE?autoplay=1&start=0&end=10",
  "2": "https://www.youtube.com/embed/LsPoNd1X0NU?autoplay=1&start=0&end=8",
  "3": "https://www.youtube.com/embed/E-YwjXEVGo8?autoplay=1&start=0&end=10",
  "4": "https://www.youtube.com/embed/yv0NYRq2afI?autoplay=1&start=0&end=10"
};

const modal = document.getElementById("campaignModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalVideoContainer = document.getElementById("modalVideoContainer");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

document.querySelectorAll(".campaign-card").forEach(card => {
  card.querySelector(".card-img-box").addEventListener("click", () => {
    const cardId = card.getAttribute("data-card");
    const titleText = card.querySelector(".card-link").innerText.replace(/\n/g, " ");
    const descText = card.querySelector(".hidden-desc").innerText;
    
    const ytUrl = youtubeLinksWithTime[cardId];

    // Inyectamos el iframe adaptado al espacio de la imagen original
    modalVideoContainer.innerHTML = `
      <iframe width="100%" height="100%" 
        src="${ytUrl}" 
        title="Preview de campaña" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;

    modalTitle.innerText = titleText;
    modalDesc.innerText = descText;

    modal.classList.add("is-active"); // O tu clase para mostrar el modal
  });
});

function closeModal() {
  modal.classList.remove("is-active");
  modalVideoContainer.innerHTML = ""; // Limpia el iframe y detiene el video al cerrar
}

modalCloseBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});