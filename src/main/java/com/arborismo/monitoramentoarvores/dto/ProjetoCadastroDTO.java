package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

// DTO de ENTRADA: Recebe Nome e Descrição do projeto via requisição POST
@Data
@NoArgsConstructor
public class ProjetoCadastroDTO {

    private String nome;

    private String descricao;
}