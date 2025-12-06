package fundacion_patitas.models;

import jakarta.persistence.*;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nota") 
    private int valor;

    @ManyToOne
    @JoinColumn(name = "aviso_id")
    private Aviso aviso;

    public Nota() {}

    public Nota(int valor, Aviso aviso) {
        this.valor = valor;
        this.aviso = aviso;
    }

    //getters
    public Long getId() { return id; }
    public int getValor() { return valor; }
    public Aviso getAviso() { return aviso; }
}