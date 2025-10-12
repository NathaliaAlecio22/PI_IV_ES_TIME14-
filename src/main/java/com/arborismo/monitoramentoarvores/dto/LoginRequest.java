package com.arborismo.monitoramentoarvores.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

// DTO para receber as credenciais de login
@Data
@NoArgsConstructor
public class LoginRequest {
    private String username; // Será o email (PF) ou cnpj/email (PJ)
    private String password; // A senha em texto simples
}