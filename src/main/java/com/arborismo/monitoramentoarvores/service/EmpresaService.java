package com.arborismo.monitoramentoarvores.service;

import com.arborismo.monitoramentoarvores.dto.EmpresaCadastroDTO;
import com.arborismo.monitoramentoarvores.model.Empresa;
import com.arborismo.monitoramentoarvores.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Essencial para criptografia
import org.springframework.stereotype.Service;
import java.time.LocalDateTime; // Não usado no Service, mas bom para referência

@Service // Marca a classe como um componente de Serviço (Lógica de Negócio)
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injetamos o BCrypt

    // O método chamado pelo Controller
    public Empresa cadastrar(EmpresaCadastroDTO dto) {

        // --- 1. Lógica de Validação ---
        if (empresaRepository.findByCnpj(dto.getCnpj()) != null) {
            throw new RuntimeException("CNPJ já cadastrado no sistema.");
        }
        if (empresaRepository.findByEmailCorporativo(dto.getEmailCorporativo()) != null) {
            throw new RuntimeException("E-mail corporativo já cadastrado.");
        }

        // --- 2. Conversão DTO para Entidade ---
        Empresa novaEmpresa = converterDtoParaEntidade(dto);

        // --- 3. Salvar no Banco de Dados ---
        return empresaRepository.save(novaEmpresa);
    }

    // Método privado para realizar a conversão dos dados
    private Empresa converterDtoParaEntidade(EmpresaCadastroDTO dto) {
        Empresa empresa = new Empresa();

        // Dados da Empresa
        empresa.setRazaoSocial(dto.getRazaoSocial());
        empresa.setNomeFantasia(dto.getNomeFantasia());
        empresa.setCnpj(dto.getCnpj());
        empresa.setInscricaoEstadual(dto.getInscricaoEstadual());

        // Endereço
        empresa.setRua(dto.getRua());
        empresa.setNumero(dto.getNumero());
        empresa.setComplemento(dto.getComplemento());
        empresa.setBairro(dto.getBairro());
        empresa.setCidade(dto.getCidade());
        empresa.setEstado(dto.getEstado());
        empresa.setCep(dto.getCep());

        // Contato e Login
        empresa.setEmailCorporativo(dto.getEmailCorporativo());
        empresa.setTelefone(dto.getTelefone());

        // CRIPTOGRAFA A SENHA UMA ÚNICA VEZ
        empresa.setSenha(passwordEncoder.encode(dto.getSenha()));

        // Pessoa de Contato
        empresa.setNomeContato(dto.getNomeContato());
        empresa.setCargoContato(dto.getCargoContato());



        return empresa;
    }
}