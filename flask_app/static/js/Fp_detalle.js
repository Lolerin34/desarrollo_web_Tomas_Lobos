document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-comentarios");
  const form = document.getElementById("form-comentario");
  const nombre = document.getElementById("nombre-com");
  const texto = document.getElementById("texto-com");

  // Cargar comentarios
  async function cargarComentarios() {
    try {
      const resp = await fetch(`/api/comentarios/${window.__AVISO_ID__}`);
      if (!resp.ok) throw new Error("Error al obtener comentarios");
      const data = await resp.json();

      if (data.length === 0) {
        lista.innerHTML = "<p>No hay comentarios aún.</p>";
        return;
      }

      lista.innerHTML = "";
      data.forEach(c => {
        const div = document.createElement("div");
        div.className = "comentario";
        div.innerHTML = `
          <p><b>${c.nombre}</b> <span class="fecha">(${c.fecha})</span></p>
          <p>${c.texto}</p>
        `;
        lista.appendChild(div);
      });
    } catch (err) {
      console.error(err);
      lista.innerHTML = "<p>Error al cargar comentarios.</p>";
    }
  }

  // Enviar nuevo comentario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombreVal = nombre.value.trim();
    const textoVal = texto.value.trim();

    if (nombreVal.length < 3 || nombreVal.length > 80) {
      alert("El nombre debe tener entre 3 y 80 caracteres.");
      return;
    }

    if (textoVal.length < 5 || textoVal.length > 300) {
      alert("El comentario debe tener entre 5 y 300 caracteres.");
      return;
    }

    const resp = await fetch(`/api/comentarios/${window.__AVISO_ID__}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreVal, texto: textoVal }),
    });

    if (resp.ok) {
      nombre.value = "";
      texto.value = "";
      cargarComentarios();
    } else {
      const data = await resp.json();
      alert(data.errores ? data.errores.join(", ") : "Error al enviar comentario");
    }
  });

  cargarComentarios();
});
