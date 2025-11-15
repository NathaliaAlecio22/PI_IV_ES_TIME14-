package com.arborismo.monitoramentoarvores.chatbot;

import org.springframework.stereotype.Service;
import java.net.Socket;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;

// REMOVA OS IMPORTS de Comunicado e Mensagem, eles não são mais necessários aqui.

@Service
public class ChatbotService {

    private static final String HOST = "localhost";
    private static final int PORTA = 3000;

    public String enviarMensagem(String pergunta) {

        Socket conexao = null;
        try {
            // 1. Abre conexão
            conexao = new Socket(HOST, PORTA);

            // 2. Cria Streams (Data)
            DataOutputStream transmissor = new DataOutputStream(conexao.getOutputStream());
            DataInputStream receptor = new DataInputStream(conexao.getInputStream());

            // 3. Envia a Pergunta (como String)
            transmissor.writeUTF(pergunta);
            transmissor.flush();

            // 4. Espera e recebe a Resposta (como String)
            String resposta = receptor.readUTF();

            return resposta;

        } catch (Exception e) {
            return "Erro de comunicação: Verifique se o Servidor Chatbot está ativo na porta " + PORTA + ". Detalhes: " + e.getMessage();
        } finally {
            if (conexao != null) {
                try { conexao.close(); } catch (IOException e) {}
            }
        }
    }
}