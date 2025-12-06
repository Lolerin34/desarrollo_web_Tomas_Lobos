package fundacion_patitas.services;

import fundacion_patitas.models.Foto;
import fundacion_patitas.models.Log;
import fundacion_patitas.models.FotoRepository;
import fundacion_patitas.models.LogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminService {

    private final FotoRepository fotoRepository;
    private final LogRepository logRepository;

    // Inyección
    public AdminService(FotoRepository fotoRepository, LogRepository logRepository) {
        this.fotoRepository = fotoRepository;
        this.logRepository = logRepository;
    }

    public List<Foto> obtenerTodasLasFotos() {
        return fotoRepository.findAll();
    }

    public List<Log> obtenerTodosLosLogs() {
        return logRepository.findAllByOrderByFechaDesc();
    }

    public void handleEliminarFoto(Long idFoto, String motivo) throws IllegalArgumentException {
        // Validaciones
        if (motivo == null || motivo.length() < 5 || motivo.length() > 200) {
            throw new IllegalArgumentException("Motivo inválido");
        }

        //Buscar y Actualizar
        Foto foto = fotoRepository.findById(idFoto).orElse(null);
        
        if (foto != null) {
            foto.setEliminada(1);
            fotoRepository.save(foto);

            //Crear Log
            Log nuevoLog = new Log();
            nuevoLog.setFecha(LocalDateTime.now());
            nuevoLog.setMensaje("eliminado foto " + idFoto + " por usuario admin, motivo: " + motivo);
            logRepository.save(nuevoLog);
        }
    }
}