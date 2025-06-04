document.addEventListener("DOMContentLoaded", () => {
  // Animaciones al hacer scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 50) {
        const delay = element.getAttribute("data-delay") || 0
        setTimeout(() => {
          element.classList.add("animated")
        }, delay)
      }
    })
  }

  // Ejecutar animaciones al cargar la página
  animateOnScroll()

  // Ejecutar animaciones al hacer scroll
  window.addEventListener("scroll", animateOnScroll)

  // Crear partículas musicales en el header
  const createMusicParticles = () => {
    const particlesContainer = document.querySelector(".particles-container")
    if (particlesContainer) {
      const symbols = ["♪", "♫", "♬", "♩", "♭", "♮", "♯"]
      const particleCount = 20

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.className = "music-particle"
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)]

        // Posición aleatoria
        const posX = Math.random() * 100
        const posY = Math.random() * 100

        // Tamaño aleatorio
        const size = Math.random() * 1.5 + 0.5

        // Duración aleatoria
        const duration = Math.random() * 15 + 10

        // Retraso aleatorio
        const delay = Math.random() * 5

        particle.style.cssText = `
          position: absolute;
          left: ${posX}%;
          top: ${posY}%;
          font-size: ${size}rem;
          color: rgba(255, 255, 255, 0.3);
          animation: floatParticle ${duration}s linear infinite;
          animation-delay: ${delay}s;
        `

        particlesContainer.appendChild(particle)
      }

      // Añadir la animación al CSS
      const style = document.createElement("style")
      style.textContent = `
        @keyframes floatParticle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }
  }

  createMusicParticles()

  // Contador de estadísticas
  const startCounters = () => {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-count"))
      const duration = 2000 // duración en milisegundos
      const step = Math.ceil(target / (duration / 16)) // 60fps

      let current = 0
      const updateCounter = () => {
        current += step
        if (current > target) current = target
        counter.textContent = current

        if (current < target) {
          requestAnimationFrame(updateCounter)
        }
      }

      updateCounter()
    })
  }

  // Iniciar contadores cuando sean visibles
  const statsContainer = document.querySelector(".stats-container")
  if (statsContainer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(statsContainer)
  }

  // Efecto de hover en las tarjetas de agrupaciones
  const agrupacionCards = document.querySelectorAll(".agrupacion-card")
  agrupacionCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".card-icon i")
      if (icon) {
        icon.style.transform = "scale(1.2) rotate(10deg)"
        icon.style.opacity = "0.3"
      }
    })

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".card-icon i")
      if (icon) {
        icon.style.transform = ""
        icon.style.opacity = "0.2"
      }
    })
  })

  // Formulario de contacto
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulación de envío
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.textContent = "Enviando..."
      submitButton.disabled = true

      setTimeout(() => {
        // Mostrar mensaje de éxito
        const formGroups = this.querySelectorAll(".form-group")
        formGroups.forEach((group) => (group.style.display = "none"))

        submitButton.style.display = "none"

        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.innerHTML = `
          <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--magenta); margin-bottom: 1rem;"></i>
          <h3>¡Mensaje enviado con éxito!</h3>
          <p>Nos pondremos en contacto contigo a la brevedad posible.</p>
        `
        successMessage.style.textAlign = "center"
        successMessage.style.padding = "2rem"

        this.appendChild(successMessage)
      }, 1500)
    })
  }
})
