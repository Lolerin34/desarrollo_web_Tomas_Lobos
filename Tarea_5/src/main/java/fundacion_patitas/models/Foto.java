package fundacion_patitas.models;

import jakarta.persistence.*;

@Entity
@Table(name = "foto")
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ruta_archivo")
    private String rutaArchivo;

    @Column(name = "nombre_archivo")
    private String nombreArchivo;

    @ManyToOne
    @JoinColumn(name = "aviso_id")
    private Aviso aviso;

    // Implementación de eliminar
    @Column(name = "eliminada", nullable = false)
    private int eliminada = 0; 

    public Foto() {}

    // Getters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombreArchivo() { return nombreArchivo; }
    public void setNombreArchivo(String nombreArchivo) { this.nombreArchivo = nombreArchivo; }

    public Aviso getAviso() { return aviso; }
    public void setAviso(Aviso aviso) { this.aviso = aviso; }

    public int getEliminada() { return eliminada; }
    public void setEliminada(int eliminada) { this.eliminada = eliminada; }

    public String getRutaArchivo() { 
        return rutaArchivo; 
    }
    public void setRutaArchivo(String rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    public String getUrl() {
        return rutaArchivo; 
    }
}