// Validadores de inputs y manejo general del formulario
const validateEmail = (email) => {
  if (!email) return false;
  let lengthValid = email.length > 15;
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);
  return lengthValid && formatValid;
};

const validateName = (name) => {
  if (!name) return false;
  return name.trim().length >= 4;
};

const validateNumero = (numero) => {
  if (!numero) return false;
  let re = /^\+\d{3}\.\d{8,9}$/;
  return re.test(numero);
};

const validateSector = (sector) => {
  if (!sector) return true;
  return sector.trim().length <= 100;
};

const validateCantidad = (cantidad) => {
  let numero = Number(cantidad);
  return Number.isInteger(numero) && numero >= 1;
};

const validateEdad = (edad) => {
  let numero = Number(edad);
  return Number.isInteger(numero) && numero >= 1;
};

const validateSelect = (select) => {
  if (!select) return false;
  return true;
};

const validateFiles = (files) => {
  if (!files) return false;
  let lengthValid = 1 <= files.length && files.length <= 5;
  let typeValid = true;
  for (const file of files) {
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }
  return lengthValid && typeValid;
};

const validateDate = (dateValue) => {
  if (!dateValue) return false;
  const selected = new Date(dateValue);
  const min = new Date(Date.now() + 3 * 60 * 60 * 1000);
  return selected >= min;
};

// Mostrar/ocultar inputs de contacto y limitar a 5 seleccionados
document.addEventListener("change", (e) => {
  if (e.target.matches(".contact-method input[type=checkbox]")) {
    const textBox = e.target.parentElement.querySelector(".contact-id");
    if (textBox) textBox.hidden = !e.target.checked;
    if (e.target.checked) {
      const totalMarcados = document.querySelectorAll(".contact-method input[type=checkbox]:checked").length;
      if (totalMarcados > 5) {
        e.target.checked = false;
        if (textBox) textBox.hidden = true;
        alert("Solo puede seleccionar hasta 5 medios de contacto.");
      }
    }
  }
});

// Relación región → comunas
const comunasPorRegion = {
  "arica-parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
  "tarapaca": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
  "antofagasta": ["Antofagasta", "Calama", "Taltal"],
  "atacama": ["Copiapó", "Caldera", "Vallenar"],
  "coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
  "valparaiso": ["Valparaíso", "Viña del Mar", "Quilpué", "Quillota"],
  "metropolitana": ["Santiago", "Ñuñoa", "Providencia", "Puente Alto", "Maipú"],
  "ohiggins": ["Rancagua", "Machalí", "San Fernando"],
  "maule": ["Talca", "Curicó", "Linares"],
  "nuble": ["Chillán", "San Carlos", "Coihueco"],
  "biobio": ["Concepción", "Talcahuano", "Los Ángeles"],
  "araucania": ["Temuco", "Padre Las Casas", "Villarrica"],
  "los-rios": ["Valdivia", "La Unión", "Río Bueno"],
  "los-lagos": ["Puerto Montt", "Osorno", "Castro"],
  "aysen": ["Coyhaique", "Aysén", "Chile Chico"],
  "magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

const regionElement = document.getElementById("region");
const comunaElement = document.getElementById("comuna");

regionElement.addEventListener("change", () => {
  comunaElement.innerHTML = '<option value="">Seleccione una comuna</option>';
  (comunasPorRegion[regionElement.value] || []).forEach(c => {
    comunaElement.innerHTML += `<option value="${c}">${c}</option>`;
  });
  comunaElement.disabled = false;
});

// Manejo dinámico de inputs de fotos
const btn = document.getElementById('add-photo');
const inputs = document.querySelectorAll('#photos-container input[type="file"]');

inputs[0].addEventListener('change', () => {
  if (inputs[0].files.length) btn.hidden = false;
});

btn.addEventListener('click', () => {
  for (let i = 1; i < inputs.length; i++) {
    if (inputs[i].hidden) {
      inputs[i].hidden = false;
      if (i === inputs.length - 1) btn.hidden = true;
      break;
    }
  }
});

// Validación principal del formulario
const validateForm = () => {
  //conectar las id's del html
  const regionInput = document.getElementById("region").value;
  const comunaInput = document.getElementById("comuna").value;
  const tipoInput   = document.getElementById("tipo").value;
  const unidadInput = document.getElementById("unidad").value;

  let sectorInput = document.getElementById("sector").value;
  let nameInput   = document.getElementById("nombre").value;
  let emailInput  = document.getElementById("email").value;
  let numeroInput = document.getElementById("numero").value;
  let cantidadInput = document.getElementById("cantidad").value;
  let edadInput     = document.getElementById("edad").value;
  let fechaInput    = document.getElementById("fecha").value;

  let msg = "";

  //validaciones
  if (!validateEmail(emailInput)) {
    msg += "Mail malo!\n";
    document.getElementById("email").style.borderColor = "red";
  } else {
    document.getElementById("email").style.borderColor = "";
  }

  if (!validateName(nameInput)) {
    msg += "nombre malo!\n";
    document.getElementById("nombre").style.borderColor = "red";
  } else {
    document.getElementById("nombre").style.borderColor = "";
  }

  if (!validateNumero(numeroInput)) {
    msg += "Numero malo!\n";
    document.getElementById("numero").style.borderColor = "red";
  } else {
    document.getElementById("numero").style.borderColor = "";
  }
  
  if (!validateSector(sectorInput)) {
    msg += "sector malo!\n";
    document.getElementById("sector").style.borderColor = "red";
  } else {
    document.getElementById("sector").style.borderColor = "";
  }

  if (!validateCantidad(cantidadInput)) {
    msg += "Cantidad mala!\n";
    document.getElementById("cantidad").style.borderColor = "red";
  } else {
    document.getElementById("cantidad").style.borderColor = "";
  }

  if (!validateEdad(edadInput)) {
    msg += "edad mala!\n";
    document.getElementById("edad").style.borderColor = "red";
  } else {
    document.getElementById("edad").style.borderColor = "";
  }

  if (!validateDate(fechaInput)) {
    msg += "Fecha mala!\n";
    document.getElementById("fecha").style.borderColor = "red";
  } else {
    document.getElementById("fecha").style.borderColor = "";
  }
  
  const photosContainer = document.getElementById("photos-container");
  const fileInputs = photosContainer.querySelectorAll('input[type="file"]');
  const selectedFiles = [];
  fileInputs.forEach(inp => {
    if (inp.files && inp.files.length) {
      for (const f of inp.files) selectedFiles.push(f);
    }
  });
  if (!validateFiles(selectedFiles)) {
    msg += "Fotos inválidas (mín 1, máx 5, y deben ser imágenes o PDF)!\n";
    if (fileInputs[0]) fileInputs[0].style.borderColor = "red";
  } else if (fileInputs[0]) {
    fileInputs[0].style.borderColor = "";
  }

  if (!validateSelect(regionInput)) msg += "Falta region!\n";
  if (!validateSelect(comunaInput)) msg += "Falta comuna!\n";
  if (!validateSelect(tipoInput))   msg += "Falta tipo!\n";
  if (!validateSelect(unidadInput)) msg += "Falta unidad!\n";

  if (msg === "") {
    const dlg = document.getElementById("confirm-dialog");
    dlg.showModal();
  } else {
    alert(msg);
  }
};

// Manejo del diálogo de confirmación
const form = document.getElementById("form-aviso");
const dialog = document.getElementById("confirm-dialog");
const btnSi = document.getElementById("confirm-si");
const btnNo = document.getElementById("confirm-no");
const exito = document.getElementById("mensaje-exito");

btnSi.addEventListener("click", () => {
  dialog.close();
  form.hidden = true;
  exito.hidden = false;
});

btnNo.addEventListener("click", () => {
  dialog.close();
});

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);
