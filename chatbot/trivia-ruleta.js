// Sistema de trivia musical con ruleta - Versión expandida
class TriviaRuleta {
  constructor() {
    this.triviaData = [
      // HISTORIA DE EL SISTEMA
      {
        pregunta: "¿En qué año fue fundado El Sistema de Orquestas de Venezuela?",
        respuesta: "El Sistema fue fundado en 1975 por José Antonio Abreu.",
        categoria: "Historia de El Sistema",
      },
      {
        pregunta: "¿Quién fue el fundador de El Sistema de Orquestas de Venezuela?",
        respuesta: "José Antonio Abreu fue el fundador de El Sistema en 1975.",
        categoria: "Historia de El Sistema",
      },
      {
        pregunta: "¿Cuál es el objetivo principal de El Sistema?",
        respuesta: "Transformar vidas a través de la educación musical y crear ciudadanos comprometidos.",
        categoria: "Historia de El Sistema",
      },
      {
        pregunta: "¿En qué ciudad comenzó El Sistema?",
        respuesta: "El Sistema comenzó en Caracas, Venezuela.",
        categoria: "Historia de El Sistema",
      },
      {
        pregunta: "¿Cuántos núcleos tiene aproximadamente El Sistema en Venezuela?",
        respuesta: "El Sistema tiene más de 400 núcleos distribuidos por todo el país.",
        categoria: "Historia de El Sistema",
      },

      // PROGRAMAS DE EL SISTEMA
      {
        pregunta: "¿A partir de qué edad pueden ingresar los niños al Programa de Iniciación Musical?",
        respuesta: "Los niños pueden ingresar desde los 4 años de edad.",
        categoria: "Programas de El Sistema",
      },
      {
        pregunta: "¿Qué programa se enfoca en la música tradicional venezolana?",
        respuesta: "El Programa Alma Llanera se enfoca en la música tradicional venezolana.",
        categoria: "Programas de El Sistema",
      },
      {
        pregunta: "¿En qué año se creó el Programa Simón Bolívar?",
        respuesta: "El Programa Simón Bolívar fue creado en 2015.",
        categoria: "Programas de El Sistema",
      },
      {
        pregunta: "¿Qué instrumento principal utiliza el Programa Coral?",
        respuesta: "El Programa Coral utiliza la voz humana como instrumento principal.",
        categoria: "Programas de El Sistema",
      },
      {
        pregunta: "¿Cuál es el objetivo del Programa Simón Bolívar?",
        respuesta: "Implementar la práctica colectiva de la música en las escuelas de educación básica.",
        categoria: "Programas de El Sistema",
      },

      // ORQUESTAS DE EL SISTEMA
      {
        pregunta: "¿Quién es el director de la Orquesta Sinfónica Juvenil de Ciudad Guayana?",
        respuesta: "Carlos Sanchez es el director de la Orquesta Sinfónica Juvenil de Ciudad Guayana.",
        categoria: "Orquestas de El Sistema",
      },
      {
        pregunta: "¿Cómo se llama la Orquesta Regional del Estado Bolívar?",
        respuesta: "Orquesta Sinfónica Regional Juvenil 'Manuel Carlos Piar' del Estado Bolívar.",
        categoria: "Orquestas de El Sistema",
      },
      {
        pregunta: "¿Quién dirige la Orquesta Regional 'Manuel Carlos Piar'?",
        respuesta: "Gregman Rodriguez Jimenez dirige la Orquesta Regional 'Manuel Carlos Piar'.",
        categoria: "Orquestas de El Sistema",
      },
      {
        pregunta: "¿Cuál es la orquesta más famosa de El Sistema a nivel internacional?",
        respuesta: "La Orquesta Sinfónica Simón Bolívar de Venezuela es la más reconocida internacionalmente.",
        categoria: "Orquestas de El Sistema",
      },
      {
        pregunta: "¿Qué significa que una orquesta sea 'juvenil' en El Sistema?",
        respuesta: "Significa que está integrada por jóvenes músicos en formación de alto nivel.",
        categoria: "Orquestas de El Sistema",
      },

      // INSTRUMENTOS DE CUERDA
      {
        pregunta: "¿Cuántas cuerdas tiene un violín?",
        respuesta: "Un violín tiene 4 cuerdas: Sol, Re, La y Mi.",
        categoria: "Instrumentos de Cuerda",
      },
      {
        pregunta: "¿Cuál es el instrumento más grande de la familia de cuerdas?",
        respuesta: "El contrabajo es el instrumento más grande de la familia de cuerdas.",
        categoria: "Instrumentos de Cuerda",
      },
      {
        pregunta: "¿Cuántas cuerdas tiene una guitarra clásica?",
        respuesta: "Una guitarra clásica tiene 6 cuerdas.",
        categoria: "Instrumentos de Cuerda",
      },
      {
        pregunta: "¿Qué instrumento de cuerda se toca con un arco y es más grande que el violín?",
        respuesta: "La viola es más grande que el violín y también se toca con arco.",
        categoria: "Instrumentos de Cuerda",
      },
      {
        pregunta: "¿Cuál es la diferencia principal entre violín y viola?",
        respuesta: "La viola es más grande que el violín y tiene un sonido más grave.",
        categoria: "Instrumentos de Cuerda",
      },

      // INSTRUMENTOS DE VIENTO
      {
        pregunta: "¿Cuántas válvulas tiene una trompeta?",
        respuesta: "Una trompeta típicamente tiene 3 válvulas.",
        categoria: "Instrumentos de Viento",
      },
      {
        pregunta: "¿Cuál es el instrumento de viento más agudo de la orquesta?",
        respuesta: "El piccolo es el instrumento de viento más agudo de la orquesta.",
        categoria: "Instrumentos de Viento",
      },
      {
        pregunta: "¿Qué instrumento de viento tiene llaves y se toca horizontalmente?",
        respuesta: "La flauta traversa se toca horizontalmente y tiene llaves.",
        categoria: "Instrumentos de Viento",
      },
      {
        pregunta: "¿Cuál es el instrumento de viento-madera más grave de la orquesta?",
        respuesta: "El fagot es el instrumento de viento-madera más grave de la orquesta.",
        categoria: "Instrumentos de Viento",
      },
      {
        pregunta: "¿Qué instrumento de viento utiliza una caña doble?",
        respuesta: "El oboe utiliza una caña doble para producir sonido.",
        categoria: "Instrumentos de Viento",
      },

      // INSTRUMENTOS DE PERCUSIÓN
      {
        pregunta: "¿Cuál es el instrumento de percusión más común en una orquesta?",
        respuesta: "Los timbales son los instrumentos de percusión más comunes en una orquesta.",
        categoria: "Instrumentos de Percusión",
      },
      {
        pregunta: "¿Qué instrumento de percusión puede cambiar de afinación durante la interpretación?",
        respuesta: "Los timbales pueden cambiar de afinación durante la interpretación.",
        categoria: "Instrumentos de Percusión",
      },
      {
        pregunta: "¿Cómo se llaman los palillos que se usan para tocar la batería?",
        respuesta: "Los palillos de batería se llaman baquetas.",
        categoria: "Instrumentos de Percusión",
      },
      {
        pregunta: "¿Qué instrumento de percusión se toca frotando con un arco?",
        respuesta: "La sierra musical se puede tocar frotando con un arco de violín.",
        categoria: "Instrumentos de Percusión",
      },
      {
        pregunta: "¿Cuál es la diferencia entre platillos y gong?",
        respuesta: "Los platillos se tocan en pareja y el gong es un disco metálico individual más grande.",
        categoria: "Instrumentos de Percusión",
      },

      // PIANO Y TECLADOS
      {
        pregunta: "¿Cuántas teclas blancas tiene un piano?",
        respuesta: "Un piano tiene 52 teclas blancas.",
        categoria: "Piano y Teclados",
      },
      {
        pregunta: "¿Cuántas teclas negras tiene un piano completo?",
        respuesta: "Un piano completo tiene 36 teclas negras.",
        categoria: "Piano y Teclados",
      },
      {
        pregunta: "¿Quién inventó el piano?",
        respuesta: "Bartolomeo Cristofori inventó el piano alrededor de 1700.",
        categoria: "Piano y Teclados",
      },
      {
        pregunta: "¿Cuál es la diferencia entre un piano de cola y un piano vertical?",
        respuesta: "En el piano de cola las cuerdas están horizontales, en el vertical están verticales.",
        categoria: "Piano y Teclados",
      },
      {
        pregunta: "¿Qué significa 'forte' en los pedales del piano?",
        respuesta: "El pedal forte (derecho) sostiene las notas al levantar los apagadores.",
        categoria: "Piano y Teclados",
      },

      // TEORÍA MUSICAL
      {
        pregunta: "¿Qué significa 'forte' en música?",
        respuesta: "Forte significa tocar fuerte o con intensidad.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Qué es un 'crescendo'?",
        respuesta: "Un crescendo es un aumento gradual del volumen en la música.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Qué significa 'allegro' en música?",
        respuesta: "Allegro significa tocar de manera rápida y animada.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Cuántas líneas tiene un pentagrama?",
        respuesta: "Un pentagrama tiene 5 líneas horizontales.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Qué es un 'staccato'?",
        respuesta: "Staccato significa tocar las notas de forma corta y separada.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Cuál es la clave más común en música?",
        respuesta: "La clave de Sol es la más común en música.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Qué significa 'pianissimo'?",
        respuesta: "Pianissimo significa tocar muy suave, más suave que piano.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Qué es una 'octava' en música?",
        respuesta: "Una octava es el intervalo entre una nota y la siguiente nota con el mismo nombre.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Cuál es el tempo más lento en música?",
        respuesta: "Largo es uno de los tempos más lentos en música.",
        categoria: "Teoría Musical",
      },
      {
        pregunta: "¿Qué significa 'andante' en música?",
        respuesta: "Andante significa tocar a un tempo moderado, como caminando.",
        categoria: "Teoría Musical",
      },

      // COMPOSITORES CLÁSICOS
      {
        pregunta: "¿Quién compuso 'Las Cuatro Estaciones'?",
        respuesta: "Antonio Vivaldi compuso 'Las Cuatro Estaciones'.",
        categoria: "Compositores Clásicos",
      },
      {
        pregunta: "¿Qué compositor escribió 'El Bolero'?",
        respuesta: "Maurice Ravel compuso 'El Bolero' en 1928.",
        categoria: "Compositores Clásicos",
      },
      {
        pregunta: "¿Cuántas sinfonías compuso Beethoven?",
        respuesta: "Ludwig van Beethoven compuso 9 sinfonías.",
        categoria: "Compositores Clásicos",
      },
      {
        pregunta: "¿Qué compositor es conocido como 'El Rey del Vals'?",
        respuesta: "Johann Strauss II es conocido como 'El Rey del Vals'.",
        categoria: "Compositores Clásicos",
      },
      {
        pregunta: "¿Quién compuso 'El Lago de los Cisnes'?",
        respuesta: "Pyotr Ilyich Tchaikovsky compuso 'El Lago de los Cisnes'.",
        categoria: "Compositores Clásicos",
      },
      {
        pregunta: "¿Qué compositor escribió 'La Flauta Mágica'?",
        respuesta: "Wolfgang Amadeus Mozart compuso 'La Flauta Mágica'.",
        categoria: "Compositores Clásicos",
      },
      {
        pregunta: "¿Cuál fue el último compositor del período Barroco?",
        respuesta: "Johann Sebastian Bach es considerado el último gran compositor del Barroco.",
        categoria: "Compositores Clásicos",
      },

      // MÚSICA VENEZOLANA
      {
        pregunta: "¿Cuál es el instrumento nacional de Venezuela?",
        respuesta: "El cuatro es considerado el instrumento nacional de Venezuela.",
        categoria: "Música Venezolana",
      },
      {
        pregunta: "¿Qué es un joropo?",
        respuesta: "El joropo es un género musical y danza tradicional de Venezuela.",
        categoria: "Música Venezolana",
      },
      {
        pregunta: "¿Cuántas cuerdas tiene un cuatro venezolano?",
        respuesta: "El cuatro venezolano tiene 4 cuerdas.",
        categoria: "Música Venezolana",
      },
      {
        pregunta: "¿Qué instrumento acompaña tradicionalmente al cuatro en el joropo?",
        respuesta: "Las maracas y el arpa llanera acompañan tradicionalmente al cuatro.",
        categoria: "Música Venezolana",
      },
      {
        pregunta: "¿Quién compuso 'Alma Llanera'?",
        respuesta: "Pedro Elías Gutiérrez compuso la música de 'Alma Llanera'.",
        categoria: "Música Venezolana",
      },
      {
        pregunta: "¿Qué es una gaita venezolana?",
        respuesta: "La gaita es un género musical tradicional del estado Zulia en Venezuela.",
        categoria: "Música Venezolana",
      },
      {
        pregunta: "¿En qué región de Venezuela se originó el joropo?",
        respuesta: "El joropo se originó en los llanos de Venezuela.",
        categoria: "Música Venezolana",
      },

      // MÚSICA LATINOAMERICANA
      {
        pregunta: "¿De qué país es originario el tango?",
        respuesta: "El tango es originario de Argentina, específicamente de Buenos Aires.",
        categoria: "Música Latinoamericana",
      },
      {
        pregunta: "¿Qué instrumento es característico de la música andina?",
        respuesta: "La quena y el charango son instrumentos característicos de la música andina.",
        categoria: "Música Latinoamericana",
      },
      {
        pregunta: "¿Cuál es el ritmo nacional de Brasil?",
        respuesta: "La samba es considerada el ritmo nacional de Brasil.",
        categoria: "Música Latinoamericana",
      },
      {
        pregunta: "¿De qué país es originaria la cumbia?",
        respuesta: "La cumbia es originaria de Colombia.",
        categoria: "Música Latinoamericana",
      },
      {
        pregunta: "¿Qué es un mariachi?",
        respuesta: "El mariachi es un conjunto musical tradicional de México.",
        categoria: "Música Latinoamericana",
      },

      // DIRECTORES DE ORQUESTA
      {
        pregunta: "¿Qué instrumento 'toca' el director de orquesta?",
        respuesta: "El director de orquesta 'toca' la batuta, dirigiendo a todos los músicos.",
        categoria: "Directores de Orquesta",
      },
      {
        pregunta: "¿Quién fue Gustavo Dudamel?",
        respuesta:
          "Gustavo Dudamel es un director venezolano formado en El Sistema, director de la Filarmónica de Los Ángeles.",
        categoria: "Directores de Orquesta",
      },
      {
        pregunta: "¿Qué hace un director de orquesta durante un concierto?",
        respuesta: "El director coordina a todos los músicos, marca el tempo y las dinámicas de la interpretación.",
        categoria: "Directores de Orquesta",
      },
      {
        pregunta: "¿Cómo se llama el podio donde se para el director?",
        respuesta: "El podio del director se llama tarima o estrado.",
        categoria: "Directores de Orquesta",
      },
      {
        pregunta: "¿Qué director venezolano es más reconocido internacionalmente?",
        respuesta: "Gustavo Dudamel es el director venezolano más reconocido internacionalmente.",
        categoria: "Directores de Orquesta",
      },

      // ÓPERA Y MÚSICA VOCAL
      {
        pregunta: "¿Qué es una ópera?",
        respuesta: "Una ópera es una obra teatral cantada con acompañamiento orquestal.",
        categoria: "Ópera y Música Vocal",
      },
      {
        pregunta: "¿Cuál es la voz femenina más aguda?",
        respuesta: "La soprano es la voz femenina más aguda.",
        categoria: "Ópera y Música Vocal",
      },
      {
        pregunta: "¿Cuál es la voz masculina más grave?",
        respuesta: "El bajo es la voz masculina más grave.",
        categoria: "Ópera y Música Vocal",
      },
      {
        pregunta: "¿Qué significa 'aria' en ópera?",
        respuesta: "Un aria es una pieza vocal solista dentro de una ópera.",
        categoria: "Ópera y Música Vocal",
      },
      {
        pregunta: "¿Quién compuso 'La Traviata'?",
        respuesta: "Giuseppe Verdi compuso 'La Traviata'.",
        categoria: "Ópera y Música Vocal",
      },

      // MÚSICA MODERNA Y TECNOLOGÍA
      {
        pregunta: "¿Qué significa MIDI en música?",
        respuesta: "MIDI significa Musical Instrument Digital Interface (Interfaz Digital de Instrumentos Musicales).",
        categoria: "Música y Tecnología",
      },
      {
        pregunta: "¿Qué es un sintetizador?",
        respuesta: "Un sintetizador es un instrumento electrónico que genera sonidos artificialmente.",
        categoria: "Música y Tecnología",
      },
      {
        pregunta: "¿Cuál fue el primer instrumento eléctrico?",
        respuesta: "El theremin, inventado en 1920, fue uno de los primeros instrumentos electrónicos.",
        categoria: "Música y Tecnología",
      },
      {
        pregunta: "¿Qué es el Auto-Tune?",
        respuesta: "El Auto-Tune es una tecnología que corrige automáticamente la afinación vocal.",
        categoria: "Música y Tecnología",
      },
      {
        pregunta: "¿Qué significa DAW en producción musical?",
        respuesta: "DAW significa Digital Audio Workstation (Estación de Trabajo de Audio Digital).",
        categoria: "Música y Tecnología",
      },

      // CURIOSIDADES MUSICALES
      {
        pregunta: "¿Cuántos movimientos tiene una sinfonía clásica?",
        respuesta: "Una sinfonía clásica tradicionalmente tiene 4 movimientos.",
        categoria: "Curiosidades Musicales",
      },
      {
        pregunta: "¿Qué significa la palabra 'orquesta'?",
        respuesta: "Orquesta viene del griego 'orchestra' que significa 'lugar para danzar'.",
        categoria: "Curiosidades Musicales",
      },
      {
        pregunta: "¿Cuál es la nota más grave que puede producir un piano?",
        respuesta: "La nota más grave de un piano de 88 teclas es un La (A0).",
        categoria: "Curiosidades Musicales",
      },
      {
        pregunta: "¿Por qué los músicos afinan con la nota La?",
        respuesta: "La nota La (440 Hz) es el estándar internacional de afinación desde 1939.",
        categoria: "Curiosidades Musicales",
      },
      {
        pregunta: "¿Cuál es el instrumento más antiguo del mundo?",
        respuesta: "La flauta es considerada uno de los instrumentos más antiguos, con más de 40,000 años.",
        categoria: "Curiosidades Musicales",
      },
      {
        pregunta: "¿Qué compositor era sordo?",
        respuesta: "Ludwig van Beethoven perdió gradualmente la audición pero siguió componiendo.",
        categoria: "Curiosidades Musicales",
      },
      {
        pregunta: "¿Cuántas personas pueden tocar en una orquesta sinfónica completa?",
        respuesta: "Una orquesta sinfónica completa puede tener entre 70 y 100 músicos.",
        categoria: "Curiosidades Musicales",
      },

      // FESTIVALES Y EVENTOS
      {
        pregunta: "¿Dónde se celebra el Festival de Salzburgo?",
        respuesta: "El Festival de Salzburgo se celebra en Austria, ciudad natal de Mozart.",
        categoria: "Festivales y Eventos",
      },
      {
        pregunta: "¿Qué es el Festival de Bayreuth?",
        respuesta: "Es un festival dedicado exclusivamente a las óperas de Richard Wagner en Alemania.",
        categoria: "Festivales y Eventos",
      },
      {
        pregunta: "¿Cuándo se celebra el Día Internacional de la Música?",
        respuesta: "El Día Internacional de la Música se celebra el 21 de junio.",
        categoria: "Festivales y Eventos",
      },
      {
        pregunta: "¿Qué es el Festival de Tanglewood?",
        respuesta: "Tanglewood es el hogar de verano de la Orquesta Sinfónica de Boston en Massachusetts.",
        categoria: "Festivales y Eventos",
      },
      {
        pregunta: "¿Dónde se encuentra el Teatro La Scala?",
        respuesta: "El Teatro La Scala se encuentra en Milán, Italia.",
        categoria: "Festivales y Eventos",
      },
    ]

    this.isSpinning = false
    this.setupRuleta()
  }

  setupRuleta() {
    // Crear el botón de ruleta si no existe
    if (!document.getElementById("trivia-button")) {
      this.createTriviaButton()
    }
  }

  createTriviaButton() {
    // Crear el botón de trivia con solo icono
    const triviaButton = document.createElement("button")
    triviaButton.id = "trivia-button"
    triviaButton.className = "trivia-button"
    triviaButton.innerHTML = "🎲" // Solo el icono de dado
    triviaButton.title = "Trivia Musical" // Tooltip para explicar la función
    triviaButton.addEventListener("click", () => this.spinRuleta())

    // Agregar el botón al header
    const header = document.querySelector(".header")
    if (header) {
      header.insertBefore(triviaButton, header.querySelector(".close-button"))
    }
  }

  spinRuleta() {
    if (this.isSpinning) return

    this.isSpinning = true
    const button = document.getElementById("trivia-button")
    const chatBox = document.getElementById("chat-box")

    // Animación del botón
    button.style.transform = "rotate(0deg)"
    button.style.transition = "transform 2s ease-out"

    // Crear mensaje de "girando"
    const spinningMessage = document.createElement("div")
    spinningMessage.className = "bot-message spinning-message"
    spinningMessage.innerHTML = '<span class="emoji">🎲</span> ¡Girando la ruleta de trivia musical...'
    chatBox.appendChild(spinningMessage)
    chatBox.scrollTop = chatBox.scrollHeight

    // Animar el botón girando
    let rotation = 0
    const spinInterval = setInterval(() => {
      rotation += 30
      button.style.transform = `rotate(${rotation}deg)`
    }, 50)

    // Después de 2 segundos, mostrar la trivia
    setTimeout(() => {
      clearInterval(spinInterval)
      button.style.transform = "rotate(0deg)"

      // Remover mensaje de girando
      if (spinningMessage.parentNode) {
        chatBox.removeChild(spinningMessage)
      }

      // Mostrar trivia aleatoria
      this.showRandomTrivia()
      this.isSpinning = false
    }, 2000)
  }

  showRandomTrivia() {
    const chatBox = document.getElementById("chat-box")
    const randomTrivia = this.triviaData[Math.floor(Math.random() * this.triviaData.length)]

    // Mensaje con la pregunta
    const questionMessage = document.createElement("div")
    questionMessage.className = "bot-message trivia-question"
    questionMessage.innerHTML = `
      <span class="emoji">🎯</span> 
      <strong>Trivia ${randomTrivia.categoria}:</strong><br>
      ${randomTrivia.pregunta}
    `
    chatBox.appendChild(questionMessage)
    chatBox.scrollTop = chatBox.scrollHeight

    // Mostrar indicador de escritura
    const typingIndicator = document.createElement("div")
    typingIndicator.className = "typing-indicator"
    typingIndicator.innerHTML = "<span></span><span></span><span></span>"
    chatBox.appendChild(typingIndicator)
    chatBox.scrollTop = chatBox.scrollHeight

    // Después de 3 segundos, mostrar la respuesta
    setTimeout(() => {
      // Remover indicador de escritura
      if (typingIndicator.parentNode) {
        chatBox.removeChild(typingIndicator)
      }

      // Mensaje con la respuesta
      const answerMessage = document.createElement("div")
      answerMessage.className = "bot-message trivia-answer"
      answerMessage.innerHTML = `
        <span class="emoji">💡</span> 
        <strong>Respuesta:</strong><br>
        ${randomTrivia.respuesta}
      `
      chatBox.appendChild(answerMessage)
      chatBox.scrollTop = chatBox.scrollHeight

      
    }, 3000)
  }

  // Método para contar categorías únicas
  getCategoriesCount() {
    const categories = [...new Set(this.triviaData.map((item) => item.categoria))]
    return categories.length
  }

  // Método para obtener todas las categorías
  getCategories() {
    return [...new Set(this.triviaData.map((item) => item.categoria))]
  }

  // Método para obtener trivia por categoría específica
  getTriviaByCategory(categoria) {
    return this.triviaData.filter((item) => item.categoria === categoria)
  }

  // Método para agregar más trivia dinámicamente
  addTrivia(pregunta, respuesta, categoria) {
    this.triviaData.push({
      pregunta: pregunta,
      respuesta: respuesta,
      categoria: categoria,
    })
  }

  // Método para obtener estadísticas
  getStats() {
    const categories = this.getCategories()
    const stats = {}

    categories.forEach((cat) => {
      stats[cat] = this.getTriviaByCategory(cat).length
    })

    return {
      totalQuestions: this.triviaData.length,
      totalCategories: categories.length,
      categoriesBreakdown: stats,
    }
  }
}

// Inicializar la ruleta cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Esperar un poco para asegurar que el chatbot esté completamente cargado
  setTimeout(() => {
    window.triviaRuleta = new TriviaRuleta()

    // Mostrar estadísticas en consola para desarrollo
    console.log("🎲 Trivia Musical cargada:")
    console.log(`📊 ${window.triviaRuleta.triviaData.length} preguntas`)
    console.log(`📚 ${window.triviaRuleta.getCategoriesCount()} categorías`)
    console.log("🏷️ Categorías disponibles:", window.triviaRuleta.getCategories())
  }, 500)
})
