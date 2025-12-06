package fundacion_patitas.controllers;

import fundacion_patitas.models.Foto;
import fundacion_patitas.models.Log;
import fundacion_patitas.services.AdminService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class AdminController {

    private final AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    //Fotos
    @GetMapping("/t5-admin-fotos")
    public String adminFotos(Model model) {
        List<Foto> fotos = adminService.obtenerTodasLasFotos();
        model.addAttribute("fotos", fotos);
        return "Fp_admin"; 
    }

    //Eliminar fotos
    @PostMapping("/t5-admin-fotos/eliminar")
    public String eliminarFoto(@RequestParam("idFoto") Long idFoto, 
                               @RequestParam("motivo") String motivo) {
        try {
            adminService.handleEliminarFoto(idFoto, motivo);
        } catch (IllegalArgumentException e) {
            return "redirect:/t5-admin-fotos?error=MotivoInvalido";
        }

        return "redirect:/t5-admin-fotos";
    }

    //Listado de logs
    @GetMapping("/mensajes-log")
    public String mensajesLog(Model model) {
        List<Log> logs = adminService.obtenerTodosLosLogs();
        model.addAttribute("logs", logs);
        return "Fp_mensajes";
    }
}