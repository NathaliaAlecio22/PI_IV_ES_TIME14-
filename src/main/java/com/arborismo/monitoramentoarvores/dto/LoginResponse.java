package com.arborismo.monitoramentoarvores.dto;

import lombok.AllArgsConstructor; // Novo Import
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO para retornar o token após o login bem-sucedido
@Data
@NoArgsConstructor
@AllArgsConstructor // ADICIONE ESTA ANOTAÇÃO
public class LoginResponse {
    private String token;
    private String tipoUsuario; // Ex: "PF" ou "PJ"
    private Long id; // ID do usuário logado
}