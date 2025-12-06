
function solicitarMotivo(form) {
    let motivo = prompt("Por favor, ingrese el motivo de la eliminación (mínimo 5 caracteres):");

    if (motivo === null) {
        return false;
    }
    motivo = motivo.trim();

    //Validación de longitud (Requerimiento: min 5, max 200)
    if (motivo.length < 5 || motivo.length > 200) {
        alert("Error: El motivo debe tener entre 5 y 200 caracteres.");
        return false; // Bloquea el envío del formulario
    }
    form.motivo.value = motivo;
    return true;
}