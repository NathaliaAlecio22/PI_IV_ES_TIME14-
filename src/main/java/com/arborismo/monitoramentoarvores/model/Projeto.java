package com.arborismo.monitoramentoarvores.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore; // NOVO IMPORT

import java.util.List; // NOVO IMPORT

@Entity
@Table(name = "projetos")
@Data
@NoArgsConstructor
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(nullable = false, length = 500)
    private String descricao;

    // --- Relacionamento com o Dono (PF ou PJ) ---
    @Column(nullable = false)
    private Long donoId;

    @Column(nullable = false, length = 2)
    private String donoTipo;

    // --- Metadados ---
    @Column(nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    // --- NOVO: RELACIONAMENTO INVERSO COM AS ÁRVORES ---
    // Esta lista mapeia as árvores que pertencem a este projeto.
    // O @JsonIgnore é CRUCIAL para prevenir o erro de serialização de loop!
    @JsonIgnore // ADICIONE ESTA ANOTAÇÃO
    @OneToMany(mappedBy = "projeto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Arvore> arvores;
}