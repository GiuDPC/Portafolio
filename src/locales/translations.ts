export type Language = 'es' | 'en';

export const translations = {
  es: {
    navbar: {
      tech: 'Tecnologías',
      projects: 'Proyectos',
      education: 'Educación',
    },
    hero: {
      title: 'Full Stack Developer',
      github: 'Github',
      linkedin: 'LinkedIn',
      email: 'Email',
      copied: '¡Copiado!',
      emailCopied: '¡Email copiado!',
      downloadCV: 'Descargar CV',
      description1: 'Ingeniero de Sistemas especializado en <span class="tech-yellow">Full Stack Development</span> y <span class="tech-green">Arquitectura de Software</span>. Construyo sistemas robustos enfocados en rendimiento y escalabilidad, con fuertes habilidades en el desarrollo web integral.',
      description2: 'Mi stack principal incluye <span class="tech-blue">TypeScript</span>, <span class="tech-yellow">JavaScript</span>, <span class="tech-purple">Node.js</span>, <span class="tech-green">PostgreSQL</span> y <span class="tech-cyan">SQL</span>.'
    },
    techStack: {
      title: 'Tecnologías',
    },
    projects: {
      title: 'Proyectos Destacados',
      readTime: 'min lectura',
      viewProject: 'Ver proyecto',
      code: 'Código',
      demo: 'Demo',
      toc: 'Tabla de Contenidos',
      back: 'Volver',
      items: {
        brincapark: {
          subtitle: 'Sistema integral de gestión de reservas para parques de diversiones',
          sections: {
            s1Title: 'El Problema de Gestión',
            s1P1: 'Brincapark partió de la necesidad de digitalizar los procesos manuales de un parque de atracciones, donde las reservas, los ingresos y la operación diaria dependían de múltiples pasos y registros dispersos.',
            s1P2: 'El resultado era una alta probabilidad de errores operativos, duplicidad de reservas y una visibilidad limitada para la toma de decisiones del equipo administrativo.',
            s2Title: 'La Solución: Reservas y Operación Centralizada',
            s2P1: 'Desarrollé una plataforma full stack que permite a los usuarios reservar tickets y paquetes de fiestas de forma sencilla, mientras que los administradores pueden gestionar reservas, visualizar métricas en tiempo real y controlar la operación desde un panel integral.',
            s2L1: '<strong>Reservas públicas:</strong> flujo claro para compra y confirmación de entradas.',
            s2L2: '<strong>Dashboard administrativo:</strong> métricas, gráficos y control de reservas desde un único lugar.',
            s2L3: '<strong>Gestión multi-parque:</strong> soporte para diferentes sedes y configuraciones operativas.',
            s3Title: 'Arquitectura y Stack',
            s3P1: 'El proyecto fue construido con una arquitectura full stack moderna, separando frontend y backend para facilitar mantenimiento, despliegue y escalabilidad.',
            s3P2: 'El frontend se despliega en Vercel, el backend en Render y la base de datos se gestiona con MongoDB Atlas, ofreciendo una solución completa y lista para producción.'
          }
        },
        graphCore: {
          subtitle: 'Entorno Virtual de Aprendizaje Interactivo para Teoría de Grafos',
          sections: {
            s1Title: 'Contexto Educativo',
            s1P1: 'Dentro de la Ingeniería de Sistemas, la <strong>Teoría de Grafos</strong> representa una de las áreas fundamentales de la Matemática Discreta, con aplicaciones críticas en telecomunicaciones, diseño de algoritmos e inteligencia artificial. Sin embargo, su aprendizaje presenta dificultades notables debido al alto nivel de abstracción requerido para comprender estructuras topológicas y rutinas matemáticas complejas.',
            s2Title: 'El Entorno Virtual: GraphCore',
            s2P1: 'Para superar esta barrera académica, desarrollé <strong>GraphCore</strong>, un Entorno Virtual de Aprendizaje (EVA) diseñado como un laboratorio interactivo. Esta herramienta permite a los estudiantes de ingeniería interactuar directamente con representaciones gráficas, simulaciones dinámicas y experimentación práctica.',
            s2P2: 'El sistema se divide en dos módulos de aprendizaje fundamentales:',
            s2L1: '<strong>Laboratorio Matemático Libre:</strong> Un espacio interactivo destinado a la creación y edición de grafos, facilitando la exploración visual de sus propiedades (ciclos, componentes conexas, caminos).',
            s2L2: '<strong>Simulación de Redes de Transporte:</strong> Un entorno donde se analiza visualmente el comportamiento de distintos algoritmos clásicos operando sobre estructuras de conexión en tiempo real.',
            s3Title: 'Tecnología de Alto Rendimiento',
            s3P1: 'A diferencia de las herramientas educativas basadas en tecnologías web tradicionales, GraphCore fue construido desde cero utilizando <strong>C++17</strong> moderno y <strong>OpenGL</strong>.',
            s3P2: 'Esta decisión arquitectónica de utilizar renderizado acelerado por hardware garantiza que el entorno gráfico pueda manejar simulaciones masivas (como distribuciones orgánicas basadas en algoritmos de atracción/repulsión) a 60 cuadros por segundo sin interrupciones, ofreciendo una retroalimentación visual inmediata y fluida durante el proceso de aprendizaje.'
          }
        },
        sentinelCore: {
          subtitle: 'Sistema de Gestión de Incidencias y Monitoreo de ANS (SLA)',
          sections: {
            s1Title: 'El Problema Operativo',
            s1P1: 'En infraestructuras comerciales de gran escala, como el <strong>Centro Comercial Sambil Paraguaná</strong>, la gestión operativa suele verse fragmentada por la dependencia de canales de comunicación informales (como WhatsApp) y registros manuales en papel.',
            s1P2: 'Esta desconexión genera "silos de información" donde se pierde por completo la trazabilidad de las tareas. Sin un registro auditable, resulta técnicamente inviable monitorear el desempeño operativo, medir tiempos de respuesta o garantizar la correcta asignación de técnicos a las fallas reportadas.',
            s2Title: 'La Solución: Sentinel Core',
            s2P1: 'Para resolver esta problemática, diseñé y desarrollé <strong>Sentinel Core</strong>: un sistema centralizado de gestión de incidencias que sustituye la informalidad por un flujo de trabajo estructurado y completamente auditable.',
            s2L1: '<strong>Trazabilidad Absoluta:</strong> Cada incidencia reportada genera un ticket único, registrando de manera objetiva quién, cómo y cuándo se resolvió el problema.',
            s2L2: '<strong>Monitoreo de ANS (Acuerdos de Nivel de Servicio):</strong> El sistema estructura parámetros lógicos para medir y evaluar los tiempos de atención, garantizando que se cumplan los estándares operativos del centro comercial.',
            s2L3: '<strong>Dashboard Gerencial:</strong> Una interfaz analítica en tiempo real que visibiliza la carga de trabajo, tickets abiertos y métricas de desempeño, facilitando la toma de decisiones informadas.',
            s3Title: 'Arquitectura y Desarrollo',
            s3P1: 'Sentinel Core está construido sobre una arquitectura moderna que prioriza la automatización y la persistencia segura de la información.',
            s3P2: 'El frontend, desarrollado con <strong>React</strong> y estandarizado visualmente con <strong>Tailwind CSS</strong>, ofrece una experiencia de usuario fluida e intuitiva tanto para el personal técnico como administrativo. En el backend, la lógica de negocio y la API están fuertemente tipadas con <strong>TypeScript</strong> y conectadas a una base de datos relacional <strong>PostgreSQL</strong>, asegurando la integridad referencial y la rápida consulta de datos históricos para auditorías.'
          }
        },
        tasaVerde: {
          subtitle: 'App para monitorear y comparar tasas de cambio en Venezuela con enfoque móvil y offline',
          sections: {
            s1Title: 'El Problema del Cambio',
            s1P1: 'En Venezuela, seguir las tasas de cambio de forma clara y rápida es clave ante la volatilidad constante del mercado. La información suele estar dispersa entre fuentes oficiales y plataformas P2P, lo que complica la comparación en tiempo real.',
            s1P2: 'Esto genera incertidumbre para quienes necesitan tomar decisiones rápidas, ya sea para ahorrar, comparar opciones o tener una referencia confiable del valor del dólar y el euro.',
            s2Title: 'La Solución: TasaVerde',
            s2P1: 'Desarrollé <strong>TasaVerde</strong> como una app que centraliza la información de la tasa BCV y Binance P2P en un solo lugar, ayudando al usuario a identificar la mejor opción con una experiencia simple, visual y funcional.',
            s2L1: '<strong>Dashboard en tiempo real:</strong> tasas actualizadas, diferencia porcentual y última sincronización.',
            s2L2: '<strong>Calculadora de conversión:</strong> conversión bidireccional USD/Bs con formato venezolano y copiado rápido.',
            s2L3: '<strong>Historial y modo offline:</strong> persistencia de datos y acceso a la última información cuando no hay conexión.',
            s3Title: 'Arquitectura y Desarrollo',
            s3P1: 'TasaVerde fue construida con <strong>React Native</strong> y <strong>Expo</strong> para ofrecer una experiencia móvil cercana a lo nativo, con una interfaz cuidada y una arquitectura modular orientada a rendimiento y mantenibilidad.',
            s3P2: 'En el backend se integra un servicio de obtención de datos en tiempo real, mientras que la persistencia y la caché permiten usar la app de forma útil incluso sin conexión.'
          }
        }
      }
    },
    education: {
      title: 'Educación',
      university: 'UNEFA — Universidad Nacional Experimental Politécnica de la Fuerza Armada',
      degree: 'Ingeniería de Sistemas',
      date: '2023 — Actualidad (6to Semestre)',
      desc1: 'Formación en <span class="tech-blue">algoritmos y estructuras de datos</span>, <span class="tech-green">bases de datos relacionales y NoSQL</span>, <span class="tech-purple">ingeniería de software</span> y <span class="tech-orange">redes de computadoras</span>.',
      desc2: 'Desarrollo de proyectos académicos aplicando <span class="tech-cyan">patrones de diseño</span>, <span class="tech-cyan">arquitectura limpia</span> y buenas prácticas de desarrollo con <span class="tech-blue">TypeScript</span>, <span class="tech-orange">C++</span>, <span class="tech-green">PostgreSQL</span> y <span class="tech-purple">React</span>.'
    },
    footer: {
      github: 'Github'
    }
  },
  en: {
    navbar: {
      tech: 'Tech Stack',
      projects: 'Projects',
      education: 'Education',
    },
    hero: {
      title: 'Full Stack Developer',
      github: 'Github',
      linkedin: 'LinkedIn',
      email: 'Email',
      copied: 'Copied!',
      emailCopied: 'Email copied!',
      downloadCV: 'Download CV',
      description1: 'Systems Engineer specialized in <span class="tech-yellow">Full Stack Development</span> and <span class="tech-green">Software Architecture</span>. I build robust systems focused on performance and scalability, with strong skills in comprehensive web development.',
      description2: 'My main stack includes <span class="tech-blue">TypeScript</span>, <span class="tech-yellow">JavaScript</span>, <span class="tech-purple">Node.js</span>, <span class="tech-green">PostgreSQL</span> and <span class="tech-cyan">SQL</span>.'
    },
    techStack: {
      title: 'Tech Stack',
    },
    projects: {
      title: 'Featured Projects',
      readTime: 'min read',
      viewProject: 'View project',
      code: 'Code',
      demo: 'Demo',
      toc: 'Table of Contents',
      back: 'Back',
      items: {
        brincapark: {
          subtitle: 'Comprehensive reservation management system for amusement parks',
          sections: {
            s1Title: 'The Management Problem',
            s1P1: 'Brincapark started from the need to digitize the manual processes of an amusement park, where reservations, admissions, and daily operations relied on multiple steps and scattered records.',
            s1P2: 'The result was a high probability of operational errors, duplicate reservations, and limited visibility for the administrative team\'s decision-making.',
            s2Title: 'The Solution: Centralized Operations and Reservations',
            s2P1: 'I developed a full-stack platform that allows users to easily book tickets and party packages, while administrators can manage reservations, view real-time metrics, and control operations from a comprehensive dashboard.',
            s2L1: '<strong>Public reservations:</strong> clear flow for ticket purchase and confirmation.',
            s2L2: '<strong>Administrative Dashboard:</strong> metrics, charts, and reservation control from a single place.',
            s2L3: '<strong>Multi-park management:</strong> support for different locations and operational configurations.',
            s3Title: 'Architecture and Stack',
            s3P1: 'The project was built with a modern full-stack architecture, separating frontend and backend to facilitate maintenance, deployment, and scalability.',
            s3P2: 'The frontend is deployed on Vercel, the backend on Render, and the database is managed with MongoDB Atlas, offering a complete, production-ready solution.'
          }
        },
        graphCore: {
          subtitle: 'Interactive Virtual Learning Environment for Graph Theory',
          sections: {
            s1Title: 'Educational Context',
            s1P1: 'Within Systems Engineering, <strong>Graph Theory</strong> represents one of the fundamental areas of Discrete Mathematics, with critical applications in telecommunications, algorithm design, and artificial intelligence. However, learning it presents notable difficulties due to the high level of abstraction required to understand topological structures and complex mathematical routines.',
            s2Title: 'The Virtual Environment: GraphCore',
            s2P1: 'To overcome this academic barrier, I developed <strong>GraphCore</strong>, a Virtual Learning Environment (VLE) designed as an interactive laboratory. This tool allows engineering students to interact directly with graphical representations, dynamic simulations, and practical experimentation.',
            s2P2: 'The system is divided into two fundamental learning modules:',
            s2L1: '<strong>Free Mathematical Laboratory:</strong> An interactive space for creating and editing graphs, facilitating visual exploration of their properties (cycles, connected components, paths).',
            s2L2: '<strong>Transport Network Simulation:</strong> An environment where the behavior of various classic algorithms operating on connection structures is visually analyzed in real time.',
            s3Title: 'High-Performance Technology',
            s3P1: 'Unlike educational tools based on traditional web technologies, GraphCore was built from scratch using modern <strong>C++17</strong> and <strong>OpenGL</strong>.',
            s3P2: 'This architectural decision to use hardware-accelerated rendering ensures that the graphical environment can handle massive simulations (such as organic layouts based on attraction/repulsion algorithms) at 60 frames per second without interruptions, offering immediate and fluid visual feedback during the learning process.'
          }
        },
        sentinelCore: {
          subtitle: 'Incident Management and SLA Monitoring System',
          sections: {
            s1Title: 'The Operational Problem',
            s1P1: 'In large-scale commercial infrastructures, such as the <strong>Sambil Paraguaná Mall</strong>, operational management is often fragmented by reliance on informal communication channels (like WhatsApp) and manual paper records.',
            s1P2: 'This disconnection creates "information silos" where the traceability of tasks is completely lost. Without an auditable record, it becomes technically unfeasible to monitor operational performance, measure response times, or ensure the correct assignment of technicians to reported failures.',
            s2Title: 'The Solution: Sentinel Core',
            s2P1: 'To solve this problem, I designed and developed <strong>Sentinel Core</strong>: a centralized incident management system that replaces informality with a structured and fully auditable workflow.',
            s2L1: '<strong>Absolute Traceability:</strong> Each reported incident generates a unique ticket, objectively recording who, how, and when the problem was resolved.',
            s2L2: '<strong>SLA (Service Level Agreement) Monitoring:</strong> The system structures logical parameters to measure and evaluate response times, ensuring that the mall\'s operational standards are met.',
            s2L3: '<strong>Managerial Dashboard:</strong> A real-time analytical interface that makes workload, open tickets, and performance metrics visible, facilitating informed decision-making.',
            s3Title: 'Architecture and Development',
            s3P1: 'Sentinel Core is built on a modern architecture that prioritizes automation and secure information persistence.',
            s3P2: 'The frontend, developed with <strong>React</strong> and visually standardized with <strong>Tailwind CSS</strong>, offers a fluid and intuitive user experience for both technical and administrative staff. On the backend, the business logic and API are strongly typed with <strong>TypeScript</strong> and connected to a <strong>PostgreSQL</strong> relational database, ensuring referential integrity and fast historical data querying for audits.'
          }
        },
        tasaVerde: {
          subtitle: 'App to monitor and compare exchange rates in Venezuela with a mobile and offline focus',
          sections: {
            s1Title: 'The Exchange Problem',
            s1P1: 'In Venezuela, following exchange rates clearly and quickly is key in the face of constant market volatility. Information is often scattered between official sources and P2P platforms, complicating real-time comparison.',
            s1P2: 'This generates uncertainty for those who need to make quick decisions, whether to save, compare options, or have a reliable reference for the value of the dollar and euro.',
            s2Title: 'The Solution: TasaVerde',
            s2P1: 'I developed <strong>TasaVerde</strong> as an app that centralizes BCV and Binance P2P rate information in one place, helping users identify the best option with a simple, visual, and functional experience.',
            s2L1: '<strong>Real-time Dashboard:</strong> updated rates, percentage difference, and last synchronization.',
            s2L2: '<strong>Conversion Calculator:</strong> two-way USD/Bs conversion with Venezuelan formatting and quick copy.',
            s2L3: '<strong>History and Offline Mode:</strong> data persistence and access to the latest information when there is no connection.',
            s3Title: 'Architecture and Development',
            s3P1: 'TasaVerde was built with <strong>React Native</strong> and <strong>Expo</strong> to offer a near-native mobile experience, with a carefully designed interface and a modular architecture geared towards performance and maintainability.',
            s3P2: 'The backend integrates a real-time data fetching service, while persistence and caching allow the app to be useful even offline.'
          }
        }
      }
    },
    education: {
      title: 'Education',
      university: 'UNEFA — National Experimental Polytechnic University of the Armed Forces',
      degree: 'Systems Engineering',
      date: '2023 — Present (6th Semester)',
      desc1: 'Training in <span class="tech-blue">algorithms and data structures</span>, <span class="tech-green">relational and NoSQL databases</span>, <span class="tech-purple">software engineering</span>, and <span class="tech-orange">computer networks</span>.',
      desc2: 'Development of academic projects applying <span class="tech-cyan">design patterns</span>, <span class="tech-cyan">clean architecture</span>, and good development practices with <span class="tech-blue">TypeScript</span>, <span class="tech-orange">C++</span>, <span class="tech-green">PostgreSQL</span>, and <span class="tech-purple">React</span>.'
    },
    footer: {
      github: 'Github'
    }
  }
};
