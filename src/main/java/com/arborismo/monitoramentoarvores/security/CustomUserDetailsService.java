package com.arborismo.monitoramentoarvores.security;

import com.arborismo.monitoramentoarvores.model.Empresa;
import com.arborismo.monitoramentoarvores.model.Usuario;
import com.arborismo.monitoramentoarvores.repository.EmpresaRepository;
import com.arborismo.monitoramentoarvores.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails; // Import necessário
import org.springframework.security.core.authority.SimpleGrantedAuthority; // Import necessário
import java.util.Collections; // Import necessário

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    // Método principal que o Spring Security usa para carregar os dados
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 1. Tenta encontrar como Pessoa Física (PF) por e-mail
        Usuario usuarioPF = usuarioRepository.findByEmail(username);
        if (usuarioPF != null) {
            // Retorna o CustomUserDetails com o ID e Tipo REAL
            return new CustomUserDetails(
                    usuarioPF.getEmail(),
                    usuarioPF.getSenha(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_USUARIO_PF")), // Define a Role
                    usuarioPF.getId(), // ID REAL!
                    "PF"
            );
        }

        // 2. Tenta encontrar como Pessoa Jurídica (PJ)
        Empresa empresaPJ = empresaRepository.findByCnpj(username);
        if (empresaPJ == null) {
            // Se não for CNPJ, tenta e-mail corporativo (como no Login)
            empresaPJ = empresaRepository.findByEmailCorporativo(username);
        }

        if (empresaPJ != null) {
            return new CustomUserDetails(
                    empresaPJ.getEmailCorporativo(),
                    empresaPJ.getSenha(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_EMPRESA_PJ")), // Define a Role
                    empresaPJ.getId(), // ID REAL!
                    "PJ"
            );
        }

        // 3. Falha na Autenticação
        throw new UsernameNotFoundException("Credenciais inválidas. Usuário não encontrado: " + username);
    }
}