package com.arborismo.monitoramentoarvores.security;

import com.arborismo.monitoramentoarvores.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // 1. EXTRAÇÃO DO TOKEN DO CABEÇALHO "Authorization: Bearer [TOKEN]"
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            // Extrai o username (Subject) do token
            username = jwtService.extractUsername(jwt); // Implementaremos este método no JwtService
        }

        // 2. VALIDAÇÃO DO TOKEN E AUTENTICAÇÃO NO SPRING
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Carrega o UserDetails do nosso banco (MySQL)
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Validação final da expiração e assinatura
            if (jwtService.validateToken(jwt, userDetails)) { // Implementaremos este método no JwtService

                // Cria o objeto de autenticação e injeta no contexto do Spring
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        // Continua o fluxo para o Controller
        chain.doFilter(request, response);
    }
}