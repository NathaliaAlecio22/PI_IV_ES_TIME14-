package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.dto.LoginRequest;
import com.arborismo.monitoramentoarvores.dto.LoginResponse;
import com.arborismo.monitoramentoarvores.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Mantemos o AuthenticationService para a geração do Token
    @Autowired
    private AuthenticationService authenticationService;

    // NÓS IREMOS DEIXAR A LÓGICA DE LOGIN DENTRO DO AuthenticationService
    // Apenas remova a linha @Autowired private AuthenticationManager authenticationManager; se ela existir.

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        try {
            // O serviço executa a lógica de PF/PJ e o passwordEncoder.matches()
            LoginResponse response = authenticationService.login(request);

            // Sucesso: Retorna o token com status HTTP 200 OK
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            // Se a exceção do Service for lançada ("Credenciais inválidas."), retorna 401
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}