package com.arborismo.monitoramentoarvores.service;

import com.arborismo.monitoramentoarvores.dto.UsuarioCadastroDTO;
import com.arborismo.monitoramentoarvores.model.Usuario;
import com.arborismo.monitoramentoarvores.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Para criptografia
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injetado do SecurityConfig

    // O método chamado pelo Controller
    public Usuario cadastrar(UsuarioCadastroDTO dto) {

        // --- 1. Lógica de Validação: CPF e E-mail ---
        if (usuarioRepository.findByCpf(dto.getCpf()) != null) {
            throw new RuntimeException("CPF já cadastrado no sistema.");
        }

        if (usuarioRepository.findByEmail(dto.getEmail()) != null) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        // --- 2. Conversão DTO para Entidade e Criptografia ---
        Usuario novoUsuario = converterDtoParaEntidade(dto);

        // --- 3. Salvar no Banco de Dados ---
        return usuarioRepository.save(novoUsuario);
    }

    // Método privado para conversão de DTO para Entidade
    private Usuario converterDtoParaEntidade(UsuarioCadastroDTO dto) {
        Usuario usuario = new Usuario();

        // Dados da Pessoa Física
        usuario.setNomeCompleto(dto.getNomeCompleto());
        usuario.setCpf(dto.getCpf());
        usuario.setDataNascimento(dto.getDataNascimento());

        // Endereço
        usuario.setRua(dto.getRua());
        usuario.setNumero(dto.getNumero());
        usuario.setComplemento(dto.getComplemento());
        usuario.setBairro(dto.getBairro());
        usuario.setCidade(dto.getCidade());
        usuario.setEstado(dto.getEstado());
        usuario.setCep(dto.getCep());

        // Contato e Login
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());

        // CRIPTOGRAFIA: Salva a senha de forma segura
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        return usuario;
    }
}