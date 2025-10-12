package com.arborismo.monitoramentoarvores.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    // Chave secreta que deve ser usada para assinar o token.
    // O valor real será lido do application.properties
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    // Tempo de validade do token (em milissegundos, 24 horas)
    private final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000;

    // --- Geração do Token ---

    // Método principal para gerar o token
    public String generateToken(String email, String tipoUsuario, Long id) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("tipo", tipoUsuario);
        claims.put("id", id);

        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // O email ou CNPJ
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // --- Configuração da Chave Secreta ---

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}