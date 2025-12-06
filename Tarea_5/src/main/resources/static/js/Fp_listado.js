document.addEventListener("DOMContentLoaded", () => {
  const filas = document.querySelectorAll(".fila-aviso");

  // Redirige al detalle del aviso
  filas.forEach(fila => {
    fila.addEventListener("click", () => {
      const id = fila.dataset.id;
      window.location.href = `/detalle/${id}`;
    });
  });
});
