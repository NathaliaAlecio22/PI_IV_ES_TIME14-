package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.dto.ProjetoCadastroDTO;
import com.arborismo.monitoramentoarvores.dto.ProjetoResponseDTO;
import com.arborismo.monitoramentoarvores.service.ProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.arborismo.monitoramentoarvores.security.CustomUserDetails;

@RestController
@RequestMapping("/api/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    @PostMapping
    public ResponseEntity<?> cadastrarProjeto(@RequestBody ProjetoCadastroDTO dto, Authentication authentication) {

        // --- 1. EXTRAÇÃO DE DADOS DO USUÁRIO LOGADO (Simulação Temporária) ---
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long donoId = userDetails.getId(); // ID REAL do Token
        String donoTipo = userDetails.getTipoUsuario(); // Tipo REAL do Token

        try {
            // AGORA, o Service retorna o DTO de Resposta
            ProjetoResponseDTO projetoSalvo = projetoService.cadastrar(dto, donoId, donoTipo);

            // 2. Retorna o DTO de Resposta com status 201 CREATED
            return new ResponseEntity<>(projetoSalvo, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            // FALHA: Retorna a MENSAGEM DO ERRO com status 400 BAD REQUEST
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}