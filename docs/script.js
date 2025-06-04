
 /** Función que maneja la transición de logo a título en headers de páginas**/

class LogoToTitleAnimation {
  constructor(options = {}) {
    // Configuración por defecto
    this.config = {
      logoSelector: "#page-logo",
      titleSelector: "#page-title",
      showLogoTime: 1000, // Tiempo que se muestra el logo (ms)
      fadeTime: 1500, // Tiempo de transición (ms)
      debug: false, // Modo debug para logs
      ...options,
    }

    this.logo = null
    this.title = null
    this.animationStarted = false

    this.init()
  }

  init() {
    // Buscar elementos en el DOM
    this.logo = document.querySelector(this.config.logoSelector)
    this.title = document.querySelector(this.config.titleSelector)

    if (!this.logo || !this.title) {
      if (this.config.debug) {
        console.warn("LogoToTitleAnimation: No se encontraron los elementos necesarios")
        console.warn("Logo:", this.logo)
        console.warn("Title:", this.title)
      }
      return
    }

    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Elementos encontrados, iniciando animación")
    }

    // Configurar estado inicial
    this.setupInitialState()

    // Iniciar la secuencia de animación
    this.startAnimation()
  }

  setupInitialState() {
    // Asegurar que el logo esté visible
    this.logo.style.opacity = "1"
    this.logo.style.transform = "scale(1)"
    this.logo.style.filter = "none"
    this.logo.style.visibility = "visible"

    // Asegurar que el título esté oculto
    this.title.style.opacity = "0"
    this.title.style.transform = "translate(-50%, -50%) translateY(30px) scale(0.9)"

    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Estado inicial configurado")
    }
  }

  startAnimation() {
    if (this.animationStarted) return
    this.animationStarted = true

    if (this.config.debug) {
      console.log(`LogoToTitleAnimation: Mostrando logo por ${this.config.showLogoTime}ms`)
    }

    // Paso 1: Mostrar logo por el tiempo especificado
    setTimeout(() => {
      this.fadeOutLogo()
    }, this.config.showLogoTime)
  }

  fadeOutLogo() {
    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Difuminando y ocultando logo completamente")
    }

    // Aplicar clase de fade out al logo
    this.logo.classList.add("fade-out")

    // También aplicar estilos directamente para mayor compatibilidad
    this.logo.style.opacity = "0"
    this.logo.style.transform = "scale(0.8)"
    this.logo.style.filter = "blur(2px)"
    this.logo.style.visibility = "hidden"

    // Paso 2: Mostrar título después de un breve delay
    setTimeout(() => {
      this.showTitle()
    }, this.config.fadeTime * 0.1) // 40% del tiempo de fade
  }

  showTitle() {
    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Mostrando título")
    }

    // Aplicar clase de show al título
    this.title.classList.add("show")

    // También aplicar estilos directamente para mayor compatibilidad
    this.title.style.opacity = "1"
    this.title.style.transform = "translate(-50%, -50%) translateY(0) scale(1)"

    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Animación completada")
    }

    // Disparar evento personalizado para notificar que la animación terminó
    this.dispatchCompletionEvent()
  }

  dispatchCompletionEvent() {
    const event = new CustomEvent("logoToTitleAnimationComplete", {
      detail: {
        logo: this.logo,
        title: this.title,
        config: this.config,
      },
    })

    document.dispatchEvent(event)

    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Evento de finalización disparado")
    }
  }

  // Método para reiniciar la animación
  reset() {
    this.animationStarted = false
    this.setupInitialState()

    // Remover clases
    this.logo.classList.remove("fade-out")
    this.title.classList.remove("show")

    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Animación reiniciada")
    }
  }

  // Método para saltar directamente al título
  skipToTitle() {
    if (this.config.debug) {
      console.log("LogoToTitleAnimation: Saltando directamente al título")
    }

    this.fadeOutLogo()
    setTimeout(() => {
      this.showTitle()
    }, 100)
  }
}

// Función de conveniencia para inicializar la animación
function initLogoToTitleAnimation(options = {}) {
  return new LogoToTitleAnimation(options)
}

// Auto-inicialización para la página de calendario
document.addEventListener("DOMContentLoaded", () => {
  // Verificar si estamos en una página que necesita la animación
  const pageLogoExists = document.querySelector("#page-logo")
  const pageTitleExists = document.querySelector("#page-title")

  if (pageLogoExists && pageTitleExists) {
    console.log("Iniciando animación Logo a Título para la página actual")

    // Inicializar la animación con configuración específica
    const animation = initLogoToTitleAnimation({
      logoSelector: "#page-logo",
      titleSelector: "#page-title",
      showLogoTime: 2500, // Mostrar logo por 2.5 segundos
      fadeTime: 1500, // Transición de 1.5 segundos
      debug: true, // Activar logs para debugging
    })

    // Escuchar el evento de finalización
    document.addEventListener("logoToTitleAnimationComplete", (event) => {
      console.log("Animación Logo a Título completada:", event.detail)
    })

    // Opcional: Permitir saltar la animación con clic
    pageLogoExists.addEventListener("click", () => {
      console.log("Logo clickeado, saltando animación")
      animation.skipToTitle()
    })
  }
})

// Exportar para uso en otros archivos si es necesario
if (typeof module !== "undefined" && module.exports) {
  module.exports = { LogoToTitleAnimation, initLogoToTitleAnimation }
}

// Función para crear la navegación móvil
function createMobileNavigation() {
  // Elementos principales
  const mainNav = document.querySelector(".main-nav")
  const navMenu = document.querySelector(".nav-menu")
  const container = mainNav.querySelector(".container")

  if (!mainNav || !navMenu || !container) {
    console.error("No se encontraron los elementos de navegación necesarios")
    return
  }

  // Crear el botón de hamburguesa
  const hamburgerButton = document.createElement("button")
  hamburgerButton.className = "hamburger-menu"
  hamburgerButton.setAttribute("aria-label", "Menú de navegación")
  hamburgerButton.innerHTML = '<i class="fas fa-bars"></i>'

  // Crear el contenedor del menú móvil
  const mobileMenuContainer = document.createElement("div")
  mobileMenuContainer.className = "mobile-menu-container"

  // Crear el encabezado del menú móvil
  const mobileMenuHeader = document.createElement("div")
  mobileMenuHeader.className = "mobile-menu-header"

  // Crear el botón de cierre
  const closeButton = document.createElement("button")
  closeButton.className = "close-menu-button"
  closeButton.setAttribute("aria-label", "Cerrar menú")
  closeButton.innerHTML = '<i class="fas fa-times"></i>'

  // Ensamblar el encabezado del menú móvil
  mobileMenuHeader.appendChild(closeButton)

  // Crear el contenedor para el menú móvil
  const mobileMenu = document.createElement("div")
  mobileMenu.className = "mobile-menu"

  // Añadir los elementos al DOM
  mobileMenuContainer.appendChild(mobileMenuHeader)
  mobileMenuContainer.appendChild(mobileMenu)

  // Añadir estilos dinámicamente
  const style = document.createElement("style")
  style.textContent = `
    /* CORRECCIÓN 2: Botón de tema siempre en el extremo derecho a la mitad de la pantalla */
    .theme-toggle {
      position: fixed !important;
      right: 1rem !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 3.125rem !important;
      height: 3.125rem !important;
      border-radius: 50% !important;
      background-color: var(--text-color) !important;
      color: var(--bg-color) !important;
      border: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 1.5rem !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
      z-index: 1003 !important;
      transition: transform 0.3s ease !important;
      cursor: pointer !important;
    }
    
    .theme-toggle:hover,
    .theme-toggle:focus {
      transform: translateY(-50%) scale(1.1) !important;
    }
    
    /* Asegurar que funcione en todas las pantallas */
    @media (max-width: 480px) {
      .theme-toggle {
        right: 0.5rem !important;
        width: 2.5rem !important;
        height: 2.5rem !important;
        font-size: 1.2rem !important;
      }
    }
    
    @media (min-width: 1200px) {
      .theme-toggle {
        right: 2rem !important;
      }
    }
    
    .hamburger-menu {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-color);
      padding: 10px;
      z-index: 1001;
    }
    
    .mobile-menu-container {
      display: none;
      position: fixed;
      top: 0;
      right: -100%;
      width: 85%;
      max-width: 350px;
      height: 100vh;
      background-color: var(--bg-color);
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
      z-index: 1002;
      transition: right 0.3s ease;
      overflow-y: auto;
    }
    
    .mobile-menu-container.active {
      right: 0;
    }
    
    .mobile-menu-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 1rem;
      border-bottom: 2px solid var(--border-color);
      background-color: var(--bg-color);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    .close-menu-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-color);
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.3s ease;
    }
    
    .close-menu-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .mobile-menu {
      padding: 0;
      background-color: var(--bg-color);
    }
    
    .mobile-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .mobile-menu > ul > li {
      border-bottom: 1px solid var(--border-color);
    }
    
    .mobile-menu > ul > li:last-child {
      border-bottom: none;
    }
    
    .mobile-menu a {
      display: block;
      padding: 1rem 1.5rem;
      font-family: var(--font-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.9rem;
      color: var(--text-color);
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .mobile-menu a:hover {
      background-color: rgba(231, 0, 149, 0.1);
      color: var(--magenta);
    }
    
    /* Estilos específicos para elementos con dropdown */
    .mobile-menu .has-dropdown {
      position: relative;
    }
    
    .mobile-menu .dropdown-toggle {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background: none;
      border: none;
      text-align: left;
      font-family: var(--font-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.9rem;
      color: var(--text-color);
      padding: 1rem 1.5rem;
      transition: all 0.3s ease;
    }
    
    .mobile-menu .dropdown-toggle:hover {
      background-color: rgba(231, 0, 149, 0.1);
      color: var(--magenta);
    }
    
    /* CORRECCIÓN 1: Solo flecha blanca/negra, sin la fucsia */
    .mobile-menu .dropdown-icon {
      font-size: 0.8rem;
      transition: transform 0.3s ease;
      color: var(--text-color) !important; /* Forzar color del texto actual */
      margin-left: 0.5rem;
    }
    
    .mobile-menu .dropdown-toggle.active .dropdown-icon {
      transform: rotate(180deg);
    }
    
    /* Ocultar cualquier otro ícono de dropdown que pueda aparecer */
    .mobile-menu .dropdown-toggle::after {
      display: none !important;
    }
    
    .mobile-menu .dropdown-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease;
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu .dropdown-content.show {
      max-height: 600px;
    }
    
    .mobile-menu .dropdown-content li {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .mobile-menu .dropdown-content li:last-child {
      border-bottom: none;
    }
    
    .mobile-menu .dropdown-content a {
      padding: 0.75rem 2rem;
      font-size: 0.8rem;
      color: var(--text-color);
      opacity: 0.9;
      background-color: transparent;
    }
    
    .mobile-menu .dropdown-content a:hover {
      background-color: rgba(231, 0, 149, 0.15);
      opacity: 1;
      padding-left: 2.5rem;
    }
    
    .overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1001;
    }
    
    @media (max-width: 768px) {
      .hamburger-menu {
        display: block;
      }
      
      .main-nav .container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0.5rem 1rem;
      }
      
      .nav-menu {
        display: none !important;
      }
      
      .mobile-menu-container {
        display: block;
      }
    }
  `

  document.head.appendChild(style)

  // Función para crear el menú móvil con dropdowns funcionales
  function createMobileMenuItems() {
    // Obtener todos los elementos del menú original
    const originalItems = navMenu.querySelectorAll(".nav-item")

    // Crear una nueva lista para el menú móvil
    const mobileMenuList = document.createElement("ul")

    originalItems.forEach((item, index) => {
      const newItem = document.createElement("li")

      // Obtener el enlace principal
      const mainLink = item.querySelector("a")
      if (mainLink) {
        // Verificar si tiene dropdown
        const dropdownMenu = item.querySelector(".dropdown-menu")

        if (dropdownMenu && dropdownMenu.children.length > 0) {
          // Es un elemento con dropdown
          newItem.className = "has-dropdown"

          // Crear el botón toggle para el dropdown
          const toggleButton = document.createElement("button")
          toggleButton.className = "dropdown-toggle"
          toggleButton.setAttribute("aria-expanded", "false")

          // CORRECCIÓN 1: Solo una flecha al final, color del texto actual
          toggleButton.innerHTML = `
            <span>${mainLink.textContent}</span>
            <span class="dropdown-icon">▼</span>
          `

          // Crear el contenedor del dropdown
          const dropdownContent = document.createElement("ul")
          dropdownContent.className = "dropdown-content"

          // Añadir los elementos del dropdown
          const dropdownItems = dropdownMenu.querySelectorAll("a")
          dropdownItems.forEach((dropdownItem) => {
            const newDropdownItem = document.createElement("li")
            const newDropdownLink = document.createElement("a")
            newDropdownLink.href = dropdownItem.href
            newDropdownLink.textContent = dropdownItem.textContent

            // Añadir event listener para cerrar el menú al hacer clic en un enlace
            newDropdownLink.addEventListener("click", () => {
              closeMobileMenu()
            })

            newDropdownItem.appendChild(newDropdownLink)
            dropdownContent.appendChild(newDropdownItem)
          })

          newItem.appendChild(toggleButton)
          newItem.appendChild(dropdownContent)
        } else {
          // Es un enlace simple
          const newLink = document.createElement("a")
          newLink.href = mainLink.href
          newLink.textContent = mainLink.textContent

          // Añadir event listener para cerrar el menú al hacer clic en un enlace
          newLink.addEventListener("click", () => {
            closeMobileMenu()
          })

          newItem.appendChild(newLink)
        }
      }

      mobileMenuList.appendChild(newItem)
    })

    // Limpiar el contenido anterior y añadir el nuevo menú
    mobileMenu.innerHTML = ""
    mobileMenu.appendChild(mobileMenuList)

    console.log("Menú móvil creado con", originalItems.length, "elementos")
  }

  // Crear el menú móvil
  createMobileMenuItems()

  // Añadir el botón de hamburguesa al DOM
  container.appendChild(hamburgerButton)
  document.body.appendChild(mobileMenuContainer)

  // Crear overlay para fondo oscuro cuando el menú está abierto
  const overlay = document.createElement("div")
  overlay.className = "overlay"
  document.body.appendChild(overlay)

  // Función para abrir el menú móvil
  function openMobileMenu() {
    mobileMenuContainer.classList.add("active")
    overlay.style.display = "block"
    document.body.style.overflow = "hidden"
    hamburgerButton.setAttribute("aria-expanded", "true")
  }

  // Función para cerrar el menú móvil
  function closeMobileMenu() {
    mobileMenuContainer.classList.remove("active")
    overlay.style.display = "none"
    document.body.style.overflow = ""
    hamburgerButton.setAttribute("aria-expanded", "false")

    // Cerrar todos los dropdowns abiertos
    const openDropdowns = mobileMenu.querySelectorAll(".dropdown-content.show")
    const activeToggles = mobileMenu.querySelectorAll(".dropdown-toggle.active")

    openDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show")
    })

    activeToggles.forEach((toggle) => {
      toggle.classList.remove("active")
      toggle.setAttribute("aria-expanded", "false")
    })
  }

  // Event listeners principales
  hamburgerButton.addEventListener("click", openMobileMenu)
  closeButton.addEventListener("click", closeMobileMenu)
  overlay.addEventListener("click", closeMobileMenu)

  // Configurar los dropdowns después de crear el menú
  function setupMobileDropdowns() {
    const dropdownToggles = mobileMenu.querySelectorAll(".dropdown-toggle")

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()

        const parent = this.parentNode
        const dropdownContent = parent.querySelector(".dropdown-content")
        const isOpen = dropdownContent.classList.contains("show")

        // Cerrar todos los otros dropdowns
        const allDropdowns = mobileMenu.querySelectorAll(".dropdown-content")
        const allToggles = mobileMenu.querySelectorAll(".dropdown-toggle")

        allDropdowns.forEach((dropdown) => {
          if (dropdown !== dropdownContent) {
            dropdown.classList.remove("show")
          }
        })

        allToggles.forEach((otherToggle) => {
          if (otherToggle !== this) {
            otherToggle.classList.remove("active")
            otherToggle.setAttribute("aria-expanded", "false")
          }
        })

        // Toggle el dropdown actual
        if (isOpen) {
          dropdownContent.classList.remove("show")
          this.classList.remove("active")
          this.setAttribute("aria-expanded", "false")
        } else {
          dropdownContent.classList.add("show")
          this.classList.add("active")
          this.setAttribute("aria-expanded", "true")
        }

        console.log("Dropdown toggled:", this.textContent, isOpen ? "cerrado" : "abierto")
      })
    })

    console.log("Configurados", dropdownToggles.length, "dropdowns")
  }

  // Configurar los dropdowns
  setupMobileDropdowns()

  // Función para verificar el tamaño de la pantalla
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      navMenu.style.display = "none"
      hamburgerButton.style.display = "block"
    } else {
      navMenu.style.display = "flex"
      hamburgerButton.style.display = "none"
      closeMobileMenu()
    }
  }

  // Event listeners para cambios de tamaño
  window.addEventListener("load", checkScreenSize)
  window.addEventListener("resize", checkScreenSize)

  // Ejecutar verificación inicial
  checkScreenSize()

  console.log("Navegación móvil con dropdowns funcionales creada correctamente")
}

document.addEventListener("DOMContentLoaded", () => {
  // Crear la navegación móvil primero
  createMobileNavigation()

  // Inicializar animaciones al hacer scroll
  initScrollAnimations()

  // Funcionalidad para el video del header (solo en landing page)
  const headerVideo = document.getElementById("header-video")
  const headerLogo = document.getElementById("header-logo")

  if (headerVideo && headerLogo) {
    // Función para mostrar el logo con animación
    const showLogo = () => {
      setTimeout(() => {
        headerLogo.style.opacity = "1"
        headerLogo.style.transform = "scale(1)"
      }, 500) // Espera 500ms después de que termine el video
    }

    // Reproducir el video automáticamente cuando la página esté lista
    headerVideo
      .play()
      .then(() => {
        console.log("Video iniciado correctamente")
      })
      .catch((error) => {
        console.log("Reproducción automática no permitida:", error)

        // Si la reproducción automática no está permitida, mostrar un botón para reproducir
        const playButton = document.createElement("button")
        playButton.innerHTML = '<i class="fas fa-play"></i>'
        playButton.className = "video-play-button"
        playButton.setAttribute("aria-label", "Reproducir video")

        const videoContainer = document.querySelector(".video-container")
        videoContainer.appendChild(playButton)

        playButton.addEventListener("click", () => {
          headerVideo.play().then(() => {
            playButton.style.display = "none"
          })
        })

        // Mostrar logo inmediatamente si no se puede reproducir el video
        showLogo()
      })

    // Cuando el video termine, mostrar el logo
    headerVideo.addEventListener("ended", () => {
      console.log("Video terminado, mostrando logo")
      showLogo()

      // Después de mostrar el logo, difuminar el video
      setTimeout(() => {
        headerVideo.style.opacity = "0.3"
      }, 1000)
    })

    // Si el video se puede reproducir, asegurar que el logo esté oculto inicialmente
    headerVideo.addEventListener("loadeddata", () => {
      headerLogo.style.opacity = "0"
      headerLogo.style.transform = "scale(0.8)"
    })

    // Fallback: Si el video no se carga en 3 segundos, mostrar el logo
    setTimeout(() => {
      if (headerVideo.readyState < 2) {
        // Si el video no está listo
        console.log("Video no se cargó, mostrando logo como fallback")
        showLogo()
      }
    }, 3000)
  }

  // Botón para cambiar entre modo claro y oscuro
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement

  // Verificar si hay una preferencia guardada en localStorage
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    htmlElement.className = savedTheme
    updateThemeIcon(savedTheme === "light-mode")
  }

  themeToggle.addEventListener("click", () => {
    const isLightMode = htmlElement.classList.contains("light-mode")

    if (isLightMode) {
      htmlElement.classList.remove("light-mode")
      htmlElement.classList.add("dark-mode")
      localStorage.setItem("theme", "dark-mode")
      updateThemeIcon(false)
    } else {
      htmlElement.classList.remove("dark-mode")
      htmlElement.classList.add("light-mode")
      localStorage.setItem("theme", "light-mode")
      updateThemeIcon(true)
    }
  })

  function updateThemeIcon(isLightMode) {
    const icon = themeToggle.querySelector("i")
    if (isLightMode) {
      icon.className = "fas fa-moon"
    } else {
      icon.className = "fas fa-sun"
    }
  }

  // Funcionalidad del carrusel (solo si existe)
  const carousel = document.querySelector(".carousel")
  const slides = document.querySelectorAll(".carousel-slide")
  const prevButton = document.querySelector(".carousel-button.prev")
  const nextButton = document.querySelector(".carousel-button.next")
  const dots = document.querySelectorAll(".dot")

  let currentSlide = 0
  const totalSlides = slides.length

  // Función para mostrar una diapositiva específica
  function showSlide(index) {
    // Asegurarse de que el índice esté dentro del rango
    if (index < 0) {
      currentSlide = totalSlides - 1
    } else if (index >= totalSlides) {
      currentSlide = 0
    } else {
      currentSlide = index
    }

    // Ocultar todas las diapositivas y desactivar todos los puntos
    slides.forEach((slide, i) => {
      slide.classList.remove("active")
      slide.setAttribute("aria-hidden", "true")
      if (dots[i]) {
        dots[i].classList.remove("active")
        dots[i].setAttribute("aria-selected", "false")
      }
    })

    // Mostrar la diapositiva actual y activar el punto correspondiente
    if (slides[currentSlide]) {
      slides[currentSlide].classList.add("active")
      slides[currentSlide].setAttribute("aria-hidden", "false")
    }
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active")
      dots[currentSlide].setAttribute("aria-selected", "true")
    }
  }

  // Configurar los botones de navegación
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      showSlide(currentSlide - 1)
    })

    nextButton.addEventListener("click", () => {
      showSlide(currentSlide + 1)
    })
  }

  // Configurar los puntos de navegación
  if (dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const slideIndex = Number.parseInt(this.getAttribute("data-index"))
        showSlide(slideIndex)
      })
    })
  }

  // Añadir navegación por teclado para el carrusel
  if (carousel) {
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        showSlide(currentSlide - 1)
      } else if (e.key === "ArrowRight") {
        showSlide(currentSlide + 1)
      }
    })

    // Cambio automático de diapositivas cada 3 segundos
    let slideInterval = setInterval(() => {
      showSlide(currentSlide + 1)
    }, 3000)

    // Pausar el carrusel al pasar el ratón por encima o al enfocarlo
    carousel.addEventListener("mouseenter", () => {
      clearInterval(slideInterval)
    })

    carousel.addEventListener("focusin", () => {
      clearInterval(slideInterval)
    })

    // Reanudar el carrusel al quitar el ratón o el foco
    carousel.addEventListener("mouseleave", () => {
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1)
      }, 3000)
    })

    carousel.addEventListener("focusout", () => {
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1)
      }, 3000)
    })
  }

  // Personalización de animaciones para elementos específicos del menú
  const donacionesItem = document.querySelector('a[href="#donaciones"]')
  const galeriaItem = document.querySelector('a[href="#galeria"]')

  // Verificar si existen los elementos antes de manipularlos
  if (donacionesItem) {
    const parentNode = donacionesItem.parentNode
    const musicNotes = parentNode.querySelector(".music-notes")
    if (musicNotes) {
      musicNotes.classList.add("hearts-animation")
      musicNotes.classList.remove("music-notes")
    }
  }

  // Reemplazar las notas musicales por cámaras en "Galería audiovisual"
  if (galeriaItem) {
    const parentNode = galeriaItem.parentNode
    const musicNotes = parentNode.querySelector(".music-notes")
    if (musicNotes) {
      musicNotes.classList.add("camera-animation")
      musicNotes.classList.remove("music-notes")
    }
  }

  // Función para manejar el scroll suave a las secciones
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Obtener el destino del enlace
      const targetId = this.getAttribute("href")

      // Si es un enlace interno, hacer scroll suave
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Añadir foco al elemento de destino para mejorar la accesibilidad
        targetElement.setAttribute("tabindex", "-1")
        targetElement.focus({ preventScroll: true })
      }
    })
  })

  // Efecto hover en los elementos del menú
  const navItems = document.querySelectorAll(".nav-menu li")
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.transition = "transform 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Efecto de animación para los gradientes
  const gradientElements = document.querySelectorAll(".header-gradient, .second-gradient, .calendar-header-gradient")
  gradientElements.forEach((element) => {
    element.addEventListener("mouseover", function () {
      this.style.backgroundSize = "200% 200%"
      this.style.transition = "background-position 1s ease"
      this.style.backgroundPosition = "100% 50%"
    })

    element.addEventListener("mouseout", function () {
      this.style.backgroundPosition = "0% 50%"
    })
  })

  // Inicializar el carrusel si existe
  if (slides.length > 0) {
    showSlide(0)
  }
})

// Función para inicializar las animaciones al hacer scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  // Función para verificar si un elemento está en el viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
  }

  // Función para animar elementos visibles
  function animateElementsInView() {
    animatedElements.forEach((element) => {
      if (isElementInViewport(element) && !element.classList.contains("animated")) {
        // Obtener el tipo de animación y el retraso
        const animation = element.dataset.animation || "fadeIn"
        const delay = Number.parseInt(element.dataset.delay || 0)

        // Aplicar el retraso
        setTimeout(() => {
          element.classList.add("animated")
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
          element.style.animationName = animation
        }, delay)
      }
    })
  }

  // Verificar elementos al cargar la página
  animateElementsInView()

  // Verificar elementos al hacer scroll
  window.addEventListener("scroll", animateElementsInView)
}

console.log("Script principal con soporte para animación Logo a Título cargado correctamente")
