// botones
// funciones migrar
const migrar_Pagina_principal = () => {
    window.location.href = "../html/Fp_portada.html";
};
const migrar_Agregar_aviso = () => {
    window.location.href = "../html/Fp_formulario.html";
};
const migrar_Listado= () => {
    window.location.href = "../html/Fp_listado.html";
};
const migrar_Estadisticas = () => {
    window.location.href = "../html/Fp_estadisticas.html";
};

// conectar botones
let Btn_Pagina_principal = document.getElementById("Pagina_principal_btn");
let Btn_Agregar_aviso = document.getElementById("Agregar_aviso_btn");
let Btn_Ver_listado = document.getElementById("Ver_listado_btn");
let Btn_Estadisticas = document.getElementById("Estadisticas_btn");

//llamar botones al hacer click
Btn_Agregar_aviso.addEventListener("click", migrar_Agregar_aviso);
Btn_Pagina_principal.addEventListener("click", migrar_Pagina_principal);
Btn_Ver_listado.addEventListener("click", migrar_Listado);
Btn_Estadisticas.addEventListener("click", migrar_Estadisticas);