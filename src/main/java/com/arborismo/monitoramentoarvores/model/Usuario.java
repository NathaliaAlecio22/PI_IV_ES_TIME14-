package com.arborismo.monitoramentoarvores.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate; // Para a data de nascimento
import java.time.LocalDateTime;

@Entity // Diz ao JPA que esta classe é uma tabela
@Table(name = "usuarios") // Tabela para Pessoa Física
@Data // Gera getters, setters, toString (Lombok)
@NoArgsConstructor // Construtor sem argumentos (Lombok)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1. Dados da Pessoa Física
    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false, unique = true, length = 14) // CPF com máscara: 000.000.000-00 (14 caracteres)
    private String cpf;

    @Column(nullable = false)
    private LocalDate dataNascimento; // Usamos LocalDate para armazenar apenas a data

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

    // 3. Contato e Login
    @Column(nullable = false)
    private String telefone; // Telefone ou WhatsApp

    @Column(nullable = false, unique = true)
    private String email; // E-mail usado para login

    @Column(nullable = false)
    private String senha; // Senha (será criptografada)

    // 4. Data de Cadastro
    @Column(nullable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();

}