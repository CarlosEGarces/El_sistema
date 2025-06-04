document.addEventListener("DOMContentLoaded", () => {
  // Inicializar filtros de la galería
  initGalleryFilters()

  // Inicializar cambio de vista de la galería
  initGalleryViewToggle()

  // Inicializar modal de imágenes
  initImageModal()

  // Inicializar botón de cargar más
  initLoadMoreButton()

  // Inicializar animaciones al hacer scroll
  initScrollAnimations()

  // Inicializar efecto de mosaico para la vista de mosaico
  initMasonryLayout()
})

// Función para inicializar los filtros de la galería
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

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
      galleryItems.forEach((item) => {
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

      // Actualizar el layout de mosaico si está activo
      if (document.querySelector(".gallery-grid").classList.contains("masonry")) {
        setTimeout(updateMasonryLayout, 600)
      }
    })
  })
}

// Función para inicializar el cambio de vista de la galería
function initGalleryViewToggle() {
  const viewButtons = document.querySelectorAll(".view-btn")
  const galleryGrid = document.getElementById("gallery-container")

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
        galleryGrid.classList.remove("masonry")
        // Resetear los estilos de altura para la vista de cuadrícula
        document.querySelectorAll(".gallery-item").forEach((item) => {
          item.style.gridRowEnd = ""
        })
      } else if (view === "masonry") {
        galleryGrid.classList.add("masonry")
        // Inicializar el layout de mosaico
        initMasonryLayout()
      }
    })
  })
}

// Función para inicializar el modal de imágenes
function initImageModal() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    const prevButton = document.querySelector('.prev-image');
    const nextButton = document.querySelector('.next-image');
    let currentIndex = 0;
    let galleryItems = [];
    
    // Función para abrir el modal
    function openModal(index) {
        // Obtener todos los elementos visibles de la galería
        galleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.filtered-out)'));
        currentIndex = index;
        
        const item = galleryItems[currentIndex];
        const imageUrl = item.querySelector('.expand-btn').getAttribute('data-image');
        const title = item.querySelector('.overlay-content h3').textContent;
        const description = item.querySelector('.overlay-content p').textContent;
        
        modalImage.src = imageUrl;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll en el body
        
        // Añadir animación de entrada
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.style.opacity = '1';
            modalImage.style.transition = 'opacity 0.5s ease';
        }, 100);
    }
    
    // Función para cerrar el modal
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll en el body
    }
    
    // Función para mostrar la imagen anterior
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModalImage();
    }
    
    // Función para mostrar la siguiente imagen
    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateModalImage();
    }
    
    // Función para actualizar la imagen del modal
    function updateModalImage() {
        const item = galleryItems[currentIndex];
        const imageUrl = item.querySelector('.expand-btn').getAttribute('data-image');
        const title = item.querySelector('.overlay-content h3').textContent;
        const description = item.querySelector('.overlay-content p').textContent;
        
        // Añadir animación de transición
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.src = imageUrl;

```html file="galeria-videos.html"
&lt;!DOCTYPE html>
<html lang="es" class="dark-mode">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galería de Videos - El Sistema Núcleo Ciudad Guayana</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="galeria-audiovisual.css">
    <link rel="stylesheet" href="galeria-videos.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</head>
<body>
    &lt;!-- Botón de cambio de modo -->
    <button id="theme-toggle" class="theme-toggle" aria-label="Cambiar tema">
        <i class="fas fa-sun"></i>
    </button>

    &lt;!-- Botón del chatbot con ícono de robot -->
    <button id="chatbot-button" aria-label="Abrir Asistente Virtual">
        <i class="fas fa-robot"></i>
    </button>
    
    &lt;!-- Ventana modal del chatbot -->
    <div id="chatbot-modal">
        <iframe id="chatbot-iframe" src="/placeholder.svg" frameborder="0"></iframe>
    </div>

    &lt;!-- Header principal con gradiente -->
    <header class="videos-header-gradient">
        <div class="container text-center header-content">
            <p class="small-text animate-on-scroll" data-animation="fadeInDown">El Sistema</p>
            <h1 class="animate-on-scroll" data-animation="fadeInUp" data-delay="200">GALERÍA DE VIDEOS</h1>
            <h2 class="animate-on-scroll" data-animation="fadeInUp" data-delay="400">NUESTRA MÚSICA EN MOVIMIENTO</h2>
        </div>
    </header>

    &lt;!-- Navegación principal -->
    <nav class="main-nav" aria-label="Navegación principal">
        <div class="container">
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.html">INICIO</a><div class="music-notes"></div></li>
                <li class="nav-item"><a href="calendario.html">CALENDARIO DE EVENTOS</a><div class="music-notes"></div></li>
                <li class="nav-item"><a href="boletos.html">BOLETOS</a><div class="music-notes"></div></li>
                <li class="nav-item"><a href="donaciones.html">DONACIONES</a><div class="hearts-animation"></div></li>
                <li class="nav-item dropdown">
                    <a href="#agrupaciones" class="dropdown-toggle">AGRUPACIONES</a>
                    <div class="music-notes"></div>
                    <ul class="dropdown-menu">
                        <li><a href="#regional">Regional</a></li>
                        <li><a href="#juvenil">Juvenil</a></li>
                        <li><a href="#infantil">Infantil</a></li>
                        <li><a href="#ensambles">Ensambles</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="comunidad.html">COMUNIDAD</a><div class="music-notes"></div></li>
                <li class="nav-item"><a href="noticias-prensa.html">NOTICIAS Y PRENSA</a><div class="music-notes"></div></li>
                <li class="nav-item"><a href="galeria-audiovisual.html" class="active">GALERÍA AUDIOVISUAL</a><div class="camera-animation"></div></li>
            </ul>
        </div>
    </nav>

    &lt;!-- Sección de logo y redes sociales -->
    <section class="branding-section">
        <div class="container logo-social">
            <div class="logo-container animate-on-scroll" data-animation="fadeInLeft">
                <figure class="logo-circle">
                    <svg viewBox="0 0 100 100" class="sistema-logo" aria-label="Logo de El Sistema">
                        <circle cx="50" cy="50" r="5" fill="#e70095"/>
                        <line x1="50" y1="50" x2="85" y2="30" stroke="#e70095" stroke-width="2"/>
                        <circle cx="85" cy="30" r="5" fill="#e70095"/>
                        <line x1="50" y1="50" x2="20" y2="20" stroke="#00addc" stroke-width="2"/>
                        <circle cx="20" cy="20" r="5" fill="#00addc"/>
                        <line x1="50" y1="50" x2="80" y2="70" stroke="#72d54a" stroke-width="2"/>
                        <circle cx="80" cy="70" r="5" fill="#72d54a"/>
                        <line x1="50" y1="50" x2="20" y2="80" stroke="#ff6b00" stroke-width="2"/>
                        <circle cx="20" cy="80" r="5" fill="#ff6b00"/>
                    </svg>
                </figure>
                <div class="logo-text">
                    <p class="bold">EL SISTEMA</p>
                    <p>Núcleo Ciudad Guayana</p>
                </div>
            </div>
            <div class="social-icons animate-on-scroll" data-animation="fadeInRight" aria-label="Redes sociales">
                <a href="https://www.instagram.com/elsistemaciudadguayana/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            </div>
        </div>
    </section>

    <main id="contenido-principal">
        &lt;!-- Barra de navegación de la galería -->
        <section class="gallery-nav-section">
            <div class="container">
                <div class="gallery-nav animate-on-scroll" data-animation="fadeIn">
                    <a href="galeria-audiovisual.html" class="nav-link"><i class="fas fa-arrow-left"></i> Volver a Galería</a>
                    <div class="gallery-filters">
                        <button class="filter-btn active" data-filter="all">Todos</button>
                        <button class="filter-btn" data-filter="conciertos">Conciertos</button>
                        <button class="filter-btn" data-filter="entrevistas">Entrevistas</button>
                        <button class="filter-btn" data-filter="detras-camaras">Detrás de Cámaras</button>
                        <button class="filter-btn" data-filter="documentales">Documentales</button>
                    </div>
                    <div class="gallery-view-options">
                        <button class="view-btn active" data-view="grid"><i class="fas fa-th"></i></button>
                        <button class="view-btn" data-view="list"><i class="fas fa-list"></i></button>
                    </div>
                </div>
            </div>
        </section>

        &lt;!-- Video destacado -->
        <section class="featured-video-section">
            <div class="container">
                <h2 class="section-title animate-on-scroll" data-animation="fadeIn">VIDEO DESTACADO</h2>
                
                <div class="featured-video-container animate-on-scroll" data-animation="fadeIn" data-delay="200">
                    <div class="video-wrapper">
                        <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                            <img src="/placeholder.svg?height=600&width=1200" alt="Concierto Aniversario">
                            <div class="play-button-large">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                    </div>
                    <div class="featured-video-info">
                        <h3>Concierto Aniversario: 15 Años de El Sistema en Ciudad Guayana</h3>
                        <p class="video-meta">
                            <span class="video-date"><i class="far fa-calendar-alt"></i> 15 de marzo de 2023</span>
                            <span class="video-duration"><i class="far fa-clock"></i> 1:25:30</span>
                            <span class="video-views"><i class="far fa-eye"></i> 2,543 vistas</span>
                        </p>
                        <p class="video-description">
                            Disfruta del concierto completo de celebración por los 15 años de El Sistema en Ciudad Guayana. 
                            Una noche mágica llena de música, talento y emoción que reunió a todas nuestras agrupaciones 
                            en el Teatro de la Ópera.
                        </p>
                        <div class="video-tags">
                            <span class="tag">Concierto</span>
                            <span class="tag">Aniversario</span>
                            <span class="tag">Orquesta Sinfónica</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        &lt;!-- Galería de videos -->
        <section class="videos-gallery-section">
            <div class="container">
                <h2 class="section-title animate-on-scroll" data-animation="fadeIn">TODOS LOS VIDEOS</h2>
                
                <div class="videos-grid" id="videos-container">
                    &lt;!-- Video 1 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="100" data-category="conciertos">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Concierto de Gala">
                                <div class="video-duration">45:20</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Concierto de Gala 2023</h3>
                                <p class="video-meta">
                                    <span class="video-date">15 de marzo de 2023</span>
                                    <span class="video-views">1,245 vistas</span>
                                </p>
                                <p class="video-description">
                                    Concierto de Gala de la Orquesta Sinfónica de Ciudad Guayana en el Teatro de la Ópera.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    &lt;!-- Video 2 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="200" data-category="entrevistas">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Entrevista con el Director">
                                <div class="video-duration">15:45</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Entrevista con el Director</h3>
                                <p class="video-meta">
                                    <span class="video-date">10 de febrero de 2023</span>
                                    <span class="video-views">856 vistas</span>
                                </p>
                                <p class="video-description">
                                    Conversación con nuestro director musical sobre su visión y proyectos futuros.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    &lt;!-- Video 3 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="300" data-category="detras-camaras">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Detrás de Cámaras">
                                <div class="video-duration">08:30</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Detrás de Cámaras</h3>
                                <p class="video-meta">
                                    <span class="video-date">5 de enero de 2023</span>
                                    <span class="video-views">723 vistas</span>
                                </p>
                                <p class="video-description">
                                    Un vistazo a la preparación de nuestros músicos antes del gran concierto.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    &lt;!-- Video 4 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="400" data-category="documentales">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Documental El Sistema">
                                <div class="video-duration">35:15</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Documental: El Sistema</h3>
                                <p class="video-meta">
                                    <span class="video-date">20 de diciembre de 2022</span>
                                    <span class="video-views">1,876 vistas</span>
                                </p>
                                <p class="video-description">
                                    Documental sobre el impacto social de El Sistema en Ciudad Guayana.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    &lt;!-- Video 5 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="500" data-category="conciertos">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Concierto Navideño">
                                <div class="video-duration">55:10</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Concierto Navideño 2022</h3>
                                <p class="video-meta">
                                    <span class="video-date">15 de diciembre de 2022</span>
                                    <span class="video-views">2,134 vistas</span>
                                </p>
                                <p class="video-description">
                                    Concierto especial de Navidad con repertorio de música tradicional navideña.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    &lt;!-- Video 6 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="600" data-category="entrevistas">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Entrevista con Solista">
                                <div class="video-duration">12:45</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Entrevista con Solista Invitado</h3>
                                <p class="video-meta">
                                    <span class="video-date">5 de noviembre de 2022</span>
                                    <span class="video-views">645 vistas</span>
                                </p>
                                <p class="video-description">
                                    Conversación con el violinista invitado sobre su experiencia con nuestra orquesta.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    &lt;!-- Video 7 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="700" data-category="detras-camaras">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Ensayo General">
                                <div class="video-duration">18:30</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Ensayo General</h3>
                                <p class="video-meta">
                                    <span class="video-date">20 de octubre de 2022</span>
                                    <span class="video-views">789 vistas</span>
                                </p>
                                <p class="video-description">
                                    Ensayo general de la orquesta antes del concierto de temporada.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    &lt;!-- Video 8 -->
                    <div class="video-item animate-on-scroll" data-animation="fadeIn" data-delay="800" data-category="documentales">
                        <div class="video-card">
                            <div class="video-thumbnail" data-video-id="dQw4w9WgXcQ">
                                <img src="/placeholder.svg?height=400&width=600" alt="Historia de El Sistema">
                                <div class="video-duration">42:20</div>
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="video-info">
                                <h3>Historia de El Sistema en Venezuela</h3>
                                <p class="video-meta">
                                    <span class="video-date">10 de septiembre de 2022</span>
                                    <span class="video-views">1,567 vistas</span>
                                </p>
                                <p class="video-description">
                                    Documental sobre la historia y evolución de El Sistema en Venezuela.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                &lt;!-- Botón de cargar más -->
                <div class="load-more-container animate-on-scroll" data-animation="fadeIn">
                    <button id="load-more-btn" class="load-more-btn">
                        <span>CARGAR MÁS</span>
                        <i class="fas fa-spinner fa-spin" style="display: none;"></i>
                    </button>
                </div>
            </div>
        </section>
        
        &lt;!-- Modal para reproducir video -->
        <div id="video-modal" class="video-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="video-container">
                    <iframe id="video-frame" src="/placeholder.svg" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="modal-info">
                    <h3 id="modal-title"></h3>
                    <p id="modal-description"></p>
                </div>
            </div>
        </div>
    </main>

    &lt;!-- Pie de página -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-main">
                &lt;!-- Sección izquierda: Logo y descripción -->
                <div class="footer-app-section animate-on-scroll" data-animation="fadeIn">
                    <div class="footer-logo">
                        <figure class="logo-circle">
                            <svg viewBox="0 0 100 100" class="sistema-logo" aria-label="Logo de El Sistema">
                                <circle cx="50" cy="50" r="5" fill="#e70095"/>
                                <line x1="50" y1="50" x2="85" y2="30" stroke="#e70095" stroke-width="2"/>
                                <circle cx="85" cy="30" r="5" fill="#e70095"/>
                                <line x1="50" y1="50" x2="20" y2="20" stroke="#00addc" stroke-width="2"/>
                                <circle cx="20" cy="20" r="5" fill="#00addc"/>
                                <line x1="50" y1="50" x2="80" y2="70" stroke="#72d54a" stroke-width="2"/>
                                <circle cx="80" cy="70" r="5" fill="#72d54a"/>
                                <line x1="50" y1="50" x2="20" y2="80" stroke="#ff6b00" stroke-width="2"/>
                                <circle cx="20" cy="80" r="5" fill="#ff6b00"/>
                            </svg>
                        </figure>
                        <div class="logo-text">
                            <p class="bold">EL SISTEMA</p>
                            <p>Núcleo Ciudad Guayana</p>
                        </div>
                    </div>
                    <p class="footer-description">
                        Disfruta de los mejores conciertos de El Sistema Núcleo Ciudad Guayana en vivo o a través de nuestras transmisiones en línea.
                    </p>
                </div>

                &lt;!-- Sección central: Enlaces institucionales y online -->
                <div class="footer-links-section">
                    <div class="footer-links-column animate-on-scroll" data-animation="fadeIn" data-delay="200">
                        <h3>INSTITUCIÓN</h3>
                        <ul>
                            <li><a href="#acerca">Descubre El Sistema</a></li>
                            <li><a href="#musicos">La orquesta</a></li>
                            <li><a href="#historia">Nuestra historia</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-column animate-on-scroll" data-animation="fadeIn" data-delay="400">
                        <h3>ONLINE</h3>
                        <ul>
                            <li><a href="galeria-audiovisual.html">Galería audiovisual</a></li>
                            <li><a href="#archivo">Archivo de conciertos</a></li>
                            <li><a href="#recursos">Recursos musicales</a></li>
                        </ul>
                    </div>
                </div>

                &lt;!-- Sección derecha: "TÚ ERES..." -->
                <div class="footer-you-are-section animate-on-scroll" data-animation="fadeIn" data-delay="600">
                    <h3>TÚ ERES...</h3>
                    <div class="you-are-buttons">
                        <a href="#inscripciones" class="you-are-btn">Padre interesado</a>
                        <a href="#eventos" class="you-are-btn">Organizador de evento</a>
                        <a href="#patrocinios" class="you-are-btn">Patrocinador</a>
                    </div>
                </div>
            </div>

            &lt;!-- Sección de patrocinadores -->
            <div class="sponsors-section animate-on-scroll" data-animation="fadeInUp">
                <h3 class="sponsors-title">NUESTROS PATROCINADORES</h3>
                <div class="sponsors-logos">
                    <a href="#" class="sponsor-logo" aria-label="Patrocinador 1">
                        <img src="/placeholder.svg?height=60&width=120" alt="Logo Patrocinador 1">
                    </a>
                    <a href="#" class="sponsor-logo" aria-label="Patrocinador 2">
                        <img src="/placeholder.svg?height=60&width=120" alt="Logo Patrocinador 2">
                    </a>
                    <a href="#" class="sponsor-logo" aria-label="Patrocinador 3">
                        <img src="/placeholder.svg?height=60&width=120" alt="Logo Patrocinador 3">
                    </a>
                    <a href="#" class="sponsor-logo" aria-label="Patrocinador 4">
                        <img src="/placeholder.svg?height=60&width=120" alt="Logo Patrocinador 4">
                    </a>
                    <a href="#" class="sponsor-logo" aria-label="Patrocinador 5">
                        <img src="/placeholder.svg?height=60&width=120" alt="Logo Patrocinador 5">
                    </a>
                </div>
            </div>

            &lt;!-- Enlaces legales -->
            <div class="legal-links animate-on-scroll" data-animation="fadeIn">
                <a href="#">Términos y condiciones</a>
                <a href="#">Aviso legal</a>
                <a href="#">Política de privacidad</a>
                <a href="#">Prensa</a>
                <a href="#">Organiza un evento</a>
            </div>

            <div class="thank-you animate-on-scroll" data-animation="fadeInUp">
                <p>GRACIAS POR SU VISITA</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="galeria-videos.js"></script>
</body>
</html>
