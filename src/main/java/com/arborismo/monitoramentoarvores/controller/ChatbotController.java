package com.arborismo.monitoramentoarvores.controller;

import com.arborismo.monitoramentoarvores.chatbot.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    // ROTA PROTEGIDA: POST /api/chatbot
    @PostMapping
    public ResponseEntity<String> conversar(
            @RequestBody String perguntaJson,
            Authentication authentication // Exige JWT
    ) {
        // NOTA: Para este teste, simplificamos a extração da string do JSON
        String pergunta = perguntaJson.replaceAll("[{}\"]", "").trim();

        // 1. Passa a pergunta para o Serviço (o Cliente Socket)
        String resposta = chatbotService.enviarMensagem(pergunta);

        // 2. Retorna a resposta ao Frontend (via JSON)
        return ResponseEntity.ok(resposta);
    }
}