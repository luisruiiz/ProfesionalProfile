# Portfolio — Luis Humberto Ruiz Escobar

Sitio personal estático (HTML/CSS/JS puro, sin build step).

## Ver localmente

```
python -m http.server 5500
```

Abre `http://localhost:5500` en el navegador. (No abras `index.html` con doble clic: `fetch` a la API de GitHub falla bajo `file://`.)

## Pendiente antes de publicar

- ~~**Formulario de contacto**~~: listo, usa el endpoint `https://formspree.io/f/xqpkzell` (cuenta ligada a `luishumbertoruizescobar802@gmail.com`).
- **LinkedIn**: verifica que la URL usada (`linkedin.com/in/luis-humberto-ruiz-escobar`) coincide con tu perfil real; si tu slug es distinto, actualízalo en `index.html` (aparece 2 veces).
- **Foto**: hay un placeholder con tus iniciales "LR". Si quieres una foto real, reemplaza el bloque `.avatar-placeholder` en `index.html` por `<img src="assets/foto.jpg" alt="...">` y coloca la imagen en `assets/`.
- **Proyectos**: se cargan en vivo desde tu GitHub (`luisruiiz`) — no requiere configuración, pero si prefieres proyectos curados a mano en vez de "todos los repos ordenados por estrellas", dímelo y cambio la lógica en `js/github.js`.

## Publicar gratis

Cualquiera de estas opciones sirve sin backend:
- **GitHub Pages**: sube esta carpeta a un repo y activa Pages.
- **Netlify / Vercel**: arrastra la carpeta o conecta el repo.
