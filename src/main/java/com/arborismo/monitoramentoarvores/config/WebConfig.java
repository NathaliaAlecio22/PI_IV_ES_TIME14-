package com.arborismo.monitoramentoarvores.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração global de CORS para permitir que o Frontend (React)
 * acesse a API (Spring Boot) em origens diferentes.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Permite CORS para todas as rotas que começam com /api/
                .allowedOrigins("http://localhost:5173") // A origem do seu React (Vite)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Permite todos os cabeçalhos (incluindo o 'Authorization' do JWT)
                .allowCredentials(true); // Permite o envio de credenciais (cookies/tokens)
    }
}