 package fundacion_patitas.models;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


@Repository

public interface AvisoRepository extends JpaRepository<Aviso, Long> {
} 