package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;

@Data
public class EmpresaPerfilResponseDTO {
    private Long id;
    private String razaoSocial;
    private String nomeFantasia;
    private String cnpj;
    private String emailCorporativo;
    private String telefone;

    // Endereço
    private String cep;
    private String estado;
    private String cidade;
    private String bairro;
    private String rua;
    private String numero;
    private String complemento;

    // Dados do responsável
    private String nomeContato;
    private String cargoContato;
}
