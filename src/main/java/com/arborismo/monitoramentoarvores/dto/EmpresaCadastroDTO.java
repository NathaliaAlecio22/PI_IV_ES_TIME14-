package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

// Esta classe é usada para receber os dados do formulário de cadastro via JSON
@Data
@NoArgsConstructor
public class EmpresaCadastroDTO {

    // Dados da Empresa
    private String razaoSocial;
    private String nomeFantasia;
    private String cnpj;
    private String inscricaoEstadual;

    // Endereço
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;

    // Contato e Login
    private String emailCorporativo;
    private String telefone;
    private String senha;

    // Pessoa de Contato
    private String nomeContato;
    private String cargoContato;
}