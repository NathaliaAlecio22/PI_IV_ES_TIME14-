package com.arborismo.monitoramentoarvores.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity // Define que esta classe é uma tabela
@Table(name = "empresas")
@Data // Gera getters, setters, toString (do Lombok)
@NoArgsConstructor // Construtor sem argumentos (do Lombok)
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Chave primária da tabela

    // 1. Dados da Empresa
    @Column(nullable = false)
    private String razaoSocial;

    @Column(nullable = false)
    private String nomeFantasia;

    @Column(nullable = false, unique = true, length = 18) // CNPJ com máscara: 00.000.000/0000-00 (18 caracteres)
    private String cnpj;

    @Column
    private String inscricaoEstadual; // IE é opcional dependendo do estado/município

    // 2. Endereço Completo
    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private String numero;

    @Column
    private String complemento; // Opcional

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false, length = 9) // CEP com máscara: 00000-000 (9 caracteres)
    private String cep;

    // 3. Contato Principal
    @Column(nullable = false, unique = true)
    private String emailCorporativo;

    @Column(nullable = false)
    private String telefone; // Pode ser telefone ou WhatsApp

    // 4. Pessoa de Contato
    @Column(nullable = false)
    private String nomeContato;

    @Column
    private String cargoContato;

    // 5. Autenticação (A Senha será usada para o Login da Empresa)
    @Column(nullable = false)
    private String senha;

    // 6. Data de Cadastro
    @Column(nullable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();

}