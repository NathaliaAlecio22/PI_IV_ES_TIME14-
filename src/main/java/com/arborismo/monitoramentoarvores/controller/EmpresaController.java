package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.dto.EmpresaCadastroDTO;
import com.arborismo.monitoramentoarvores.model.Empresa;
import com.arborismo.monitoramentoarvores.service.EmpresaService; // Vamos criar este Service a seguir!
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // 1. Marca a classe como uma API REST
@RequestMapping("/api/empresas") // 2. Define o prefixo da URL (ex: localhost:8080/api/empresas)
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService; // Injetamos a camada de serviço

    // ENDPOINT PARA CADASTRO DE EMPRESA (Pessoa Jurídica)
    @PostMapping("/cadastro") // 3. Define o método HTTP (POST) e o path final (ex: /api/empresas/cadastro)
    public ResponseEntity<Empresa> cadastrarEmpresa(@RequestBody EmpresaCadastroDTO dto) {

        try {
            // 4. Chamamos o Service para realizar a lógica de negócio e salvar no banco
            Empresa empresaSalva = empresaService.cadastrar(dto);

            // 5. Retornamos a empresa criada com o status HTTP 201 CREATED
            return new ResponseEntity<>(empresaSalva, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            // 6. Se o CNPJ ou E-mail já existir (lógica que criaremos no Service)
            // Retorna o erro com o status HTTP 400 BAD REQUEST
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}