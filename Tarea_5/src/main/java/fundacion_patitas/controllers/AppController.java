package fundacion_patitas.controllers;

import fundacion_patitas.models.Aviso;
import fundacion_patitas.services.AvisoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//Aqui se administra la pagina web
@Controller
public class AppController {

    private final AvisoService avisoService;

    // Inyecto el servicio
    public AppController(AvisoService avisoService) {
        this.avisoService = avisoService;
    }

    //Rutas de navegación

    // Ruta raíz/portada
    @GetMapping("/")
    public String portada(Model model) {
        model.addAttribute("ultimos", avisoService.obtenerUltimos5());
        return "Fp_portada"; 
    }

    // Listado
    @GetMapping("/listado")
    public String listado(Model model) {
        model.addAttribute("avisos", avisoService.obtenerTodos());
        return "Fp_listado";
    }

    // formulario
    @GetMapping("/formulario")
    public String formulario() {
        return "Fp_formulario";
    }

    // Logica
    
    // Captura el ID desde la URL (ej: /detalle/4) para buscar esa mascota específica.
    @GetMapping("/detalle/{id}")
    public String detalle(@PathVariable Long id, Model model) {
        Aviso aviso = avisoService.obtenerPorId(id);
        
        if (aviso == null) {
            return "redirect:/listado"; 
        }
        
        model.addAttribute("aviso", aviso);
        return "Fp_detalle";
    }

    @GetMapping("/estadisticas")
    public String estadisticas() {
        return "Fp_estadisticas";
    }
}