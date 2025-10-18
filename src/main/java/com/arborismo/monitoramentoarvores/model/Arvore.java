package com.arborismo.monitoramentoarvores.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate; // Para datas sem hora (inspeção, poda)
import java.time.LocalDateTime;
import java.util.UUID; // Para a geração do QR Code (UUID)
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "arvores")
@Data
@NoArgsConstructor
public class Arvore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Relacionamento (Chave Estrangeira) ---
    // A arvore pertence a um projeto (Chave Estrangeira)
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

    // --- Dados de Identificação ---
    @Column(nullable = false)
    private String nomePopular;

    @Column
    private String nomeCientifico;

    @Column(nullable = false, unique = true, length = 36)
    private String numeroPlaqueta = UUID.randomUUID().toString(); // O nosso QR Code ID (GUID/UUID)

    // --- Métricas e Localização ---
    @Column(nullable = false)
    private String localizacao; // Pode ser Endereço, Latitude/Longitude ou Descrição do local

    @Column(nullable = false)
    private Double alturaMetros;

    @Column
    private Integer idadeEstimadaAnos;

    @Column(nullable = false)
    private Double inclinacaoTroncoGraus; // Grau de inclinação

    @Column(nullable = false)
    private Boolean raizesExpostas; // True/False

    @Column
    private String formaCopa; // Ex: Redonda, Oval, Irregular

    // --- Avaliação Fitossanitária e Estrutural ---
    @Column
    private String pragasDoencas; // Descrição ou Lista de pragas

    @Column
    private Boolean ocoTronco; // True/False (Se houver oco no tronco)

    @Column
    private String rachadurasFissuras; // Descrição da rachadura ou "Nenhuma"

    // --- Manutenção ---
    private LocalDate dataUltimaPoda;

    private String tipoUltimaPoda;

    // --- Avaliação de Risco ---
    private String proximidadeRisco; // Ex: Fiação, Construção, Via de Alto Tráfego

    private String avaliacaoRisco; // Ex: Baixo, Médio, Alto

    // --- Inspeção e Metadados ---
    @Column(nullable = false)
    private LocalDate dataInspecao = LocalDate.now();

    @Column(nullable = false)
    private String responsavelInspecao; // Nome/Matrícula do responsável

    @Column(length = 1000)
    private String observacoesAdicionais;

    @Column(nullable = false)
    private String situacaoRecomendada; // Ex: Manter, Poda, Supressão, Monit. Especial

    private LocalDate proximaInspecao;

    @Column(nullable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();
}