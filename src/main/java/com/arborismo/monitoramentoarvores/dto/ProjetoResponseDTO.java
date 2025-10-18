package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

// DTO de SAÍDA: Usado para enviar o projeto criado de volta ao Frontend
@Data
@NoArgsConstructor
public class ProjetoResponseDTO {

    private Long id; // ID gerado pelo banco

    private String nome;

    private String descricao;

    private Long donoId; // ID do dono (PF ou PJ)

    private String donoTipo; // Tipo do dono ("PF" ou "PJ")

    private LocalDateTime dataCriacao; // Quando foi criado
}