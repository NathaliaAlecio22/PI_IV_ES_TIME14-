package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.dto.UsuarioCadastroDTO;
import com.arborismo.monitoramentoarvores.model.Usuario;
import com.arborismo.monitoramentoarvores.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios") // URL de prefixo: /api/usuarios
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // ENDPOINT PARA CADASTRO DE PESSOA FÍSICA
    @PostMapping("/cadastro") // Rota final: /api/usuarios/cadastro
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody UsuarioCadastroDTO dto) {

        try {
            Usuario usuarioSalvo = usuarioService.cadastrar(dto);

            // Retorna o usuário criado com o status HTTP 201 CREATED
            return new ResponseEntity<>(usuarioSalvo, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            // Retorna o erro 400 BAD REQUEST se o CPF/E-mail já existir
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }
    }
}