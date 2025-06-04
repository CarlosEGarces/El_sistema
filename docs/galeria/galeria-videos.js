document.addEventListener("DOMContentLoaded", () => {
  // Inicializar filtros de la galería
  initGalleryFilters()

  // Inicializar cambio de vista de la galería
  initGalleryViewToggle()

  // Inicializar modal de videos
  initVideoModal()

  // Inicializar botón de cargar más
  initLoadMoreButton()

  // Inicializar animaciones al hacer scroll
  initScrollAnimations()
})

// Función para inicializar los filtros de la galería
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const videoItems = document.querySelectorAll(".video-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover clase activa de todos los botones
      filterButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Añadir clase activa al botón clickeado
      this.classList.add("active")

      // Obtener el filtro seleccionado
      const filter = this.getAttribute("data-filter")

      // Filtrar los elementos de la galería
      videoItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.classList.remove("filtered-out")
          setTimeout(() => {
            item.style.display = "block"
          }, 500)
        } else {
          item.classList.add("filtered-out")
          setTimeout(() => {
            item.style.display = "none"
          }, 500)
        }
      })
    })
  })
}

// Función para inicializar el cambio de vista de la galería
function initGalleryViewToggle() {
  const viewButtons = document.querySelectorAll(".view-btn")
  const videosGrid = document.getElementById("videos-container")

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover clase activa de todos los botones
      viewButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Añadir clase activa al botón clickeado
      this.classList.add("active")

      // Obtener la vista seleccionada
      const view = this.getAttribute("data-view")

      // Cambiar la vista de la galería
      if (view === "grid") {
        videosGrid.classList.remove("list-view")
      } else if (view === "list") {
        videosGrid.classList.add("list-view")
      }
    })
  })
}

// Función para inicializar el modal de videos
function initVideoModal() {
  const videoThumbnails = document.querySelectorAll(".video-thumbnail")
  const modal = document.getElementById("video-modal")
  const videoFrame = document.getElementById("video-frame")
  const modalTitle = document.getElementById("modal-title")
  const modalDescription = document.getElementById("modal-description")
  const closeModal = document.querySelector(".close-modal")

  // Función para abrir el modal
  function openVideoModal(videoId, title, description) {
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
    modalTitle.textContent = title
    modalDescription.textContent = description

    modal.style.display = "block"
    document.body.style.overflow = "hidden" // Evitar scroll en el body
  }

  // Función para cerrar el modal
  function closeVideoModal() {
    videoFrame.src = ""
    modal.style.display = "none"
    document.body.style.overflow = "" // Restaurar scroll en el body
  }

  // Eventos para los thumbnails de video
  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoId = this.getAttribute("data-video-id")
      let title, description

      // Obtener título y descripción del video
      if (this.closest(".featured-video-container")) {
        // Si es el video destacado
        title = this.closest(".featured-video-container").querySelector("h3").textContent
        description = this.closest(".featured-video-container").querySelector(".video-description").textContent
      } else {
        // Si es un video de la galería
        title = this.closest(".video-card").querySelector("h3").textContent
        description = this.closest(".video-card").querySelector(".video-description").textContent
      }

      openVideoModal(videoId, title, description)
    })
  })

  // Evento para cerrar el modal
  closeModal.addEventListener("click", closeVideoModal)

  // Evento para cerrar el modal al hacer clic fuera del contenido
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeVideoModal()
    }
  })

  // Evento para cerrar el modal al presionar ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeVideoModal()
    }
  })
}

// Función para inicializar el botón de cargar más
function initLoadMoreButton() {
  const loadMoreBtn = document.getElementById("load-more-btn")
  const loadingSpinner = loadMoreBtn.querySelector(".fa-spinner")

  loadMoreBtn.addEventListener("click", () => {
    // Mostrar spinner de carga
    loadMoreBtn.querySelector("span").style.display = "none"
    loadingSpinner.style.display = "inline-block"

    // Simular carga de más videos (en una aplicación real, aquí se haría una petición AJAX)
    setTimeout(() => {
      // Aquí se añadirían más videos a la galería

      // Ocultar spinner y mostrar texto del botón
      loadMoreBtn.querySelector("span").style.display = "inline-block"
      loadingSpinner.style.display = "none"

      // Opcional: Deshabilitar el botón si no hay más videos para cargar
      // loadMoreBtn.disabled = true;
      // loadMoreBtn.style.opacity = '0.5';
      // loadMoreBtn.style.cursor = 'not-allowed';
    }, 1500)
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
