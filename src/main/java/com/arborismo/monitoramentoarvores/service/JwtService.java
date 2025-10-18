package com.arborismo.monitoramentoarvores.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // Carrega o valor da chave secreta do application-secret.properties
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    // Define a validade do token (24 horas)
    public static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

    // --- MÉTODOS DE CRIAÇÃO (USADOS NO LOGIN) ---

    /**
     * Cria o token JWT, adicionando o tipo de usuário (PF/PJ) e o ID no payload.
     */
    public String generateToken(String username, String tipoUsuario, Long id) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("tipo", tipoUsuario);
        claims.put("id", id);
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // O username (e-mail/cnpj)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // --- MÉTODOS DE VALIDAÇÃO E EXTRAÇÃO (USADOS NO FILTRO) ---

    /**
     * Extrai o username (Subject) do token para carregar os detalhes do usuário.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Valida se o token pertence ao usuário e se não expirou.
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // --- MÉTODOS PRIVADOS AUXILIARES ---

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extrai um dado específico (claim) do token
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Decodifica e verifica a assinatura do token usando a chave secreta
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Gera a chave criptográfica a partir da string SECRET_KEY
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}