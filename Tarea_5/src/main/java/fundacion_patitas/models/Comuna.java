package fundacion_patitas.models;

import jakarta.persistence.*;
// este archivo convierte los numeros de las id's de las comunas a su nombre, no supe hacerlo directamente sin hacer una clase
@Entity
@Table(name = "comuna")
public class Comuna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    
    public Comuna() {}

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
}