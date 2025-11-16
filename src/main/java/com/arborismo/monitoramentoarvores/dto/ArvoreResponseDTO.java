package com.arborismo.monitoramentoarvores.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArvoreResponseDTO {

    private Long id;
    private String nomePopular;
    private String nomeCientifico;
    private String localizacao;
    private Double alturaMetros;
    private Integer idadeEstimadaAnos;
    private Double inclinacaoTroncoGraus;
    private Boolean raizesExpostas;
    private String formaCopa;
    private String pragasDoencas;
    private Boolean ocoTronco;
    private String rachadurasFissuras;
    private String dataUltimaPoda;
    private String tipoUltimaPoda;
    private String proximidadeRisco;
    private String avaliacaoRisco;
    private String responsavelInspecao;
    private String observacoesAdicionais;
    private String situacaoRecomendada;
}
