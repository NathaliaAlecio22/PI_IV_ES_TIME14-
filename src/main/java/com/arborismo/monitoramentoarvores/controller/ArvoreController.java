package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.dto.ArvoreCadastroDTO;
import com.arborismo.monitoramentoarvores.model.Arvore;
import com.arborismo.monitoramentoarvores.service.ArvoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
//import com.arborismo.monitoramentoarvores.security.CustomUserDetailsService;
import com.arborismo.monitoramentoarvores.security.CustomUserDetails;


import java.util.List; // Adicionado para suportar List
import java.util.Optional; // Adicionado para suportar Optional

@RestController
@RequestMapping("/api/projetos") // Mantemos o prefixo /api/projetos
public class ArvoreController {

    @Autowired
    private ArvoreService arvoreService;


    // ENDPOINT PROTEGIDO: POST /api/projetos/{projetoId}/arvores
    @PostMapping("/{projetoId}/arvores")
    public ResponseEntity<?> cadastrarArvore(
            @PathVariable Long projetoId, // ID do Projeto vem da URL
            @RequestBody ArvoreCadastroDTO dto,
            Authentication authentication // Necessário para autorização (JWT)
    ) {
        // 1. EXTRAÇÃO DE DADOS DO USUÁRIO LOGADO (REAL!)
        // O principal é o CustomUserDetails que criamos
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long donoId = userDetails.getId();
        String donoTipo = userDetails.getTipoUsuario();

        try {
            // 2. Chamar o Serviço, PASSANDO AS INFORMAÇÕES DE DONO (donoId e donoTipo)
            // MODIFICADO: A assinatura do Service precisa aceitar estes dois novos parâmetros!
            Arvore arvoreSalva = arvoreService.cadastrar(dto, projetoId, donoId, donoTipo);

            // 3. Sucesso: Retorna a entidade criada com 201 CREATED
            return new ResponseEntity<>(arvoreSalva, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            // 4. FALHA: Retorna a mensagem de erro (Acesso Negado, Projeto não encontrado, etc.)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

//    @GetMapping("/arvores/scan/{numeroPlaqueta}")
//    public ResponseEntity<Arvore> scanQrCode(@PathVariable String numeroPlaqueta) {
//
//        // 1. Buscar a árvore pelo ID da plaqueta
//        Arvore arvore = arvoreRepository.findByNumeroPlaqueta(numeroPlaqueta);
//
//        if (arvore == null) {
//            return ResponseEntity.notFound().build(); // 404 Not Found se não existir
//        }
//
//        // 2. Retorna a Entidade Arvore (com os dados completos)
//        return ResponseEntity.ok(arvore);
//    }

    // --- READ: Buscar uma Árvore por ID --- <-- CORRIGIDO A SINTAXE
    // GET /api/projetos/{projetoId}/arvores/{arvoreId}
    @GetMapping("/{projetoId}/arvores/{arvoreId}")
    public ResponseEntity<Arvore> buscarArvorePorId(@PathVariable Long arvoreId) {

        Optional<Arvore> arvoreOpt = arvoreService.buscarPorId(arvoreId);

        if (arvoreOpt.isEmpty()) {
            // Retorna 404 Not Found se a árvore não existir
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(arvoreOpt.get());
    }

    // --- READ: Listar todas as Árvores de um Projeto ---
    // GET /api/projetos/{projetoId}/arvores
    @GetMapping("/{projetoId}/arvores")
    public ResponseEntity<?> listarArvoresPorProjeto(
            @PathVariable Long projetoId,
            Authentication authentication // PRECISA DO TOKEN AQUI
    ) {
        // 1. EXTRAÇÃO DE DADOS DO USUÁRIO LOGADO (REAL!)
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long donoId = userDetails.getId();
        String donoTipo = userDetails.getTipoUsuario();

        try {
            // 2. Chama o Serviço, PASSANDO AS INFORMAÇÕES DE DONO
            List<Arvore> arvores = arvoreService.listarPorProjeto(projetoId, donoId, donoTipo);

            // 3. Retorna 200 OK com a lista de árvores (vazia ou preenchida)
            return ResponseEntity.ok(arvores);

        } catch (RuntimeException e) {
            // 4. FALHA: Retorna a mensagem de erro (Acesso Negado, Projeto não existe, etc.)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
            // Usamos 403 Forbidden, que é mais preciso para "Acesso Negado".
        }
    }

    // --- UPDATE: Atualizar uma Árvore ---
    // PUT /api/projetos/{projetoId}/arvores/{arvoreId}
    @PutMapping("/{projetoId}/arvores/{arvoreId}")
    public ResponseEntity<?> atualizarArvore(
            @PathVariable Long arvoreId,
            @RequestBody ArvoreCadastroDTO dto,
            Authentication authentication
    ) {
        // 1. EXTRAÇÃO DE DADOS DO USUÁRIO LOGADO (REAL!)
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long donoId = userDetails.getId();
        String donoTipo = userDetails.getTipoUsuario();

        try {
            // 2. Chama o Serviço, PASSANDO O DONO REAL para checagem de propriedade
            Arvore arvoreAtualizada = arvoreService.atualizar(arvoreId, dto, donoId, donoTipo);
            return ResponseEntity.ok(arvoreAtualizada);

        } catch (RuntimeException e) {
            // Retorna a mensagem de erro (Acesso Negado, Árvore não encontrada)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // --- DELETE: Excluir uma Árvore ---
    // DELETE /api/projetos/{projetoId}/arvores/{arvoreId}
    @DeleteMapping("/{projetoId}/arvores/{arvoreId}")
    public ResponseEntity<Void> excluirArvore(
            @PathVariable Long arvoreId,
            Authentication authentication
    ) {
        // 1. EXTRAÇÃO DE DADOS DO USUÁRIO LOGADO (REAL!)
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long donoId = userDetails.getId();
        String donoTipo = userDetails.getTipoUsuario();

        try {
            // 2. Chama o Serviço, PASSANDO O DONO REAL para checagem de propriedade
            arvoreService.excluir(arvoreId, donoId, donoTipo);

            // Retorna 204 No Content
            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            // Se o Service lançar "Acesso Negado" ou "Árvore não encontrada", retorna 404
            return ResponseEntity.notFound().build();
        }
    }


}