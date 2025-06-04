// chatbot-button.js - Script para crear y gestionar el botón del chatbot
;(() => {
  // Crear estilos CSS
  const style = document.createElement("style")
  style.textContent = `
        /* Estilos para el botón y la ventana del chatbot */
        #chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff6b00, #72d54a);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
        }

        #chatbot-button:hover {
            transform: scale(1.1);
        }

        /* Animación de notas musicales */
        @keyframes floatNotes {
            0% {
                opacity: 0;
                transform: translate(0, 0) rotate(0deg);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translate(-20px, -30px) rotate(20deg);
            }
        }

        .music-note {
            position: absolute;
            color: white;
            font-size: 16px;
            pointer-events: none;
            animation: floatNotes 2s ease-out infinite;
        }

        /* Estilos para la ventana modal del chatbot */
        #chatbot-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            right: 20px;
            bottom: 90px;
            width: 350px;
            height: 500px;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            background-color: #f9f9f9;
        }

        #chatbot-iframe {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #f9f9f9;
        }

        /* Estilos para scrollbar personalizado */
        #chatbot-iframe::-webkit-scrollbar {
            width: 8px;
        }

        #chatbot-iframe::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        #chatbot-iframe::-webkit-scrollbar-thumb {
            background: #00addc;
            border-radius: 4px;
        }

        #chatbot-iframe::-webkit-scrollbar-thumb:hover {
            background: #022169;
        }
    `
  document.head.appendChild(style)

  // Asegurarse de que Font Awesome esté cargado
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement("link")
    fontAwesome.rel = "stylesheet"
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    document.head.appendChild(fontAwesome)
  }

  // Crear elementos HTML
  function createChatbotElements() {
    // Crear el botón del chatbot
    const chatbotButton = document.createElement("button")
    chatbotButton.id = "chatbot-button"
    chatbotButton.setAttribute("aria-label", "Abrir Asistente Virtual")

    const robotIcon = document.createElement("i")
    robotIcon.className = "fas fa-robot"
    chatbotButton.appendChild(robotIcon)

    // Crear la ventana modal
    const chatbotModal = document.createElement("div")
    chatbotModal.id = "chatbot-modal"

    // Crear el iframe
    const chatbotIframe = document.createElement("iframe")
    chatbotIframe.id = "chatbot-iframe"
    chatbotIframe.setAttribute("frameborder", "0")
    chatbotIframe.setAttribute("title", "Chatbot El Sistema")

    // Añadir iframe a la ventana modal
    chatbotModal.appendChild(chatbotIframe)

    // Añadir elementos al body
    document.body.appendChild(chatbotButton)
    document.body.appendChild(chatbotModal)

    return { chatbotButton, chatbotModal, chatbotIframe }
  }

  // Inicializar la funcionalidad del chatbot
  function initChatbot() {
    const { chatbotButton, chatbotModal, chatbotIframe } = createChatbotElements()
    let isOpen = false

    // Crear y animar notas musicales constantemente
    function createMusicNote() {
      const note = document.createElement("span")
      note.className = "music-note"
      note.innerHTML = Math.random() > 0.5 ? "♪" : "♫"
      note.style.left = Math.random() * 40 + 10 + "px"
      note.style.top = Math.random() * 40 + 10 + "px"
      note.style.animationDelay = Math.random() * 2 + "s"
      chatbotButton.appendChild(note)

      // Eliminar la nota después de que termine la animación
      setTimeout(() => {
        if (note && note.parentNode) {
          note.remove()
        }
      }, 2000)
    }

    // Crear notas periódicamente
    const noteInterval = setInterval(createMusicNote, 1000)

    // Abrir/cerrar el chatbot al hacer clic en el botón
    chatbotButton.addEventListener("click", () => {
      if (!isOpen) {
        // Cargar el iframe solo cuando se abre por primera vez
        if (
          !chatbotIframe.getAttribute("src") ||
          chatbotIframe.getAttribute("src") === "" ||
          chatbotIframe.getAttribute("src") === "about:blank"
        ) {
          // Usar la ruta absoluta al archivo index-chatbot.html
          chatbotIframe.setAttribute("src", "/chatbot/index-chatbot.html")

          // Verificar si el iframe se cargó correctamente
          chatbotIframe.onload = () => {
            console.log("Iframe cargado correctamente")
          }

          chatbotIframe.onerror = () => {
            console.error("Error al cargar el iframe")
            // Intentar con una ruta alternativa si hay error
            chatbotIframe.setAttribute("src", "chatbot/index-chatbot.html")
          }
        }
        chatbotModal.style.display = "block"
      } else {
        chatbotModal.style.display = "none"
      }
      isOpen = !isOpen

      // Notificar que se ha abierto/cerrado el chatbot
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(isOpen ? "chatbotOpened" : "chatbotClosed", "*")
      }
    })

    // Escuchar mensajes para cerrar el chatbot
    window.addEventListener("message", (event) => {
      if (event.data === "closeChatbot") {
        chatbotModal.style.display = "none"
        isOpen = false

        // Notificar que se ha cerrado el chatbot
        if (window.parent && window.parent !== window) {
          window.parent.postMessage("chatbotClosed", "*")
        }
      }
    })

    // Función para limpiar recursos cuando sea necesario
    function cleanup() {
      clearInterval(noteInterval)
      chatbotButton.remove()
      chatbotModal.remove()
    }

    // Exponer una API pública
    return {
      open: () => {
        if (!isOpen) {
          chatbotButton.click()
        }
      },
      close: () => {
        if (isOpen) {
          chatbotButton.click()
        }
      },
      destroy: cleanup,
    }
  }

  // Iniciar el chatbot cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot)
  } else {
    window.elsistemaChatbot = initChatbot()
  }
})()
