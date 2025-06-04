// Test "¿Qué instrumento musical eres?"
class InstrumentoTest {
  constructor() {
    this.currentQuestion = 0
    this.scores = {
      violin: 0,
      piano: 0,
      guitarra: 0,
      flauta: 0,
      trompeta: 0,
      bateria: 0,
      saxofon: 0,
      arpa: 0,
      clarinete: 0,
      cello: 0,
    }

    this.questions = [
      {
        question: "¿Cómo describirías tu personalidad?",
        options: [
          { text: "Apasionada e intensa", scores: { violin: 3, piano: 2, cello: 3 } },
          { text: "Versátil y adaptable", scores: { piano: 3, guitarra: 2, saxofon: 2 } },
          { text: "Enérgica y extrovertida", scores: { trompeta: 3, bateria: 3, saxofon: 2 } },
          { text: "Tranquila y reflexiva", scores: { flauta: 3, arpa: 3, clarinete: 2 } },
          { text: "Creativa y expresiva", scores: { guitarra: 3, piano: 2, violin: 2 } },
        ],
      },
      {
        question: "¿Qué papel prefieres en un grupo?",
        options: [
          { text: "Liderar y destacar", scores: { violin: 3, trompeta: 3, piano: 2 } },
          { text: "Apoyar desde el fondo", scores: { cello: 3, bateria: 2, arpa: 2 } },
          { text: "Alternar entre protagonismo y acompañamiento", scores: { guitarra: 3, piano: 3, saxofon: 2 } },
          { text: "Añadir color y matices", scores: { flauta: 3, clarinete: 3, arpa: 2 } },
          { text: "Mantener el ritmo y la estructura", scores: { bateria: 3, piano: 2, guitarra: 2 } },
        ],
      },
      {
        question: "¿Qué tipo de música te gusta más?",
        options: [
          { text: "Clásica", scores: { violin: 3, piano: 3, cello: 3, arpa: 2 } },
          { text: "Rock/Pop", scores: { guitarra: 3, bateria: 3, piano: 2 } },
          { text: "Jazz", scores: { saxofon: 3, piano: 3, trompeta: 2, clarinete: 2 } },
          { text: "Folk/Acústica", scores: { guitarra: 3, flauta: 2, arpa: 3 } },
          { text: "Electrónica/Experimental", scores: { piano: 2, saxofon: 2, clarinete: 2 } },
        ],
      },
      {
        question: "¿Cómo te gusta expresarte?",
        options: [
          { text: "Con emociones intensas", scores: { violin: 3, cello: 3, piano: 2 } },
          { text: "Con ritmo y energía", scores: { bateria: 3, guitarra: 2, trompeta: 2 } },
          { text: "Con sutileza y delicadeza", scores: { flauta: 3, arpa: 3, clarinete: 2 } },
          { text: "Con versatilidad y adaptabilidad", scores: { piano: 3, saxofon: 3, guitarra: 2 } },
          { text: "Con potencia y presencia", scores: { trompeta: 3, bateria: 2, saxofon: 2 } },
        ],
      },
      {
        question: "¿Qué cualidad valoras más en la música?",
        options: [
          { text: "La melodía", scores: { violin: 3, flauta: 3, piano: 2 } },
          { text: "El ritmo", scores: { bateria: 3, guitarra: 2, piano: 2 } },
          { text: "La armonía", scores: { piano: 3, guitarra: 3, arpa: 2 } },
          { text: "La improvisación", scores: { saxofon: 3, trompeta: 2, guitarra: 2 } },
          { text: "La expresividad", scores: { cello: 3, violin: 2, clarinete: 2 } },
        ],
      },
      {
        question: "¿Cómo te ven los demás?",
        options: [
          { text: "Elegante y sofisticado/a", scores: { violin: 3, piano: 3, arpa: 3 } },
          { text: "Divertido/a y sociable", scores: { guitarra: 3, saxofon: 3, trompeta: 2 } },
          { text: "Tranquilo/a y profundo/a", scores: { cello: 3, clarinete: 2, flauta: 2 } },
          { text: "Enérgico/a y dinámico/a", scores: { bateria: 3, trompeta: 3, saxofon: 2 } },
          { text: "Creativo/a y único/a", scores: { piano: 2, arpa: 2, flauta: 3 } },
        ],
      },
      {
        question: "¿Qué ambiente prefieres?",
        options: [
          { text: "Elegante y formal", scores: { violin: 3, piano: 3, arpa: 2 } },
          { text: "Animado y festivo", scores: { trompeta: 3, bateria: 3, saxofon: 2 } },
          { text: "Íntimo y acogedor", scores: { guitarra: 3, flauta: 2, clarinete: 3 } },
          { text: "Creativo y experimental", scores: { piano: 2, saxofon: 3, clarinete: 2 } },
          { text: "Relajado y natural", scores: { flauta: 3, arpa: 3, guitarra: 2 } },
        ],
      },
    ]

    this.instrumentInfo = {
      violin: {
        nombre: "Violín",
        emoji: "🎻",
        descripcion:
          "Eres apasionado/a, expresivo/a y sensible. Te gusta destacar y transmitir emociones intensas. Tienes un lado perfeccionista y disfrutas de los desafíos. Como el violín, puedes ser tanto protagonista como parte de un conjunto, adaptándote a diferentes situaciones con elegancia.",
        personalidad: "Apasionada, perfeccionista, expresiva",
        fortalezas: "Expresión emocional, adaptabilidad, precisión",
        generos: "Clásica, folk, jazz, contemporánea",
      },
      piano: {
        nombre: "Piano",
        emoji: "🎹",
        descripcion:
          "Eres versátil, completo/a y autosuficiente. Puedes adaptarte a cualquier situación y tienes la capacidad de hacer varias cosas a la vez. Como el piano, eres armónico/a y puedes ser tanto protagonista como acompañante. Tienes profundidad emocional y un amplio rango de expresión.",
        personalidad: "Versátil, equilibrada, completa",
        fortalezas: "Adaptabilidad, independencia, expresión armónica",
        generos: "Clásica, jazz, pop, prácticamente todos",
      },
      guitarra: {
        nombre: "Guitarra",
        emoji: "🎸",
        descripcion:
          "Eres sociable, versátil y accesible. Te adaptas bien a diferentes grupos y situaciones. Como la guitarra, puedes ser tanto el centro de atención como un excelente apoyo para otros. Tienes un espíritu libre y creativo, con la capacidad de improvisar cuando la situación lo requiere.",
        personalidad: "Sociable, adaptable, creativa",
        fortalezas: "Versatilidad, accesibilidad, expresión personal",
        generos: "Rock, pop, folk, clásica, jazz, flamenco",
      },
      flauta: {
        nombre: "Flauta",
        emoji: "🎵",
        descripcion:
          "Eres delicado/a, expresivo/a y con una sensibilidad especial. Como la flauta, tienes una voz única que puede destacar con sutileza. Prefieres la elegancia a la estridencia y sabes cómo añadir belleza a cualquier situación con tu presencia ligera pero significativa.",
        personalidad: "Delicada, sensible, expresiva",
        fortalezas: "Sutileza, expresividad melódica, adaptabilidad",
        generos: "Clásica, folk, jazz, música del mundo",
      },
      trompeta: {
        nombre: "Trompeta",
        emoji: "🎺",
        descripcion:
          "Eres extrovertido/a, confiado/a y no temes hacerte notar. Como la trompeta, tienes una presencia brillante y enérgica. Eres directo/a en tu comunicación y tienes la capacidad de liderar y animar a los demás con tu entusiasmo y carisma.",
        personalidad: "Extrovertida, confiada, enérgica",
        fortalezas: "Liderazgo, presencia, comunicación directa",
        generos: "Jazz, salsa, clásica, mariachi, big band",
      },
      bateria: {
        nombre: "Batería",
        emoji: "🥁",
        descripcion:
          "Eres enérgico/a, rítmico/a y fundamental para mantener las cosas en movimiento. Como la batería, proporcionas la estructura y el impulso que los demás necesitan. Tienes resistencia y determinación, y aunque no siempre estés en el centro de atención, tu presencia es esencial para el éxito del conjunto.",
        personalidad: "Enérgica, estable, coordinada",
        fortalezas: "Mantener el ritmo, coordinación, resistencia",
        generos: "Rock, jazz, pop, prácticamente todos",
      },
      saxofon: {
        nombre: "Saxofón",
        emoji: "🎷",
        descripcion:
          "Eres expresivo/a, versátil y con un toque de sofisticación. Como el saxofón, puedes ser suave y melódico o potente y llamativo según la ocasión. Tienes un espíritu libre que disfruta de la improvisación y una personalidad que puede adaptarse a diferentes ambientes manteniendo siempre tu estilo único.",
        personalidad: "Expresiva, versátil, con estilo propio",
        fortalezas: "Improvisación, expresividad, adaptabilidad",
        generos: "Jazz, blues, rock, funk, música latina",
      },
      arpa: {
        nombre: "Arpa",
        emoji: "🪕",
        descripcion:
          "Eres refinado/a, sensible y con una belleza etérea. Como el arpa, tienes una presencia elegante y única. Eres capaz de crear ambientes mágicos con tu delicadeza y profundidad. Aunque puedes parecer frágil, tienes una fuerza interior y una complejidad que sorprende a quienes te conocen bien.",
        personalidad: "Refinada, sensible, etérea",
        fortalezas: "Elegancia, creación de atmósferas, sensibilidad",
        generos: "Clásica, celta, new age, música de cámara",
      },
      clarinete: {
        nombre: "Clarinete",
        emoji: "🎵",
        descripcion:
          "Eres versátil, expresivo/a y con una rica gama de matices. Como el clarinete, puedes ser dulce y melancólico o alegre y vivaz. Tienes la capacidad de adaptarte a diferentes situaciones manteniendo tu voz distintiva. Eres reflexivo/a pero también sabes cómo divertirte cuando llega el momento.",
        personalidad: "Versátil, expresiva, rica en matices",
        fortalezas: "Adaptabilidad, expresión emocional, versatilidad",
        generos: "Clásica, jazz, klezmer, música de cámara",
      },
      cello: {
        nombre: "Violonchelo",
        emoji: "🎻",
        descripcion:
          "Eres profundo/a, cálido/a y con una intensidad emocional especial. Como el violonchelo, tienes una voz que resuena con el alma. Eres reflexivo/a y prefieres la profundidad a la superficialidad. Aunque puedes brillar como solista, también disfrutas proporcionando una base armónica sólida para los demás.",
        personalidad: "Profunda, cálida, reflexiva",
        fortalezas: "Expresión emocional, profundidad, versatilidad",
        generos: "Clásica, música de cámara, contemporánea, folk",
      },
    }

    this.isTestRunning = false
    this.setupTest()
  }

  setupTest() {
    // Crear el botón de test si no existe
    if (!document.getElementById("instrumento-button")) {
      this.createTestButton()
    }
  }

  createTestButton() {
    // Crear el botón del test con solo icono
    const testButton = document.createElement("button")
    testButton.id = "instrumento-button"
    testButton.className = "instrumento-button"
    testButton.innerHTML = "🎼" // Solo el icono de partitura
    testButton.title = "¿Qué instrumento eres?" // Tooltip para explicar la función
    testButton.addEventListener("click", () => this.startTest())

    // Agregar el botón al header
    const header = document.querySelector(".header")
    if (header) {
      // Insertar después del botón de trivia si existe, o antes del botón de cerrar
      const triviaButton = document.getElementById("trivia-button")
      if (triviaButton) {
        header.insertBefore(testButton, triviaButton.nextSibling)
      } else {
        header.insertBefore(testButton, header.querySelector(".close-button"))
      }
    }
  }

  startTest() {
    if (this.isTestRunning) return

    this.isTestRunning = true
    this.currentQuestion = 0
    this.scores = {
      violin: 0,
      piano: 0,
      guitarra: 0,
      flauta: 0,
      trompeta: 0,
      bateria: 0,
      saxofon: 0,
      arpa: 0,
      clarinete: 0,
      cello: 0,
    }

    const chatBox = document.getElementById("chat-box")

    // Mensaje de introducción
    const introMessage = document.createElement("div")
    introMessage.className = "bot-message test-intro"
    introMessage.innerHTML = `
      <span class="emoji">🎵</span> 
      <strong>Test: ¿Qué instrumento musical eres?</strong><br><br>
      Responde estas ${this.questions.length} preguntas y descubre qué instrumento musical refleja mejor tu personalidad.
      ¡Vamos a comenzar!
    `
    chatBox.appendChild(introMessage)
    chatBox.scrollTop = chatBox.scrollHeight

    // Mostrar la primera pregunta después de un breve retraso
    setTimeout(() => {
      this.showQuestion(0)
    }, 1000)
  }

  showQuestion(index) {
    if (index >= this.questions.length) {
      this.showResult()
      return
    }

    const chatBox = document.getElementById("chat-box")
    const question = this.questions[index]

    // Crear el mensaje de la pregunta
    const questionMessage = document.createElement("div")
    questionMessage.className = "bot-message test-question"
    questionMessage.innerHTML = `
      <span class="emoji">❓</span> 
      <strong>Pregunta ${index + 1}/${this.questions.length}:</strong><br>
      ${question.question}
    `
    chatBox.appendChild(questionMessage)

    // Crear los botones de opciones
    const optionsContainer = document.createElement("div")
    optionsContainer.className = "test-options"

    question.options.forEach((option, optionIndex) => {
      const optionButton = document.createElement("button")
      optionButton.className = "test-option-button"
      optionButton.textContent = option.text
      optionButton.addEventListener("click", () => {
        this.selectOption(index, optionIndex)

        // Desactivar todos los botones después de seleccionar
        const buttons = optionsContainer.querySelectorAll("button")
        buttons.forEach((btn) => {
          btn.disabled = true
          btn.classList.add("disabled")
        })

        // Resaltar el botón seleccionado
        optionButton.classList.add("selected")
      })

      optionsContainer.appendChild(optionButton)
    })

    chatBox.appendChild(optionsContainer)
    chatBox.scrollTop = chatBox.scrollHeight
  }

  selectOption(questionIndex, optionIndex) {
    const option = this.questions[questionIndex].options[optionIndex]

    // Actualizar puntuaciones
    for (const [instrument, score] of Object.entries(option.scores)) {
      this.scores[instrument] += score
    }

    // Mostrar la respuesta seleccionada como mensaje del usuario
    const chatBox = document.getElementById("chat-box")
    const userMessage = document.createElement("div")
    userMessage.className = "user-message"
    userMessage.textContent = option.text
    chatBox.appendChild(userMessage)

    // Pasar a la siguiente pregunta después de un breve retraso
    setTimeout(() => {
      this.showQuestion(questionIndex + 1)
    }, 800)
  }

  showResult() {
    // Encontrar el instrumento con mayor puntuación
    let maxScore = 0
    let resultInstrument = ""

    for (const [instrument, score] of Object.entries(this.scores)) {
      if (score > maxScore) {
        maxScore = score
        resultInstrument = instrument
      }
    }

    const result = this.instrumentInfo[resultInstrument]
    const chatBox = document.getElementById("chat-box")

    // Mensaje de procesamiento
    const processingMessage = document.createElement("div")
    processingMessage.className = "bot-message processing-message"
    processingMessage.innerHTML = `
      <span class="emoji">⏳</span> 
      Analizando tus respuestas...
    `
    chatBox.appendChild(processingMessage)
    chatBox.scrollTop = chatBox.scrollHeight

    // Mostrar resultado después de un breve retraso
    setTimeout(() => {
      // Eliminar mensaje de procesamiento
      chatBox.removeChild(processingMessage)

      // Mensaje de resultado
      const resultMessage = document.createElement("div")
      resultMessage.className = "bot-message test-result"
      resultMessage.innerHTML = `
        <span class="emoji">${result.emoji}</span> 
        <strong>¡Tu instrumento es: ${result.nombre}!</strong><br><br>
        ${result.descripcion}<br><br>
        <strong>Personalidad:</strong> ${result.personalidad}<br>
        <strong>Fortalezas:</strong> ${result.fortalezas}<br>
        <strong>Géneros musicales:</strong> ${result.generos}
      `
      chatBox.appendChild(resultMessage)

      // Mensaje de seguimiento
      
    }, 2000)
  }
}

// Inicializar el test cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Esperar un poco para asegurar que el chatbot esté completamente cargado
  setTimeout(() => {
    window.instrumentoTest = new InstrumentoTest()
    console.log("🎵 Test '¿Qué instrumento eres?' cargado")
  }, 700)
})
