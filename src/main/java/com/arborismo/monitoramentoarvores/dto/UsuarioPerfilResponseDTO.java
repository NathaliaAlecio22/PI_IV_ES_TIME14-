package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;

@Data
public class UsuarioPerfilResponseDTO {
    private Long id;
    private String nomeCompleto;
    private String cpf;
    private String email;
    private String telefone;
    private String dataNascimento;

    // Endereço
    private String cep;
    private String estado;
    private String cidade;
    private String bairro;
    private String rua;
    private String numero;
    private String complemento;
}
