package fundacion_patitas.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aviso_adopcion")
public class Aviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_ingreso")
    private String fechaPublicacion;
    
    @Column(name = "fecha_entrega")
    private String fechaEntrega;

    @ManyToOne
    @JoinColumn(name = "comuna_id")
    private Comuna comuna;

    private String sector;
    private String descripcion;
    private String nombre; 
    private String email;
    private String celular;
    private String tipo;    
    private Integer cantidad;
    private Integer edad;
    
    @Column(name = "unidad_medida")
    private String unidadMedida; 

    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Foto> fotos = new ArrayList<>();

    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL)
    private List<Nota> notas = new ArrayList<>();

    public Aviso() {}

    // Getters
    public Long getId() { return id; }
    public String getFechaPublicacion() { return fechaPublicacion; }
    public String getFechaEntrega() { return fechaEntrega; }
    public String getSector() { return sector; }
    public String getDescripcion() { return descripcion; }
    public String getTipo() { return tipo; }
    public Integer getCantidad() { return cantidad; }
    public Integer getEdad() { return edad; }
    public List<Nota> getNotas() { return notas; }
    public String getEmail() { return email; }
    public String getNombre() { return nombre; }
    public String getCelular() { return celular; }

    //Obtener foto
    public String getFoto() {
        if (fotos != null && !fotos.isEmpty()) {
            return fotos.get(0).getUrl();
        }
        return "/img/mascota_default.png";
    }

    // Obtener nombre de comuna
    public String getComuna() {
        return (comuna != null) ? comuna.getNombre() : "Sin comuna";
    }

    // Transforma las siglas de la DB ("a", "m") a años y meses
    public String getUnidadMedida() {
        if ("a".equalsIgnoreCase(unidadMedida)) return "años";
        if ("m".equalsIgnoreCase(unidadMedida)) return "meses";
        return unidadMedida;
    }

    // Calcular promdio de notas
    public String getPromedioNotas() {
        if (notas == null || notas.isEmpty()) return "-";
        double suma = 0;
        for (Nota n : notas) suma += n.getValor();
        //Se limita a 1 decimal
        return String.format("%.1f", suma / notas.size());
    }
}