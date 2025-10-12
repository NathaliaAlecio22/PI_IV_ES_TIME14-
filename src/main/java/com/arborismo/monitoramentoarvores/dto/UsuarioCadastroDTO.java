package com.arborismo.monitoramentoarvores.dto;

import java.time.LocalDate;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO para receber os dados de cadastro da Pessoa Física
@Data
@NoArgsConstructor
public class UsuarioCadastroDTO {

    // Dados da Pessoa Física
    private String nomeCompleto;
    private String cpf;
    private LocalDate dataNascimento; // Recebe a data no formato AAAA-MM-DD

    // Endereço
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;

    // Contato e Login
    private String telefone;
    private String email;
    private String senha; // Será criptografada no Service
}