package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

// DTO de ENTRADA: Recebe todos os dados do formulário de monitoramento
@Data
@NoArgsConstructor
public class ArvoreCadastroDTO {

    // NOTA: O ID do projeto virá na URL do Controller, não neste DTO.

    // --- Dados de Identificação ---
    private String nomePopular;
    private String nomeCientifico;

    // --- Métricas e Localização ---
    private String localizacao;
    private Double alturaMetros;
    private Integer idadeEstimadaAnos;
    private Double inclinacaoTroncoGraus;
    private Boolean raizesExpostas;
    private String formaCopa;

    // --- Avaliação Fitossanitária e Estrutural ---
    private String pragasDoencas;
    private Boolean ocoTronco;
    private String rachadurasFissuras;

    // --- Manutenção ---
    private LocalDate dataUltimaPoda;
    private String tipoUltimaPoda;

    // --- Avaliação de Risco e Inspeção ---
    private String proximidadeRisco;
    private String avaliacaoRisco;
    // dataInspecao será gerada no backend
    private String responsavelInspecao;
    private String observacoesAdicionais;
    private String situacaoRecomendada;
    private LocalDate proximaInspecao;
}