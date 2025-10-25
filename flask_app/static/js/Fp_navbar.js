
document.addEventListener("DOMContentLoaded", () => {
  const nav = {
    principal: document.getElementById("Pagina_principal_btn"),
    agregar: document.getElementById("Agregar_aviso_btn"),
    listado: document.getElementById("Ver_listado_btn"),
    estadisticas: document.getElementById("Estadisticas_btn"),
  };

  if (nav.principal)
    nav.principal.addEventListener("click", () => (window.location.href = "/"));
  if (nav.agregar)
    nav.agregar.addEventListener("click", () => (window.location.href = "/form"));
  if (nav.listado)
    nav.listado.addEventListener("click", () => (window.location.href = "/listado"));
  if (nav.estadisticas)
    nav.estadisticas.addEventListener("click", () => (window.location.href = "/estadisticas"));
});
