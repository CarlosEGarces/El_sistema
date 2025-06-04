document.addEventListener("DOMContentLoaded", () => {
  // Inicializar carruseles con efecto de difuminado
  initBlurCarousels()

  // Inicializar animaciones al hacer scroll
  initScrollAnimations()
})

// Función para inicializar los carruseles con efecto de difuminado
function initBlurCarousels() {
  // Obtener todos los contenedores de carruseles
  const carouselContainers = document.querySelectorAll(".blur-carousel-container")

  carouselContainers.forEach((container) => {
    const slides = container.querySelectorAll(".blur-slide")
    const indicators = container.querySelectorAll(".indicator")
    const prevBtn = container.querySelector(".carousel-nav.prev")
    const nextBtn = container.querySelector(".carousel-nav.next")
    let currentIndex = 0
    let interval

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
      // Ocultar todas las diapositivas
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })

      // Desactivar todos los indicadores
      indicators.forEach((indicator) => {
        indicator.classList.remove("active")
      })

      // Mostrar la diapositiva actual
      slides[index].classList.add("active")

      // Activar el indicador actual
      if (indicators[index]) {
        indicators[index].classList.add("active")
      }

      // Actualizar el índice actual
      currentIndex = index
    }

    // Función para mostrar la siguiente diapositiva
    function nextSlide() {
      let nextIndex = currentIndex + 1
      if (nextIndex >= slides.length) {
        nextIndex = 0
      }
      showSlide(nextIndex)
    }

    // Función para mostrar la diapositiva anterior
    function prevSlide() {
      let prevIndex = currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = slides.length - 1
      }
      showSlide(prevIndex)
    }

    // Configurar el intervalo para el cambio automático de diapositivas
    function startAutoSlide() {
      interval = setInterval(nextSlide, 5000)
    }

    // Detener el cambio automático de diapositivas
    function stopAutoSlide() {
      clearInterval(interval)
    }

    // Eventos para los botones de navegación
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide()
        stopAutoSlide()
        startAutoSlide()
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide()
        stopAutoSlide()
        startAutoSlide()
      })
    }

    // Eventos para los indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index)
        stopAutoSlide()
        startAutoSlide()
      })
    })

    // Eventos para pausar el carrusel al pasar el mouse
    container.addEventListener("mouseenter", stopAutoSlide)
    container.addEventListener("mouseleave", startAutoSlide)

    // Iniciar el carrusel
    startAutoSlide()
  })
}

// Función para inicializar las animaciones al hacer scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  // Opciones para el Intersection Observer
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  // Callback para el Intersection Observer
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const animation = element.dataset.animation || "fadeIn"
        const delay = element.dataset.delay || 0

        // Aplicar la animación después del retraso especificado
        setTimeout(() => {
          element.classList.add("animated", animation)
          element.style.opacity = 1
          element.style.transform = "translateY(0)"
        }, delay)

        // Dejar de observar el elemento una vez que se ha animado
        observer.unobserve(element)
      }
    })
  }

  // Crear el Intersection Observer
  const observer = new IntersectionObserver(callback, options)

  // Observar todos los elementos animados
  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Función para manejar la reproducción de videos
function handleVideoPlay() {
  const videoSlides = document.querySelectorAll(".video-slide")

  videoSlides.forEach((slide) => {
    const playButton = slide.querySelector(".play-button")

    if (playButton) {
      playButton.addEventListener("click", () => {
        // Aquí se implementaría la lógica para reproducir el video
        // Por ejemplo, abrir un modal con el video o reemplazar la imagen por un iframe
        console.log("Reproducir video")

        // Ejemplo de cómo podría implementarse:
        // const videoId = slide.dataset.videoId;
        // const videoModal = document.getElementById('video-modal');
        // const videoFrame = document.getElementById('video-frame');
        // videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        // videoModal.style.display = 'flex';
      })
    }
  })
}

// Llamar a la función para manejar la reproducción de videos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  handleVideoPlay()
})
