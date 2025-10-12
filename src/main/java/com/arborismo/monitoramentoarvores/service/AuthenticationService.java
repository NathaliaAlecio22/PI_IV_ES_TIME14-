package com.arborismo.monitoramentoarvores.service;

import com.arborismo.monitoramentoarvores.dto.LoginRequest;
import com.arborismo.monitoramentoarvores.dto.LoginResponse;
import com.arborismo.monitoramentoarvores.model.Empresa;
import com.arborismo.monitoramentoarvores.model.Usuario;
import com.arborismo.monitoramentoarvores.repository.EmpresaRepository;
import com.arborismo.monitoramentoarvores.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // Método principal para realizar o login
    public LoginResponse login(LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        // 1. Tenta autenticar como PESSOA FÍSICA (PF)
        Usuario usuarioPF = usuarioRepository.findByEmail(username);

        if (usuarioPF != null) {
            if (passwordEncoder.matches(password, usuarioPF.getSenha())) {
                // Sucesso PF: Gera o token
                String token = jwtService.generateToken(usuarioPF.getEmail(), "PF", usuarioPF.getId());
                return new LoginResponse(token, "PF", usuarioPF.getId());
            }
        }

        // 2. Tenta autenticar como PESSOA JURÍDICA (PJ)
        // Tentamos buscar pelo CNPJ OU pelo E-mail Corporativo
        Empresa empresaPJ = empresaRepository.findByCnpj(username);
        if (empresaPJ == null) {
            empresaPJ = empresaRepository.findByEmailCorporativo(username);
        }

        if (empresaPJ != null) {
            if (passwordEncoder.matches(password, empresaPJ.getSenha())) {
                // Sucesso PJ: Gera o token
                String token = jwtService.generateToken(empresaPJ.getEmailCorporativo(), "PJ", empresaPJ.getId());
                return new LoginResponse(token, "PJ", empresaPJ.getId());
            }
        }

        // 3. Falha na Autenticação
        throw new RuntimeException("Credenciais inválidas.");
    }
}