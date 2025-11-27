import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Teste Inter-classe (End-to-End) do Servidor Chatbot.
 * Inicia o servidor real e simula um cliente de rede.
 */
public class InterClasseTest {

    private static Thread servidorThread;

    /*
    @BeforeAll
    @DisplayName("Inicia o Servidor de Socket em uma Thread separada")

    static void iniciarServidor() throws InterruptedException {
        // Inicia o Servidor.main() em uma thread
        servidorThread = new Thread(() -> {
            try {
                // Passa a porta "0" para usar uma porta aleatória livre
                Servidor.main(new String[]{"0"});
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        servidorThread.start();

        // Aguarda o servidor iniciar (simples, mas necessário)
        Thread.sleep(1000);
    }

    @AfterAll
    @DisplayName("Para o Servidor de Socket")
    static void pararServidor() {
        if (servidorThread != null) {
            servidorThread.interrupt();
        }
    }
    */

    // Método utilitário para simular um cliente
    private String simularClienteSocket(String pergunta) throws IOException {
        // Usa a porta que o Servidor escolheu (se usarmos porta 0)
        // NOTA: Para este teste funcionar, a porta precisa ser fixa (3000)
        int porta = Integer.parseInt(Servidor.PORTA_PADRAO);

        Socket conexao = new Socket("localhost", porta);
        DataOutputStream transmissor = new DataOutputStream(conexao.getOutputStream());
        DataInputStream receptor = new DataInputStream(conexao.getInputStream());

        transmissor.writeUTF(pergunta);
        transmissor.flush();

        String resposta = receptor.readUTF();

        conexao.close();
        return resposta;
    }

    @Test
    @DisplayName("Cenário NORMAL: Pergunta válida (altura)")
    void testeCenarioNormal() throws IOException {
        String resposta = simularClienteSocket("qual a altura?");
        assertTrue(resposta.contains("15 metros"));
    }

    @Test
    @DisplayName("Cenário VARIAÇÃO 1: Pergunta inválida (retorna default)")
    void testeCenarioVariacao1() throws IOException {
        String resposta = simularClienteSocket("abcdefg");
        assertTrue(resposta.contains("Olá! Sou o Chatbot Arborismo"));
    }

    @Test
    @DisplayName("Cenário VARIAÇÃO 2: Pergunta válida (risco)")
    void testeCenarioVariacao2() throws IOException {
        String resposta = simularClienteSocket("qual o risco?");
        assertTrue(resposta.contains("avaliação de risco"));
    }
}