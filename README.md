# El Contribuyente — Design System

Prototipo de diseno frontend para el portal mexicano de noticias fiscales **El Contribuyente** (elcontribuyente.mx).

## Vista previa

El proyecto puede abrirse directamente en el navegador sin necesidad de servidor local.

## Estructura del proyecto

```
elcontribuyente-design/
├── index.html              # Home
├── articulo.html           # Vista de articulo individual
├── categoria.html          # Vista de categoria
├── busqueda.html           # Resultados de busqueda
├── autor.html              # Perfil de autor
├── cursos.html             # Landing de cursos
├── calculadoras.html       # Landing de calculadoras fiscales
├── calculadora-iva.html    # Calculadora de IVA
├── componentes.html        # Showcase de componentes
├── css/
│   ├── tokens.css          # Variables CSS (colores, tipografia, espaciado)
│   ├── base.css            # Reset, tipografia base, utilidades
│   ├── components.css      # Componentes globales
│   └── pages/
│       ├── home.css
│       ├── articulo.css
│       ├── categoria.css
│       ├── busqueda.css
│       ├── autor.css
│       ├── cursos.css
│       └── calculadoras.css
├── js/
│   ├── main.js             # Interacciones minimas
│   └── calculadoras.js     # Logica de calculadoras fiscales
├── assets/
│   └── logo-contribuyente.png
├── netlify.toml            # Configuracion de Netlify
└── README.md
```

## Sistema de diseno

### Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#fba61a` | Amber, color de marca |
| `--color-primary-dark` | `#d4880a` | Hover states |
| `--color-secondary` | `#1a2744` | Navy, color secundario |
| `--color-text` | `#1e1c18` | Texto principal |
| `--color-text-muted` | `#6b6458` | Texto secundario |
| `--color-bg` | `#faf9f6` | Fondo principal |

### Categorias (Badges)

| Categoria | Color |
|-----------|-------|
| SAT | `#fba61a` |
| Opinion | `#1a2744` |
| Empresas | `#1e6e5e` |
| General | `#5b2c6f` |
| Gobierno | `#8b3a1a` |
| Impuestos | `#1a4a7a` |

### Tipografias

- **Headlines:** Playfair Display (serif)
- **Body:** DM Sans (sans-serif)

### Escala tipografica

| Token | Valor |
|-------|-------|
| `--text-xs` | 11px |
| `--text-sm` | 13px |
| `--text-base` | 15px |
| `--text-lg` | 17px |
| `--text-xl` | 20px |
| `--text-2xl` | 24px |
| `--text-3xl` | 32px |
| `--text-4xl` | 38px |

### Breakpoints

| Nombre | Valor |
|--------|-------|
| Tablet | 768px |
| Mobile | 480px |

## Componentes

- **Topbar:** Ticker de tipo de cambio y fecha
- **Navbar:** Logo, navegacion, buscador, CTA
- **Footer:** Logo, descripcion, links, redes sociales
- **News Card:** Tarjeta de noticia con imagen, badge, titulo, extracto
- **Course Card:** Tarjeta de curso con precio e instructor
- **Badge:** Etiquetas de categoria con colores
- **Sidebar:** Anuncios, noticias relacionadas, newsletter
- **Breadcrumb:** Navegacion de ruta
- **Pagination:** Navegacion de paginas
- **Newsletter:** Formulario de suscripcion
- **Author Bio:** Tarjeta de autor

## Tecnologias

- HTML5 semantico
- CSS vanilla con variables CSS
- JavaScript vanilla (sin dependencias)
- Google Fonts (Playfair Display, DM Sans)

## Despliegue en Netlify

### Opcion 1: Desde GitHub

1. Crea un repositorio en GitHub:
   ```bash
   cd elcontribuyente-design
   git init
   git add .
   git commit -m "Initial commit: El Contribuyente design system"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/elcontribuyente-design.git
   git push -u origin main
   ```

2. Ve a [Netlify](https://app.netlify.com)
3. Click en "Add new site" > "Import an existing project"
4. Conecta tu cuenta de GitHub
5. Selecciona el repositorio `elcontribuyente-design`
6. Configuracion de build:
   - Build command: (dejar vacio)
   - Publish directory: `.`
7. Click en "Deploy site"

### Opcion 2: Drag & Drop

1. Ve a [Netlify Drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `elcontribuyente-design` al navegador
3. Tu sitio estara disponible en segundos

## Desarrollo local

Simplemente abre `index.html` en tu navegador. No requiere servidor local ni dependencias.

Para un servidor local con recarga automatica (opcional):
```bash
npx serve .
```

## Licencia

Proyecto de diseno para El Contribuyente. Todos los derechos reservados.
