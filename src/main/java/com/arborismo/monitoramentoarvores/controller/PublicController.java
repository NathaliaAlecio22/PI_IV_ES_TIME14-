package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.model.Arvore;
import com.arborismo.monitoramentoarvores.repository.ArvoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // Prefixo para APIs
public class PublicController {

    @Autowired // Injeção do repositório para buscar a árvore
    private ArvoreRepository arvoreRepository;

    // ROTA PÚBLICA DE ESCANEAMENTO: GET /api/arvores/scan/{numeroPlaqueta}
    @GetMapping("/arvores/scan/{numeroPlaqueta}")
    public ResponseEntity<Arvore> scanQrCode(@PathVariable String numeroPlaqueta) {

        // 1. Buscar a árvore pelo ID da plaqueta
        Arvore arvore = arvoreRepository.findByNumeroPlaqueta(numeroPlaqueta);

        if (arvore == null) {
            return ResponseEntity.notFound().build(); // Retorna 404 Not Found se não existir
        }

        // 2. Retorna a Entidade Arvore (o Jackson a converte para JSON)
        return ResponseEntity.ok(arvore);
    }
}