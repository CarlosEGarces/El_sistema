document.addEventListener("DOMContentLoaded", () => {
  // Animaciones al hacer scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight * 0.9) {
        const delay = element.getAttribute("data-delay") || 0
        setTimeout(() => {
          element.classList.add("animated")
        }, delay)
      }
    })
  }

  // Iniciar animaciones
  animateOnScroll()
  window.addEventListener("scroll", animateOnScroll)

  // Cambio de tema
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (htmlElement.classList.contains("light-mode")) {
        htmlElement.classList.remove("light-mode")
        htmlElement.classList.add("dark-mode")
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        htmlElement.classList.remove("dark-mode")
        htmlElement.classList.add("light-mode")
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Formulario de contacto
  const contactForm = document.querySelector(".contacto-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Aquí iría la lógica para enviar el formulario
      alert("Gracias por tu interés. Te contactaremos pronto.")
      contactForm.reset()
    })
  }
})
