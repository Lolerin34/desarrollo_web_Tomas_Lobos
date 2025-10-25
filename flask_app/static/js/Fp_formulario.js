// Cargar comunas según región
document.getElementById("region").addEventListener("change", async (e) => {
  const idRegion = e.target.value;
  const comunaSelect = document.getElementById("comuna");
  comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
  comunaSelect.disabled = true;

  if (!idRegion) return;

  const resp = await fetch(`/get-comunas/${idRegion}`);
  const comunas = await resp.json();
  comunas.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nombre;
    comunaSelect.appendChild(opt);
  });
  comunaSelect.disabled = false;
});

// Manejo de campos de contacto
document.querySelectorAll(".contact-method input[type=checkbox]").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const textInput = checkbox.parentElement.querySelector(".contact-id");
    textInput.hidden = !checkbox.checked;
    if (!checkbox.checked) {
      textInput.value = "";
    }
  });
});
