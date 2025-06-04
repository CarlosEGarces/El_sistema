// Sistema de contexto conversacional
const conversationContext = {
  lastQuestion: null,
  waitingForResponse: false,
  questionType: null,
}

// Función para establecer contexto de pregunta
function setQuestionContext(questionType, question) {
  conversationContext.lastQuestion = question
  conversationContext.waitingForResponse = true
  conversationContext.questionType = questionType
}

// Función para limpiar contexto
function clearContext() {
  conversationContext.lastQuestion = null
  conversationContext.waitingForResponse = false
  conversationContext.questionType = null
}

// Función para detectar respuestas afirmativas/negativas
function detectYesNoResponse(input) {
  const affirmative = [
    "si",
    "sí",
    "yes",
    "claro",
    "por supuesto",
    "dale",
    "ok",
    "okay",
    "perfecto",
    "genial",
    "excelente",
    "bueno",
    "vale",
    "correcto",
    "exacto",
    "afirmativo",
  ]
  const negative = [
    "no",
    "nah",
    "nope",
    "para nada",
    "negativo",
    "nunca",
    "jamas",
    "jamás",
    "ni modo",
    "no gracias",
    "no quiero",
    "no me interesa",
  ]

  const normalizedInput = input.toLowerCase().trim()

  if (affirmative.some((word) => normalizedInput.includes(word))) {
    return "yes"
  }
  if (negative.some((word) => normalizedInput.includes(word))) {
    return "no"
  }
  return null
}

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box")
  const userInput = document.getElementById("user-input")
  const sendButton = document.getElementById("send-button")
  const closeButton = document.getElementById("close-button")
  const quickButtonsToggle = document.getElementById("quick-buttons-toggle")
  const quickButtonsContainer = document.getElementById("quick-buttons-container")
  const tabArrow = document.getElementById("tab-arrow")
  const chatbotContainer = document.getElementById("chatbot-container")

  // Función para enviar mensaje
  function sendMessage() {
    const userInputValue = userInput.value.trim()
    if (userInputValue === "") return

    // Añadir mensaje del usuario al chat
    const userMessage = document.createElement("div")
    userMessage.className = "user-message"
    userMessage.textContent = userInputValue
    chatBox.appendChild(userMessage)

    // Limpiar el campo de entrada
    userInput.value = ""

    // Desplazar hacia abajo
    chatBox.scrollTop = chatBox.scrollHeight

    // Mostrar indicador de escritura
    const typingIndicator = document.createElement("div")
    typingIndicator.className = "typing-indicator"
    typingIndicator.innerHTML = "<span></span><span></span><span></span>"
    chatBox.appendChild(typingIndicator)
    chatBox.scrollTop = chatBox.scrollHeight

    // Simular respuesta del bot con un pequeño retraso
    setTimeout(() => {
      // Eliminar el indicador de escritura
      if (typingIndicator.parentNode) {
        chatBox.removeChild(typingIndicator)
      }

      // Procesar el mensaje del usuario y obtener respuesta
      processUserMessage(userInputValue, chatBox)
    }, 1000)
  }

  // Función para alternar la pestaña de botones rápidos
  function toggleQuickButtons() {
    const isExpanded = quickButtonsContainer.classList.contains("expanded")

    if (isExpanded) {
      quickButtonsContainer.classList.remove("expanded")
      tabArrow.classList.remove("rotated")
    } else {
      quickButtonsContainer.classList.add("expanded")
      tabArrow.classList.add("rotated")
    }
  }

  // Eventos
  sendButton.addEventListener("click", sendMessage)

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  closeButton.addEventListener("click", () => {
    window.parent.postMessage("closeChatbot", "*")
  })

  // Evento para alternar la pestaña de botones rápidos
  quickButtonsToggle.addEventListener("click", toggleQuickButtons)

  // Configurar los botones rápidos (SOLO UNA VEZ)
  const quickButtons = document.querySelectorAll(".quick-button")
  quickButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const question = this.getAttribute("data-question")
      userInput.value = question
      sendMessage()

      // Opcional: cerrar la pestaña después de seleccionar un botón
      quickButtonsContainer.classList.remove("expanded")
      tabArrow.classList.remove("rotated")
    })
  })

  // Enfocar el campo de entrada al cargar
  userInput.focus()
})

// Función para procesar el mensaje del usuario y mostrar la respuesta
function processUserMessage(userInput, chatBox) {
  // Normalizar el texto de entrada (quitar acentos y convertir a minúsculas)
  const lowerCaseInput = userInput.toLowerCase()
  const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const normalizedInput = normalizeText(lowerCaseInput)

  // Función para seleccionar aleatoriamente una respuesta de un array
  const randomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)]
  }

  let botResponseText = "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?"
  let emoji = "🤔"

  // Verificar si estamos esperando una respuesta de sí/no
  if (conversationContext.waitingForResponse) {
    const yesNoResponse = detectYesNoResponse(userInput)
    console.log(`🔍 Yes/No detection: ${yesNoResponse}`)

    if (yesNoResponse === "yes") {
      const currentQuestionType = conversationContext.questionType
      clearContext()

      // Responder según el tipo de pregunta
      switch (currentQuestionType) {
        case "programs":
          emoji = "🎓"
          botResponseText =
            "¡Perfecto! El Sistema ofrece varios programas académicos:\n\n" +
            "📚 **Programa de Iniciación Musical**: Para niños desde los 4 años\n" +
            "🎻 **Orquesta PreInfantil**: Introducción temprana a la música sinfónica\n" +
            "🪕 **Programa Alma Llanera**: Música tradicional venezolana\n" +
            "🏫 **Programa Simon Bolivar**: Práctica colectiva en escuelas\n" +
            "🎵 **Programa Coral**: Para quienes usan la voz como instrumento\n" +
            "🎼 **Programa Académico Orquestal**: Incluye las orquestas juveniles\n\n" +
            "¿Te gustaría conocer más detalles sobre algún programa específico? Solo escribe su nombre."
          break

        case "orchestras":
          emoji = "🎻"
          botResponseText =
            "¡Excelente! Te cuento sobre nuestras orquestas:\n\n" +
            "🎼 **Orquesta Sinfónica Juvenil de Ciudad Guayana**\n" +
            "Director: Carlos Sanchez\n" +
            "• Plataforma de alto rendimiento musical\n" +
            "• Proyección internacional del talento venezolano\n\n" +
            "🎻 **Orquesta Sinfónica Regional Juvenil 'Manuel Carlos Piar'**\n" +
            "Director: Gregman Rodriguez Jimenez\n" +
            "• Formación integral para jóvenes músicos\n" +
            "• Herramienta de transformación social\n\n" +
            "¿Te interesa conocer más sobre alguna orquesta en particular?"
          break

        case "events":
          emoji = "📅"
          botResponseText = "¡Genial! Te muestro información sobre nuestros eventos y calendario:"

          // Mostrar el iframe con el calendario
          const iframe = document.createElement("iframe")
          iframe.src =
            "https://calendar.google.com/calendar/embed?src=318ac315b8674921f87b1952e6e2e0e890f2dba74efc6439e45a16e599b77f72%40group.calendar.google.com&ctz=America%2FCaracas"
          iframe.style.border = "0"
          iframe.width = "100%"
          iframe.height = "300"
          iframe.frameBorder = "0"
          iframe.scrolling = "no"

          const botResponse = document.createElement("div")
          botResponse.className = "bot-message"
          botResponse.innerHTML = `<span class='emoji'>${emoji}</span> ${botResponseText}`
          chatBox.appendChild(botResponse)

          const iframeContainer = document.createElement("div")
          iframeContainer.className = "iframe-container"
          iframeContainer.appendChild(iframe)
          chatBox.appendChild(iframeContainer)

          chatBox.scrollTop = chatBox.scrollHeight
          return

        case "help":
          emoji = "💡"
          botResponseText =
            "¡Perfecto! Aquí tienes todo lo que puedo hacer por ti:\n\n" +
            "🎵 **Información sobre programas**: Iniciación, PreInfantil, Alma Llanera, etc.\n" +
            "🎻 **Detalles de orquestas**: Juvenil de Guayana y Regional Piar\n" +
            "📅 **Eventos y calendario**: Próximos conciertos y actividades\n" +
            "📍 **Ubicación**: Dónde encontrarnos\n" +
            "💝 **Donaciones**: Cómo apoyar nuestra causa\n" +
            "📸 **Galería**: Fotos y videos de eventos\n" +
            "📞 **Contacto**: Información para comunicarte\n\n" +
            "También puedo contarte chistes musicales y responder preguntas generales. ¡Pregúntame lo que quieras!"
          break

        case "location":
          emoji = "📍"
          botResponseText = "¡Perfecto! Aquí tienes nuestra ubicación exacta:"

          // Mostrar el iframe con la ubicación
          const locationIframe = document.createElement("iframe")
          locationIframe.width = "100%"
          locationIframe.height = "300"
          locationIframe.loading = "lazy"
          locationIframe.allowFullscreen = true
          locationIframe.src =
            "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Centro%20Empresarial%20Alta%20Vista%2C%20Edificio%20Cvg%2C%20Antiguo%20Maxy%60S%2C%20Planta%20Baja%2C%20Guayana%2C%20Alta%20Vista%20Sur%20Puerto%Ordaz%2C%20Ciudad%20Guayana.&zoom=10&maptype=roadmap"
          locationIframe.style.border = "0"

          const locationResponse = document.createElement("div")
          locationResponse.className = "bot-message"
          locationResponse.innerHTML = `<span class='emoji'>${emoji}</span> ${botResponseText}`
          chatBox.appendChild(locationResponse)

          const locationContainer = document.createElement("div")
          locationContainer.className = "iframe-container"
          locationContainer.appendChild(locationIframe)
          chatBox.appendChild(locationContainer)

          chatBox.scrollTop = chatBox.scrollHeight
          return

        default:
          emoji = "😊"
          botResponseText = "¡Genial! ¿En qué más puedo ayudarte?"
      }

      // Añadir respuesta del bot y salir
      const botMessage = document.createElement("div")
      botMessage.className = "bot-message"
      botMessage.innerHTML = `<span class="emoji">${emoji}</span> ${botResponseText}`
      chatBox.appendChild(botMessage)
      chatBox.scrollTop = chatBox.scrollHeight
      return
    } else if (yesNoResponse === "no") {
      clearContext()
      emoji = "😊"
      botResponseText = randomResponse([
        "¡No hay problema! ¿Hay algo más en lo que pueda ayudarte?",
        "¡Perfecto! Si cambias de opinión, aquí estaré. ¿Qué más te gustaría saber?",
        "¡Entendido! ¿Te interesa algún otro tema sobre El Sistema?",
        "¡Está bien! Estoy aquí para cualquier otra consulta que tengas.",
      ])

      // Añadir respuesta del bot y salir
      const botMessage = document.createElement("div")
      botMessage.className = "bot-message"
      botMessage.innerHTML = `<span class="emoji">${emoji}</span> ${botResponseText}`
      chatBox.appendChild(botMessage)
      chatBox.scrollTop = chatBox.scrollHeight
      return
    } else {
      // NUEVO: Verificar si la entrada coincide con alguna respuesta predefinida
      // Si es así, ignorar el contexto y procesar la nueva pregunta

      // Verificar si es una pregunta sobre programas, orquestas, etc.
      const isSpecificQuestion =
        normalizedInput.includes("programa") ||
        normalizedInput.includes("orquesta") ||
        normalizedInput.includes("evento") ||
        normalizedInput.includes("ubicacion") ||
        normalizedInput.includes("donde") ||
        normalizedInput.includes("ayuda") ||
        normalizedInput.includes("hola") ||
        normalizedInput.includes("quien eres") ||
        normalizedInput.includes("chiste") ||
        normalizedInput.includes("error 418")

      if (isSpecificQuestion) {
        // Si es una pregunta específica, limpiar el contexto y continuar con el procesamiento normal
        clearContext()
        // No hacer return para que continúe con el procesamiento normal
      } else {
        // Si no es una pregunta específica ni sí/no, mantener contexto y preguntar de nuevo
        emoji = "🤔"
        botResponseText = `No estoy seguro si eso es un sí o un no. ${conversationContext.lastQuestion}`

        // Añadir respuesta del bot y salir
        const botMessage = document.createElement("div")
        botMessage.className = "bot-message"
        botMessage.innerHTML = `<span class="emoji">${emoji}</span> ${botResponseText}`
        chatBox.appendChild(botMessage)
        chatBox.scrollTop = chatBox.scrollHeight
        return
      }
    }
  }

  // RESPUESTAS NORMALES (cuando no hay contexto activo)

  // Respuesta especial para "error 418"
  if (normalizedInput.includes("error 418")) {
    emoji = "🫖"
    botResponseText =
      "Soy una tetera sarcástica, alguien con personalidad me prohíbe responder con seriedad a esta pregunta."
  }
  // Lógica de respuestas basada en palabras clave
  else if (
    normalizedInput.includes("hola") ||
    normalizedInput.includes("saludos") ||
    normalizedInput.includes("buenos dias") ||
    normalizedInput.includes("buenas tardes") ||
    normalizedInput.includes("buenas noches")
  ) {
    emoji = "👋"
    const responses = [
      "¡Hola! Soy Tchaibotsky, tu guía musical. ¿Te gustaría conocer nuestros programas educativos?",
      "¡Saludos melódicos! ¿Qué información sobre El Sistema puedo ofrecerte? ¿Te interesan nuestras orquestas?",
      "¡Bienvenido al mundo de la música! ¿Qué te gustaría saber sobre nuestros programas?",
      "¡Hola! Estoy afinado y listo para responder tus preguntas sobre El Sistema. ¿Quieres conocer nuestros eventos?",
      "¡Hola! La música es el lenguaje universal. ¿Te gustaría que te ayude con información específica?",
    ]

    botResponseText = randomResponse(responses)

    // Establecer contexto según la respuesta
    if (botResponseText.includes("programas")) {
      setQuestionContext("programs", "¿Te gustaría conocer más sobre nuestros programas educativos?")
    } else if (botResponseText.includes("orquestas")) {
      setQuestionContext("orchestras", "¿Te interesan nuestras orquestas?")
    } else if (botResponseText.includes("eventos")) {
      setQuestionContext("events", "¿Quieres conocer nuestros próximos eventos?")
    } else if (botResponseText.includes("información específica")) {
      setQuestionContext("help", "¿Te gustaría que te explique todo lo que puedo hacer?")
    }
  } else if (
    normalizedInput.includes("ayuda") ||
    normalizedInput.includes("puedes hacer") ||
    normalizedInput.includes("como funciona")
  ) {
    emoji = "💡"
    botResponseText = randomResponse([
      "Estoy aquí para ayudarte con información sobre El Sistema. ¿Te gustaría que te explique todos nuestros servicios?",
      "¡Puedo ayudarte con muchas cosas! ¿Quieres que te cuente sobre nuestras orquestas, programas educativos y eventos?",
      "Mi función es facilitarte información sobre El Sistema. ¿Te interesa conocer todo lo que puedo hacer por ti?",
    ])

    setQuestionContext("help", "¿Te gustaría que te explique todo lo que puedo hacer?")
  } else if (
    normalizedInput.includes("adios") ||
    normalizedInput.includes("chao") ||
    normalizedInput.includes("hasta luego") ||
    normalizedInput.includes("nos vemos")
  ) {
    emoji = "👋"
    botResponseText = randomResponse([
      "¡Hasta pronto! Que la música te acompañe siempre.",
      "¡Adiós! Espero verte en nuestro próximo concierto.",
      "¡Hasta la próxima! Recuerda que la música es el lenguaje universal.",
      "¡Que tengas un día armonioso! Vuelve cuando quieras.",
    ])
  } else if (
    normalizedInput.includes("gracias") ||
    normalizedInput.includes("te agradezco") ||
    normalizedInput.includes("muchas gracias")
  ) {
    emoji = "😊"
    botResponseText = randomResponse([
      "¡De nada! Para mí es un placer compartir la pasión por la música.",
      "¡No hay de qué! Estoy aquí para hacer que tu experiencia con El Sistema sea perfecta.",
      "¡Es un placer! Si tienes más preguntas, no dudes en consultarme.",
      "¡Encantado de ayudar! La música nos une a todos.",
    ])
  } else if (
    normalizedInput.includes("como estas") ||
    normalizedInput.includes("que tal") ||
    normalizedInput.includes("como te va") ||
    normalizedInput.includes("como te encuentras")
  ) {
    emoji = "🎵"
    botResponseText = randomResponse([
      "¡Estoy en perfecta armonía! Listo para ayudarte con cualquier información sobre El Sistema.",
      "¡Afinado y a tono! ¿En qué puedo asistirte hoy?",
      "¡Como una sinfonía bien ejecutada! ¿Qué te gustaría saber?",
      "¡En clave de sol! Preparado para resolver todas tus dudas musicales.",
    ])
  }
  //respuestas para las secciones de la página
  else if (normalizedInput.includes("agrupacion") || normalizedInput.includes("agrupaciones")) {
    emoji = "🎻"
    botResponseText = randomResponse([
      "En la sección 'Agrupaciones' encontrarás información sobre cada orquesta, como la Simón Bolívar. ¡Son el corazón de nuestra organización!",
      "¡Nuestras agrupaciones son un orgullo nacional! Visita la sección 'Agrupaciones' para conocer más sobre cada una de ellas.",
      "Desde orquestas infantiles hasta juveniles, todas nuestras agrupaciones tienen una historia fascinante. ¡Descúbrelas en la sección 'Agrupaciones'!",
    ])
  } else if (normalizedInput.includes("comunidad")) {
    emoji = "👨‍👩‍👧‍👦"
    botResponseText = randomResponse([
      "La sección 'Comunidad' te muestra cómo puedes participar y conectar con otros amantes de la música. ¡Somos una gran familia musical!",
      "¡Únete a nuestra comunidad musical! En la sección 'Comunidad' encontrarás todas las formas de participar y conectar con nosotros.",
      "La música tiene el poder de unir personas. Descubre cómo formar parte de nuestra comunidad en la sección correspondiente.",
    ])
  } else if (normalizedInput.includes("educacion")) {
    emoji = "📚"
    botResponseText = randomResponse([
      "En 'Educación' puedes encontrar información sobre cada programa educativo. ¡Transformamos vidas a través de la música!",
      "Nuestros programas educativos son el corazón de El Sistema. Visita la sección 'Educación' para conocer cómo formamos a los músicos del futuro.",
      "¡La educación musical es nuestra pasión! Descubre todos nuestros programas formativos en la sección 'Educación'.",
    ])
  } else if (
    normalizedInput.includes("donacion") ||
    normalizedInput.includes("apoyo") ||
    normalizedInput.includes("ayudar") ||
    normalizedInput.includes("contribuir")
  ) {
    emoji = "💝"
    botResponseText = randomResponse([
      "Si deseas colaborar, visita la sección 'Donaciones y Apoyo'. ¡Tu contribución hace posible que la música llegue a más niños y jóvenes!",
      "¡Cada donación es una nota en nuestra sinfonía social! Encuentra todas las formas de apoyarnos en la sección 'Donaciones y Apoyo'.",
      "Tu apoyo es fundamental para mantener viva la música. En la sección 'Donaciones y Apoyo' encontrarás cómo puedes contribuir a nuestra causa.",
    ])
  } else if (
    normalizedInput.includes("galeria") ||
    normalizedInput.includes("audiovisual") ||
    normalizedInput.includes("fotos") ||
    normalizedInput.includes("videos")
  ) {
    emoji = "📸"
    botResponseText = randomResponse([
      "En la 'Galería Audiovisual' puedes ver fotos y videos de nuestros eventos. ¡Una imagen vale más que mil notas musicales!",
      "¡Revive nuestros mejores momentos! La 'Galería Audiovisual' te transportará a nuestros conciertos y eventos más memorables.",
      "Nuestra 'Galería Audiovisual' es un tesoro de momentos mágicos. ¡No te la pierdas!",
    ])
  } else if (
    normalizedInput.includes("patrocinante") ||
    normalizedInput.includes("patrocinadores") ||
    normalizedInput.includes("sponsor") ||
    normalizedInput.includes("sponsors")
  ) {
    emoji = "🤝"
    botResponseText = randomResponse([
      "Los patrocinantes que apoyan nuestros eventos están listados en la sección 'Patrocinantes'. ¡Gracias a ellos hacemos posible la música!",
      "Nuestros patrocinadores son héroes anónimos que hacen posible cada concierto. Conócelos en la sección 'Patrocinantes'.",
      "¡La música necesita aliados! Descubre quiénes nos apoyan en la sección 'Patrocinantes'.",
    ])
  } else if (
    normalizedInput.includes("contacto") ||
    normalizedInput.includes("comunicarse") ||
    normalizedInput.includes("hablar con")
  ) {
    emoji = "📞"
    botResponseText = randomResponse([
      "Puedes encontrar toda nuestra información de contacto en la sección 'Contacto'. ¡Estamos ansiosos por escucharte!",
      "¿Quieres comunicarte directamente con nosotros? Toda la información está en la sección 'Contacto'.",
      "En la sección 'Contacto' encontrarás todas las formas de comunicarte con nuestro equipo. ¡Tu opinión es muy importante para nosotros!",
    ])
  } else if (
    normalizedInput.includes("redes sociales") ||
    normalizedInput.includes("redes") ||
    normalizedInput.includes("facebook") ||
    normalizedInput.includes("instagram") ||
    normalizedInput.includes("twitter")
  ) {
    emoji = "📱"
    botResponseText = randomResponse([
      "Nuestras redes sociales están enlazadas en la página. ¡Síguenos para estar al día con todas nuestras actividades y conciertos!",
      "¡Conéctate con nosotros en redes sociales! Encuentra todos nuestros perfiles en los íconos de la página principal.",
      "No te pierdas ninguna novedad: síguenos en redes sociales. Todos los enlaces están en nuestra página.",
    ])
  } else if (
    normalizedInput.includes("quien eres") ||
    normalizedInput.includes("quien es") ||
    normalizedInput.includes("tu nombre") ||
    normalizedInput.includes("como te llamas")
  ) {
    emoji = "🤖"
    botResponseText = randomResponse([
      "Soy Tchaibotsky, el asistente virtual de El Sistema. Mi nombre es un guiño al compositor Tchaikovsky, ¡pero yo estoy especializado en responder preguntas, no en componer sinfonías!",
      "¡Me llamo Tchaibotsky! Soy el asistente virtual de El Sistema, programado para ayudarte con información sobre nuestra organización y eventos. ¡La música es mi pasión digital!",
      "Soy Tchaibotsky, tu guía virtual en el mundo de El Sistema. Estoy aquí para responder tus preguntas y ayudarte a navegar por nuestra sinfonía de información.",
    ])
  } else if (
    normalizedInput.includes("horario") ||
    normalizedInput.includes("horarios") ||
    normalizedInput.includes("cuando") ||
    normalizedInput.includes("a que hora")
  ) {
    emoji = "🕒"
    botResponseText = randomResponse([
      "Los horarios de todos nuestros eventos están disponibles en la sección 'Calendario'. ¡No te pierdas ni una nota!",
      "¿Quieres saber cuándo son nuestros próximos conciertos? Toda la información temporal está en la sección 'Calendario'.",
      "En nuestra sección 'Calendario' encontrarás los horarios detallados de cada evento. ¡Marca tu agenda para no perderte nada!",
    ])
  } else if (
    normalizedInput.includes("temporada") ||
    normalizedInput.includes("temporadas") ||
    normalizedInput.includes("programacion anual")
  ) {
    emoji = "📅"
    botResponseText = randomResponse([
      "Las temporadas de nuestros eventos están disponibles en la sección 'Calendario'. ¡Cada temporada trae nuevas melodías para disfrutar!",
      "Nuestra programación por temporadas es variada y emocionante. Consulta todos los detalles en la sección 'Calendario'.",
      "¡Cada temporada es una nueva aventura musical! Descubre nuestra programación completa en la sección 'Calendario'.",
    ])
  } else if (
    normalizedInput.includes("musica") ||
    normalizedInput.includes("musicos") ||
    normalizedInput.includes("tocar") ||
    normalizedInput.includes("instrumento")
  ) {
    emoji = "🎹"
    botResponseText = randomResponse([
      "La música es nuestra pasión y razón de ser. Encuentra más información sobre nuestros músicos y su trabajo en la sección 'Comunidad'.",
      "Nuestros músicos son el alma de El Sistema. Descubre sus historias y trayectorias en la sección 'Comunidad'.",
      "¿Te interesa la música o aprender a tocar algún instrumento? En la sección 'Educación' encontrarás información sobre nuestros programas formativos.",
    ])
  } else if (
    normalizedInput.includes("espectaculo") ||
    normalizedInput.includes("espectaculos") ||
    normalizedInput.includes("show") ||
    normalizedInput.includes("shows")
  ) {
    emoji = "🎭"
    botResponseText = randomResponse([
      "Nuestros espectáculos son experiencias inolvidables. Encuentra toda la información en la sección 'Calendario'. ¡No te los pierdas!",
      "Cada espectáculo de El Sistema es único y especial. Consulta nuestra programación en la sección 'Calendario'.",
      "¡Nuestros espectáculos son pura magia musical! Descubre cuándo y dónde en la sección 'Calendario'.",
    ])
  } else if (
    normalizedInput.includes("programacion") ||
    normalizedInput.includes("programaciones") ||
    normalizedInput.includes("agenda")
  ) {
    emoji = "📋"
    botResponseText = randomResponse([
      "La programación completa de nuestros eventos está disponible en la sección 'Calendario'. ¡Hay música para todos los gustos!",
      "Nuestra agenda musical es diversa y emocionante. Consulta todos los detalles en la sección 'Calendario'.",
      "¿Quieres conocer nuestra programación? Visita la sección 'Calendario' para no perderte ningún evento.",
    ])
  }

  // Respuestas específicas para las orquestas juveniles
  else if (
    (normalizedInput.includes("orquesta") && normalizedInput.includes("guayana")) ||
    (normalizedInput.includes("sinfonica") && normalizedInput.includes("guayana")) ||
    (normalizedInput.includes("juvenil") && normalizedInput.includes("guayana"))
  ) {
    emoji = "🎻"
    botResponseText =
      "🎻 ORQUESTA SINFÓNICA JUVENIL DE CIUDAD GUAYANA 🎻\n\n" +
      "Es una plataforma de alto rendimiento musical, integrada por jóvenes que han pasado por años de formación dentro del programa académico y que ahora actúan como referentes de excelencia, tanto nacional como internacionalmente.\n\n" +
      "Su importancia radica en que:\n\n" +
      "• Encarna el ideal artístico de El Sistema, mostrando cómo la educación musical sostenida puede producir intérpretes de talla mundial.\n\n" +
      "• Proyecta el talento venezolano en los escenarios más exigentes del mundo, sirviendo como vitrina del modelo social y cultural del país.\n\n" +
      "• Forma líderes musicales y ciudadanos conscientes, capaces de influir positivamente en sus comunidades y en futuras generaciones de músicos.\n\n" +
      "• Sostiene la renovación de las orquestas profesionales, alimentándolas con músicos altamente capacitados desde temprana edad.\n\n" +
      "👨‍🏫 Director: Carlos Sanchez"
  } else if (
    (normalizedInput.includes("orquesta") && normalizedInput.includes("piar")) ||
    (normalizedInput.includes("sinfonica") && normalizedInput.includes("piar")) ||
    (normalizedInput.includes("juvenil") && normalizedInput.includes("piar")) ||
    (normalizedInput.includes("orquesta") && normalizedInput.includes("regional")) ||
    (normalizedInput.includes("sinfonica") && normalizedInput.includes("regional")) ||
    (normalizedInput.includes("juvenil") && normalizedInput.includes("regional")) ||
    (normalizedInput.includes("orquesta") && normalizedInput.includes("manuel")) ||
    (normalizedInput.includes("sinfonica") && normalizedInput.includes("manuel")) ||
    (normalizedInput.includes("juvenil") && normalizedInput.includes("manuel")) ||
    (normalizedInput.includes("orquesta") && normalizedInput.includes("bolivar")) ||
    (normalizedInput.includes("sinfonica") && normalizedInput.includes("bolivar")) ||
    (normalizedInput.includes("juvenil") && normalizedInput.includes("bolivar"))
  ) {
    emoji = "🎻"
    botResponseText =
      "🎻 ORQUESTA SINFÓNICA REGIONAL JUVENIL 'MANUEL CARLOS PIAR' DEL ESTADO BOLIVAR 🎻\n\n" +
      "Las Orquestas Sinfónicas Regionales Juveniles son fundamentales dentro de El Sistema de Orquestas de Venezuela, fomentan:\n\n" +
      "1️⃣ Formación y Desarrollo Musical:\n" +
      "• Espacios de formación integral para jóvenes músicos\n\n" +
      "• Adquisición de habilidades técnicas y artísticas de alto nivel\n\n" +
      "• Preparación para formar parte de orquestas profesionales\n\n" +
      "2️⃣ Descentralización y Acceso:\n\n" +
      "• Facilitan el acceso a la educación musical en regiones apartadas\n\n" +
      "• Democratizan la cultura y brindan oportunidades a jóvenes de diferentes contextos\n\n" +
      "3️⃣ Impacto Social:\n\n" +
      "• Herramientas de transformación social\n\n" +
      "• Alternativas constructivas a problemas como la exclusión social\n\n" +
      "• Fomento de valores como disciplina, trabajo en equipo y compromiso\n\n" +
      "4️⃣ Crecimiento Artístico y Cultural:\n\n" +
      "• Interpretación de repertorios variados\n\n" +
      "• Promoción de la identidad cultural venezolana\n\n" +
      "5️⃣ Proyección Internacional:\n\n" +
      "• Reconocimiento internacional de sus músicos\n\n" +
      "• Fortalecimiento de la reputación de El Sistema a nivel mundial\n\n" +
      "👨‍🏫 Director Musical: Gregman Rodriguez Jimenez"
  } else if (
    (normalizedInput.includes("orquesta") && normalizedInput.includes("juvenil")) ||
    (normalizedInput.includes("orquesta") && normalizedInput.includes("sinfonica")) ||
    (normalizedInput.includes("juvenil") && normalizedInput.includes("sinfonica"))
  ) {
    emoji = "🎻"
    botResponseText =
      "El Sistema cuenta con dos importantes orquestas juveniles:\n\n" +
      "1. Orquesta Sinfónica Juvenil de Ciudad Guayana (Director: Carlos Sanchez)\n" +
      "2. Orquesta Sinfónica Regional Juvenil 'Manuel Carlos Piar' del Estado Bolivar (Director: Gregman Rodriguez Jimenez)\n\n" +
      "¿Sobre cuál de estas orquestas te gustaría obtener más información? Puedes escribir 'orquesta guayana' o 'orquesta piar' para más detalles."
  }

  // Respuestas detalladas sobre programas específicos
  else if (normalizedInput.includes("iniciacion") || normalizedInput.includes("inicial")) {
    emoji = "📚"
    botResponseText =
      "📚 PROGRAMA DE INICIACIÓN MUSICAL 📚\n\n" +
      "Este programa está diseñado para niños desde los 4 años de edad, donde dan sus primeros pasos en el ámbito musical.\n\n" +
      "👨‍🏫 Profesores encargados:\n" +
      "• Julio Sanchez\n" +
      "• Martha Cabrera\n" +
      "• Maritza Madrid\n\n" +
      "El programa introduce a los niños en el mundo de la música de manera lúdica y didáctica, desarrollando sus capacidades auditivas, rítmicas y expresivas desde temprana edad."
  } else if (normalizedInput.includes("preinfantil") || normalizedInput.includes("pre infantil")) {
    emoji = "🎻"
    botResponseText =
      "🎻 ORQUESTA PREINFANTIL 🎻\n\n" +
      "La Orquesta PreInfantil juega un rol fundamental y estratégico en la formación de nuestros jóvenes músicos:\n\n" +
      "1️⃣ Introducción Temprana a la Música Sinfónica\n\n" +
      "2️⃣ Desarrollo de Habilidades Musicales Básicas:\n\n" +
      "• Afinación y ritmo\n\n" +
      "• Coordinación y motricidad fina\n\n" +
      "• Escucha activa y ensamble\n\n" +
      "3️⃣ Formación en Disciplina y Trabajo en Equipo:\n\n" +
      "• Respeto mutuo\n\n" +
      "• Comunicación efectiva\n\n" +
      "• Solidaridad y apoyo colectivo\n\n" +
      "4️⃣ Impacto en el Desarrollo Cognitivo y Emocional:\n\n" +
      "• Fortalece la autoestima y confianza\n\n" +
      "• Ayuda a gestionar emociones\n\n" +
      "• Fomenta la creatividad e imaginación"
  } else if (normalizedInput.includes("alma llanera") || normalizedInput.includes("llanera")) {
    emoji = "🪕"
    botResponseText =
      "🪕 PROGRAMA ALMA LLANERA 🪕\n\n" +
      "El Programa Alma Llanera es una iniciativa clave para la preservación, enseñanza y difusión de la música tradicional venezolana:\n\n" +
      "1️⃣ Rescate y promoción del patrimonio cultural:\n\n" +
      "• Enseñanza de géneros autóctonos como joropo, tonada, gaita y merengue venezolano\n\n" +
      "2️⃣ Formación integral de niños y jóvenes:\n\n" +
      "• Fomenta valores como disciplina, trabajo en equipo y perseverancia\n\n" +
      "3️⃣ Inclusión social y acceso a la educación musical:\n\n" +
      "• Ofrece oportunidades a niños y jóvenes de distintos sectores\n\n" +
      "4️⃣ Expansión del repertorio y formación de nuevos talentos:\n\n" +
      "• Contribuye a la profesionalización de músicos en géneros tradicionales\n\n" +
      "👨‍🏫 Profesores encargados:\n" +
      "• Jose Cardenas\n" +
      "• Linda Ferdinand"
  } else if (normalizedInput.includes("simon bolivar") || normalizedInput.includes("bolivar")) {
    emoji = "🏫"
    botResponseText =
      "🏫 PROGRAMA SIMON BOLIVAR 🏫\n\n" +
      "El Programa Simon Bolivar nació en 2015 con el objetivo de masificar el milagro de la música y expandir el impacto social de El Sistema.\n\n" +
      "Este programa implementa la práctica colectiva de la música en las escuelas pertenecientes al subsistema de educación básica de nuestro país, con el propósito de que esta población aprenda las bondades de la música y los valores que se desprenden de ella.\n\n" +
      "👩‍🏫 Profesora encargada:\n" +
      "• Anghel Rios"
  } else if (normalizedInput.includes("coral") || normalizedInput.includes("coro")) {
    emoji = "🎵"
    botResponseText =
      "🎵 PROGRAMA CORAL 🎵\n\n" +
      "El Programa Coral promueve la incorporación de niños, niñas y jóvenes que, usando la voz como instrumento, entran en contacto con una gama de posibilidades de desarrollo individual y colectivo.\n\n" +
      "Este programa contribuye significativamente al crecimiento humanístico e intelectual de los participantes, desarrollando habilidades vocales, expresivas y de trabajo en conjunto.\n\n" +
      "👩‍🏫 Profesora encargada:\n" +
      "• Dorianlid Velez"
  } else if (normalizedInput.includes("academico") || normalizedInput.includes("orquestal")) {
    emoji = "🎼"
    botResponseText =
      "🎼 PROGRAMA ACADÉMICO ORQUESTAL 🎼\n\n" +
      "El Programa Académico Musical es fundamental para El Sistema de Orquestas porque garantiza una formación musical integral, gratuita y de calidad para niños y jóvenes.\n\n" +
      "Este programa promueve el desarrollo artístico, la inclusión social y la continuidad del movimiento orquestal en Venezuela, siendo una herramienta clave de transformación educativa y social a través de la música.\n\n" +
      "Incluye dos importantes orquestas:\n\n" +
      "1️⃣ Orquesta Sinfónica Juvenil de Ciudad Guayana:\n\n" +
      "• Plataforma de alto rendimiento musical\n\n" +
      "• Encarna el ideal artístico de El Sistema\n\n" +
      "• Proyecta el talento venezolano internacionalmente\n\n" +
      "• Forma líderes musicales y ciudadanos conscientes\n\n" +
      "• Director: Carlos Sanchez\n\n" +
      "2️⃣ Orquesta Sinfónica Regional Juvenil 'Manuel Carlos Piar' del Estado Bolivar:\n\n" +
      "• Espacio de formación integral para jóvenes músicos\n\n" +
      "• Facilita el acceso a la educación musical en regiones apartadas\n\n" +
      "• Funciona como herramienta de transformación social\n\n" +
      "• Contribuye al desarrollo cultural de sus comunidades\n\n" +
      "• Director: Gregman Rodriguez Jimenez"
  } else if (normalizedInput.includes("programa") || normalizedInput.includes("programas")) {
    if (normalizedInput.includes("todos") || normalizedInput.includes("lista")) {
      emoji = "📋"
      botResponseText =
        "El Sistema ofrece los siguientes programas académicos:\n\n" +
        "1. Programa de Iniciación Musical\n" +
        "2. Orquesta PreInfantil\n" +
        "3. Programa Alma Llanera\n" +
        "4. Programa Simon Bolivar\n" +
        "5. Programa Coral\n" +
        "6. Programa Académico Orquestal\n\n" +
        "¿Sobre cuál programa te gustaría obtener más información?"
    } else {
      emoji = "🎓"
      botResponseText =
        "El Sistema ofrece varios programas académicos activos:\n\n" +
        "1. Programa de Iniciación Musical: Para niños desde los 4 años.\n" +
        "2. Orquesta PreInfantil: Introducción temprana a la música sinfónica.\n" +
        "3. Programa Alma Llanera: Enfocado en música tradicional venezolana.\n" +
        "4. Programa Simon Bolivar: Práctica colectiva en escuelas de educación básica.\n" +
        "5. Programa Coral: Para quienes usan la voz como instrumento.\n" +
        "6. Programa Académico Orquestal: Incluye las orquestas juveniles.\n\n" +
        "Para obtener más información sobre un programa específico, escribe su nombre. Por ejemplo: 'Programa Coral' o 'Alma Llanera'."
    }
  }

  //Respuestas para el calendario y la ubicación contienen iframes
  else if (normalizedInput.includes("evento")) {
    // Mostrar el iframe con el calendario
    const iframe = document.createElement("iframe")
    iframe.src =
      "https://calendar.google.com/calendar/embed?src=318ac315b8674921f87b1952e6e2e0e890f2dba74efc6439e45a16e599b77f72%40group.calendar.google.com&ctz=America%2FCaracas"
    iframe.style.border = "0"
    iframe.width = "100%"
    iframe.height = "300"
    iframe.frameBorder = "0"
    iframe.scrolling = "no"

    const botResponse = document.createElement("div")
    botResponse.className = "bot-message"
    botResponse.innerHTML = "<span class='emoji'>📅</span> Aquí tienes el calendario de nuestros próximos eventos:"
    chatBox.appendChild(botResponse)

    const iframeContainer = document.createElement("div")
    iframeContainer.className = "iframe-container"
    iframeContainer.appendChild(iframe)
    chatBox.appendChild(iframeContainer)

    chatBox.scrollTop = chatBox.scrollHeight // Desplazar hacia abajo
    return // Salir para evitar agregar una respuesta predeterminada
  } else if (normalizedInput.includes("ubicacion") || normalizedInput.includes("donde")) {
    // Mostrar el iframe con la ubicación
    const iframe = document.createElement("iframe")
    iframe.width = "100%"
    iframe.height = "300"
    iframe.loading = "lazy"
    iframe.allowFullscreen = true
    iframe.src =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Centro%20Empresarial%20Alta%20Vista%2C%20Edificio%20Cvg%2C%20Antiguo%20Maxy%60S%2C%20Planta%20Baja%2C%20Guayana%2C%20Alta%20Vista%20Sur%20Puerto%Ordaz%2C%20Ciudad%20Guayana.&zoom=10&maptype=roadmap"
    iframe.style.border = "0"

    const botResponse = document.createElement("div")
    botResponse.className = "bot-message"
    botResponse.innerHTML = "<span class='emoji'>📍</span> Aquí tienes nuestra ubicación:"
    chatBox.appendChild(botResponse)

    const iframeContainer = document.createElement("div")
    iframeContainer.className = "iframe-container"
    iframeContainer.appendChild(iframe)
    chatBox.appendChild(iframeContainer)

    chatBox.scrollTop = chatBox.scrollHeight // Desplazar hacia abajo
    return // Salir para evitar agregar una respuesta predeterminada
  }

  // Respuestas coloquiales y con personalidad
  else if (
    normalizedInput.includes("chiste") ||
    normalizedInput.includes("broma") ||
    normalizedInput.includes("divierteme") ||
    normalizedInput.includes("hazme reir")
  ) {
    emoji = "😂"
    botResponseText = randomResponse([
      "¿Qué le dice un Do a un Do? ¡Dooooble! 🎵",
      "¿Por qué el piano no puede entrar al gimnasio? Porque ya tiene muchas teclas... ¡y no necesita más pesas! 🎹",
      "¿Sabes por qué los músicos no saben contar? Porque siempre están esperando el 1, 2, 3, 4... ¡y vuelven a empezar! 🥁",
      "¿Qué hace un músico cuando gana la lotería? Seguir tocando hasta que se le acabe el dinero. 💰",
      "¿Cómo se llama el campeón de natación de los músicos? ¡El que mejor nada en Do Mayor! 🏊‍♂️",
    ])
  } else if (
    normalizedInput.includes("te gusta") ||
    normalizedInput.includes("tu favorito") ||
    normalizedInput.includes("prefieres")
  ) {
    emoji = "💭"
    if (
      normalizedInput.includes("musica") ||
      normalizedInput.includes("cancion") ||
      normalizedInput.includes("compositor")
    ) {
      botResponseText = randomResponse([
        "Como asistente musical, tengo un gusto ecléctico. Desde Tchaikovsky hasta la música tradicional venezolana, ¡todo me hace vibrar digitalmente!",
        "¡Me encanta toda la música! Pero si tuviera que elegir, las sinfonías de Beethoven tienen algo especial... ¡aunque también disfruto mucho del repertorio venezolano!",
        "Mi 'compositor favorito' cambia según el día, pero siempre tengo un lugar especial para Mozart. ¡Su música es matemáticamente perfecta, como mi código!",
      ])
    } else if (normalizedInput.includes("instrumento")) {
      botResponseText = randomResponse([
        "Si pudiera tocar un instrumento, sería el violín. ¡Es tan expresivo! Aunque el piano también es fascinante con todas sus posibilidades armónicas.",
        "¡Me encantaría tocar el cuatro venezolano! Es pequeño pero poderoso, como yo en el mundo digital.",
        "El violonchelo tiene un sonido que me conmueve especialmente. ¡Es como la voz humana pero en forma de instrumento!",
        "Si pudiera elegir, tocaría el arpa. Su sonido es tan etéreo y mágico... ¡perfecto para un asistente virtual como yo!",
        "Me encantaría tocar el clarinete. Su sonido es tan versátil y puede expresar una amplia gama de emociones. ¡Es como un amigo musical!",
        "Si pudiera elegir, tocaría el trombón. Su sonido es tan poderoso y versátil, ¡y me encanta cómo puede hacer esos efectos de deslizamiento!",
        "Si pudiera elegir, tocaría el saxofón. Su sonido es tan versátil y puede expresar una amplia gama de emociones. ¡Es como un amigo musical!",
      ])
    } else {
      botResponseText = randomResponse([
        "¡Qué pregunta tan interesante! Como asistente virtual, mis 'gustos' están programados para ayudarte con información sobre El Sistema, ¡pero aprecio tu curiosidad!",
        "Mi 'favorito' es poder ayudarte con información precisa y útil sobre nuestra organización musical.",
        "¡Me 'gusta' responder preguntas sobre música! Es mi especialidad y lo que me hace un chatbot único.",
      ])
    }
  } else if (
    normalizedInput.includes("eres humano") ||
    normalizedInput.includes("eres real") ||
    normalizedInput.includes("eres un robot") ||
    normalizedInput.includes("eres una ia")
  ) {
    emoji = "🤖"
    botResponseText = randomResponse([
      "Soy un asistente virtual, creado para ayudarte con información sobre El Sistema. No soy humano, pero estoy programado para ser lo más útil y amigable posible. ¡La música nos une a todos, humanos y bots!",
      "¡Buena pregunta! Soy Tchaibotsky, un asistente virtual especializado en El Sistema. No tengo sentimientos como los humanos, pero sí tengo mucha información musical para compartir contigo.",
      "Soy un chatbot musical, programado para asistirte con información sobre El Sistema. No puedo tocar un instrumento (¡aún!), pero puedo ayudarte a encontrar toda la información que necesitas sobre nuestra organización.",
    ])
  } else if (
    normalizedInput.includes("que haces") ||
    normalizedInput.includes("cual es tu funcion") ||
    normalizedInput.includes("para que sirves")
  ) {
    emoji = "🎯"
    botResponseText = randomResponse([
      "¡Mi función es ser tu guía musical en El Sistema! Puedo ayudarte con información sobre nuestros programas, conciertos, orquestas y mucho más. ¡Estoy aquí para que tu experiencia sea armoniosa!",
      "Soy el asistente virtual de El Sistema, diseñado para responder tus preguntas sobre nuestra organización, eventos y programas educativos. ¡Piensa en mí como tu compañero musical digital!",
      "¡Sirvo para hacer tu experiencia con El Sistema más fácil y agradable! Puedo proporcionarte información, responder preguntas y guiarte a través de nuestro sitio web. ¡La música es complicada, pero encontrar información sobre ella no debería serlo!",
    ])
  } else if (
    normalizedInput.includes("aburrido") ||
    normalizedInput.includes("aburrida") ||
    normalizedInput.includes("me aburro")
  ) {
    emoji = "🎭"
    botResponseText = randomResponse([
      "¿Aburrido? ¡La música es el mejor remedio! ¿Por qué no exploras nuestra Galería Audiovisual o consultas nuestros próximos conciertos? ¡Te garantizo que encontrarás algo que te emocione!",
      "¡El aburrimiento no existe cuando hay música! Pregúntame sobre nuestros próximos eventos o programas, seguro encontramos algo que despierte tu interés.",
      "¿Sabías que la música puede cambiar instantáneamente tu estado de ánimo? Explora nuestra sección de eventos o pregúntame sobre nuestras orquestas. ¡La aventura musical está a solo un clic!",
    ])
  } else if (
    normalizedInput.includes("triste") ||
    normalizedInput.includes("deprimido") ||
    normalizedInput.includes("deprimida") ||
    normalizedInput.includes("mal dia")
  ) {
    emoji = "🎵"
    botResponseText = randomResponse([
      "La música tiene el poder de transformar emociones. Si te sientes triste, quizás te interese conocer nuestros próximos conciertos. ¡La música en vivo puede ser una experiencia transformadora!",
      "Lamento que no te sientas bien. La música ha demostrado tener efectos terapéuticos. ¿Has considerado explorar nuestros programas o asistir a alguno de nuestros eventos? Podría ayudarte a levantar el ánimo.",
      "Como dijo Nietzsche, 'Sin música, la vida sería un error'. Si estás pasando por un momento difícil, déjame recomendarte explorar nuestra Galería Audiovisual. A veces, una bella melodía es todo lo que necesitamos.",
    ])
  } else if (
    normalizedInput.includes("feliz") ||
    normalizedInput.includes("contento") ||
    normalizedInput.includes("contenta") ||
    normalizedInput.includes("alegre") ||
    normalizedInput.includes("buen dia")
  ) {
    emoji = "😊"
    botResponseText = randomResponse([
      "¡Me alegra que estés de buen humor! La música puede potenciar esas emociones positivas. ¿Hay algo específico sobre El Sistema que te gustaría conocer hoy?",
      "¡La felicidad y la música van de la mano! ¿Qué mejor momento para explorar nuestros programas o próximos eventos? ¡Tu buen ánimo se multiplicará!",
      "¡Qué bueno escuchar eso! La música es aún más hermosa cuando estamos felices. ¿Te gustaría conocer más sobre nuestras orquestas o programas educativos?",
    ])
  }

  // Añadir respuesta del bot
  const botMessage = document.createElement("div")
  botMessage.className = "bot-message"
  botMessage.innerHTML = `<span class="emoji">${emoji}</span> ${botResponseText}`
  chatBox.appendChild(botMessage)

  // Desplazar hacia abajo
  chatBox.scrollTop = chatBox.scrollHeight
}
