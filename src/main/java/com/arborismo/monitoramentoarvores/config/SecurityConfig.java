package com.arborismo.monitoramentoarvores.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.arborismo.monitoramentoarvores.security.JwtRequestFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    // 1. BEAN PARA CRIPTOGRAFIA DE SENHA (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. BEAN: EXPÕE O AUTHENTICATION MANAGER
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // 3. FILTRO DE SEGURANÇA E AUTORIZAÇÃO (COM JWT)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desabilita para APIs REST
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sem Sessão
                .authorizeHttpRequests(authorize -> authorize
                        // --- TODAS AS ROTAS PÚBLICAS JUNTAS ---
                        .requestMatchers(
                                "/api/usuarios/cadastro",
                                "/api/empresas/cadastro",
                                "/api/auth/login",
                                "/api/arvores/scan/**" // ROTA PÚBLICA PARA QR CODE
                        ).permitAll() // Permite acesso sem JWT

                        // --- TODAS AS ROTAS PROTEGIDAS ---
                        .anyRequest().authenticated() // Qualquer outra rota exige JWT
                )
                // NOVO: Adiciona o filtro JWT antes do filtro padrão de username/password
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}