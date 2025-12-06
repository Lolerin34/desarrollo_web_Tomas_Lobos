package fundacion_patitas.services;

import fundacion_patitas.models.Aviso;
import fundacion_patitas.models.Nota;
import fundacion_patitas.models.AvisoRepository;
import fundacion_patitas.models.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AvisoService {

    private final AvisoRepository avisoRepo;
    private final NotaRepository notaRepo;

    public AvisoService(AvisoRepository avisoRepo, NotaRepository notaRepo) {
        this.avisoRepo = avisoRepo;
        this.notaRepo = notaRepo;
    }

    public List<Aviso> obtenerTodos() {
        return avisoRepo.findAll();
    }

    public Aviso obtenerPorId(Long id) {
        return avisoRepo.findById(id).orElse(null);
    }
    
    //Obtener solo los ultimos 5 post para la portada
    public List<Aviso> obtenerUltimos5() {
        List<Aviso> todos = avisoRepo.findAll();
        
        Collections.reverse(todos);
        
        return todos.stream().limit(5).collect(Collectors.toList());
    }

}