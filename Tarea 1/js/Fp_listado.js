// Datos de avisos
const AVISOS = [
  { id: 1, fechaPublicacion: "2025-08-18 12:00", fechaEntrega: "2025-08-23 12:00", comuna: "Santiago",     sector: "Beauchef 850, terraza",  cantidadTipoEdad: "3 gatos 1 año",                 contactoNombre: "Javier Malhue", fotos: ["../Kitty_1.webp"] },
  { id: 2, fechaPublicacion: "2025-03-02 13:51", fechaEntrega: "2025-03-08 12:00", comuna: "Macul",        sector: "Condominio las flores",  cantidadTipoEdad: "1 perro 2 meses",               contactoNombre: "Nicolas Rey", fotos: ["../Puppy_1.jpg"] },
  { id: 3, fechaPublicacion: "2025-01-01 12:30", fechaEntrega: "2025-01-18 12:00", comuna: "Osorno",       sector: "Al lado del lago",       cantidadTipoEdad: "1 gato 1 años",                 contactoNombre: "Javiera Farias", fotos: ["../Kitty_2.jpg"] },
  { id: 4, fechaPublicacion: "2025-04-21 14:30", fechaEntrega: "2025-04-29 12:00", comuna: "Pucón",        sector: "Plaza central",          cantidadTipoEdad: "6 perros 2 meses",              contactoNombre: "Nicole Valenzuela", fotos: ["../Puppy_2.jpg"] },
  { id: 5, fechaPublicacion: "2025-07-01 11:30", fechaEntrega: "2025-07-06 12:00", comuna: "Viña del mar", sector: "Plaza vergara",          cantidadTipoEdad: "2 gatos 2 años y 3 meses",      contactoNombre: "Luis Ignacio", fotos: ["../Kitty_3.jpg"] }
];

// Selector corto
function query(sel){ return document.querySelector(sel); }

// Secciones y campos detalle
const listaSection   = query("#lista-section");
const detalleSection = query("#detalle-section");
const galeria        = query("#galeria");
const dFechaPub = query("#d-fecha-publicacion");
const dFechaEnt = query("#d-fecha-entrega");
const dComuna   = query("#d-comuna");
const dSector   = query("#d-sector");
const dCTE      = query("#d-cte");
const dContacto = query("#d-contacto");

// Modal
const modal        = query("#modal");
const modalImg     = query("#modal-img");
const modalCerrar  = query("#modal-cerrar");

// Navbar
document.getElementById("Pagina_principal_btn").addEventListener("click", () => {
  window.location.href = "../html/Fp_portada.html";
});
document.getElementById("Agregar_aviso_btn").addEventListener("click", () => {
  window.location.href = "../html/Fp_formulario.html";
});
document.getElementById("Ver_listado_btn").addEventListener("click", () => {
  window.scrollTo(0, 0);
});
document.getElementById("Estadisticas_btn").addEventListener("click", () => {
  window.location.href = "../html/Fp_estadisticas.html";
});

// Mostrar detalles al hacer click
document.querySelectorAll(".fila-aviso").forEach((tr) => {
  tr.addEventListener("click", () => {
    const id = Number(tr.dataset.id);
    const aviso = AVISOS.find(a => a.id === id);
    if(!aviso) return;

    dFechaPub.textContent = aviso.fechaPublicacion || "";
    dFechaEnt.textContent = aviso.fechaEntrega || "";
    dComuna.textContent   = aviso.comuna || "";
    dSector.textContent   = aviso.sector || "";
    dCTE.textContent      = aviso.cantidadTipoEdad || "";
    dContacto.textContent = aviso.contactoNombre || "";

    // Cargar galería
    galeria.innerHTML = "";
    (aviso.fotos || []).forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Foto";
      img.width = 320;
      img.height = 240;
      img.addEventListener("click", () => abrirModal(src));
      galeria.appendChild(img);
    });

    listaSection.hidden   = true;
    detalleSection.hidden = false;
    window.scrollTo(0, 0);
  });
});

// Botón volver al listado
document.getElementById("btn-volver-lista").addEventListener("click", () => {
  detalleSection.hidden = true;
  listaSection.hidden   = false;
  window.scrollTo(0, 0);
});

// Botón volver a portada
document.getElementById("btn-volver-portada").addEventListener("click", () => {
  window.location.href = "../html/Fp_portada.html";
});

// Abrir modal
function abrirModal(src){
  modalImg.src = src;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
}

// Cerrar modal
function cerrarModal(){
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  modalImg.removeAttribute("src");
}

// Cerrar al hacer click en la x
modalCerrar.addEventListener("click", cerrarModal);
