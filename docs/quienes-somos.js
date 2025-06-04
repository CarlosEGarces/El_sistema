document.addEventListener("DOMContentLoaded", () => {
  // Animación de la línea de tiempo
  const timelineItems = document.querySelectorAll(".timeline-item")

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateX(0)"
      }
    })
  }, observerOptions)

  timelineItems.forEach((item, index) => {
    item.style.opacity = 0
    item.style.transform = "translateX(-50px)"
    item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`
    observer.observe(item)
  })

  // Animación para las tarjetas de valores
  const valorCards = document.querySelectorAll(".valor-card")

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  valorCards.forEach((card, index) => {
    card.style.opacity = 0
    card.style.transform = "translateY(50px)"
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
    cardObserver.observe(card)
  })

  // Animación para los miembros del equipo
  const miembroCards = document.querySelectorAll(".miembro-card")

  const miembroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  miembroCards.forEach((card, index) => {
    card.style.opacity = 0
    card.style.transform = "translateY(50px)"
    card.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`
    miembroObserver.observe(card)
  })

  // Animación para los reconocimientos
  const reconocimientos = document.querySelectorAll(".reconocimiento")

  const reconocimientoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateY(0) scale(1)"
      }
    })
  }, observerOptions)

  reconocimientos.forEach((item, index) => {
    item.style.opacity = 0
    item.style.transform = "translateY(30px) scale(0.9)"
    item.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`
    reconocimientoObserver.observe(item)
  })

  // Animación para la sección de misión y visión
  const misionVision = document.querySelectorAll(".mision, .vision")

  const mvObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  misionVision.forEach((item, index) => {
    item.style.opacity = 0
    item.style.transform = "translateY(30px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`
    mvObserver.observe(item)
  })

  // Efecto parallax para el hero
  const pageHero = document.querySelector(".page-hero")

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset
    if (pageHero) {
      pageHero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
    }
  })
})
