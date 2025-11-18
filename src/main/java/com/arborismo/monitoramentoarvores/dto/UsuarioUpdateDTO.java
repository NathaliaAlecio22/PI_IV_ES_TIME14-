package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UsuarioUpdateDTO {
    private String nomeCompleto;
    private String cpf;
    private LocalDate dataNascimento;

    // Endereço
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;

    private String telefone;
}
