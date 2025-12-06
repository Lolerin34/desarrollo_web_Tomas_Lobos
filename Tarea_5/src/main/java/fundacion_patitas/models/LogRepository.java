package fundacion_patitas.models; // Ajusta paquete

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LogRepository extends JpaRepository<Log, Long> {
    // ordenar logs del más reciente al más antiguo 
    List<Log> findAllByOrderByFechaDesc();
}