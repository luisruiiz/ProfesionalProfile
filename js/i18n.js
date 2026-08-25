const translations = {
  es: {
    nav: { home: "Inicio", about: "Sobre mí", skills: "Habilidades", projects: "Proyectos", contact: "Contacto" },
    hero: {
      greeting: "Hola, soy",
      tagline: "Construyo aplicaciones web y de escritorio robustas, desde el backend hasta el análisis de datos.",
      ctaProjects: "Ver proyectos",
      ctaContact: "Contactarme",
      roles: ["Ingeniero en Desarrollo de Software", "Desarrollador Python", "Backend con Django & Flask", "Analista de Datos con Power BI"],
      tab: "registro",
      stackLabel: "stack",
      statusLabel: "estado"
    },
    about: {
      tag: "Sobre mí",
      title: "Un poco de mi historia",
      p1: "Soy Ingeniero en Desarrollo y Gestión de Software, apasionado por construir soluciones funcionales y eficientes. Disfruto trabajar tanto en el backend con Python (Django y Flask) como en la creación de interfaces claras y usables.",
      p2: "Tengo experiencia con bases de datos relacionales (PostgreSQL, MySQL, SQLite), análisis y visualización de datos con Power BI, y desarrollo bajo entornos Linux. Me gusta aprender tecnologías nuevas y aplicar buenas prácticas en cada proyecto.",
      fact1: "Ing. en Desarrollo y Gestión de Software",
      fact2: "Backend, bases de datos y análisis de datos",
      fact3: "Disponible para nuevas oportunidades",
      cta: "Hablemos"
    },
    skills: {
      tag: "Habilidades",
      title: "Tecnologías con las que trabajo",
      alsoWith: "También trabajo con:"
    },
    projects: {
      tag: "Proyectos",
      title: "Trabajo reciente en GitHub",
      subtitle: "Cargado en vivo desde mi perfil de GitHub.",
      viewAll: "Ver todos en GitHub",
      loading: "Cargando repositorios...",
      error: "No se pudieron cargar los repositorios en este momento.",
      empty: "Aún no hay repositorios públicos para mostrar.",
      noDesc: "Sin descripción disponible.",
      viewRepo: "Ver repositorio"
    },
    contact: {
      tag: "Contacto",
      title: "Hablemos de tu próximo proyecto",
      subtitle: "Escríbeme directamente o usa el formulario y te responderé lo antes posible.",
      emailLabel: "Correo",
      linkedinLabel: "Conectemos",
      githubLabel: "Revisa mi código",
      form: {
        name: "Nombre",
        email: "Correo electrónico",
        message: "Mensaje",
        send: "Enviar mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado! Te responderé pronto.",
        error: "Algo salió mal. Intenta escribirme directamente por correo."
      }
    },
    footer: { rights: "Todos los derechos reservados." }
  },
  en: {
    nav: { home: "Home", about: "About", skills: "Skills", projects: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hi, I'm",
      tagline: "I build robust web and desktop applications, from backend logic to data analysis.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
      roles: ["Software Development Engineer", "Python Developer", "Backend with Django & Flask", "Data Analyst with Power BI"],
      tab: "record",
      stackLabel: "stack",
      statusLabel: "status"
    },
    about: {
      tag: "About me",
      title: "A bit of my story",
      p1: "I'm a Software Development & Management Engineer, passionate about building functional and efficient solutions. I enjoy working on the backend with Python (Django and Flask) as well as creating clear, usable interfaces.",
      p2: "I have experience with relational databases (PostgreSQL, MySQL, SQLite), data analysis and visualization with Power BI, and development on Linux environments. I love learning new technologies and applying best practices in every project.",
      fact1: "Software Development & Management Engineer",
      fact2: "Backend, databases and data analysis",
      fact3: "Open to new opportunities",
      cta: "Let's talk"
    },
    skills: {
      tag: "Skills",
      title: "Technologies I work with",
      alsoWith: "Also working with:"
    },
    projects: {
      tag: "Projects",
      title: "Recent work on GitHub",
      subtitle: "Loaded live from my GitHub profile.",
      viewAll: "View all on GitHub",
      loading: "Loading repositories...",
      error: "Couldn't load repositories right now.",
      empty: "No public repositories to show yet.",
      noDesc: "No description available.",
      viewRepo: "View repository"
    },
    contact: {
      tag: "Contact",
      title: "Let's talk about your next project",
      subtitle: "Reach out directly or use the form below and I'll get back to you as soon as possible.",
      emailLabel: "Email",
      linkedinLabel: "Let's connect",
      githubLabel: "Check my code",
      form: {
        name: "Name",
        email: "Email address",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
        success: "Message sent! I'll get back to you soon.",
        error: "Something went wrong. Try emailing me directly instead."
      }
    },
    footer: { rights: "All rights reserved." }
  }
};

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : null, obj);
}

let currentLang = localStorage.getItem('lang') || 'es';

function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNested(translations[lang], key);
    if (value) el.textContent = value;
  });

  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-option') === lang);
  });

  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function setLanguage(lang) {
  if (lang !== 'es' && lang !== 'en') return;
  applyTranslations(lang);
}

function t(key) {
  return getNested(translations[currentLang], key);
}
