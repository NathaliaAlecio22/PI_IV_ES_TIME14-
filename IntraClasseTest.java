
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;


import comunicacao.Mensagem;


import static org.junit.jupiter.api.Assertions.*;

/**
 * Testes Intra-classe para o Servidor Socket.
 * Foco: Testar as classes Mensagem e Parceiro isoladamente.
 */
class IntraClasseTest {

    // --- Teste para a Classe: Mensagem ---

    @Test
    @DisplayName("Teste de Atributo: Verifica se a classe Mensagem armazena e retorna o texto")
    void testeParticionamentoPorAtributoMensagem() {
        // Sequência: Construtor("Olá") -> getTexto()
        String textoEsperado = "Olá, mundo!";
        Mensagem msg = new Mensagem(textoEsperado);

        // Assertiva
        assertEquals(textoEsperado, msg.getTexto());
    }


    // --- Teste para a Classe: Parceiro (Usando DataStream) ---

    private Parceiro parceiroServidor; // O 'Parceiro' que o servidor usa
    private ServerSocket servidorSocketFalso;
    private Socket conexaoClienteFalso;

    private DataInputStream clienteReceptor;
    private DataOutputStream clienteTransmissor;

    @BeforeEach
    void setupTesteParceiro() throws IOException {
        // 1. Cria um servidor "falso" em uma porta aleatória
        servidorSocketFalso = new ServerSocket(0);

        // 2. Cria um cliente "falso" para se conectar a ele
        conexaoClienteFalso = new Socket("localhost", servidorSocketFalso.getLocalPort());

        // 3. O servidor aceita a conexão
        Socket conexaoServidor = servidorSocketFalso.accept();

        // 4. O Parceiro é instanciado (lado do servidor)
        parceiroServidor = new Parceiro(conexaoServidor);

        // 5. Streams do lado do Cliente (para o teste enviar/receber)
        clienteTransmissor = new DataOutputStream(conexaoClienteFalso.getOutputStream());
        clienteReceptor = new DataInputStream(conexaoClienteFalso.getInputStream());
    }

    @AfterEach
    void tearDownTesteParceiro() throws IOException {
        // Fecha todas as conexões
        if (parceiroServidor != null) parceiroServidor.adeus();
        if (conexaoClienteFalso != null) conexaoClienteFalso.close();
        if (servidorSocketFalso != null) servidorSocketFalso.close();
    }

    @Test
    @DisplayName("Teste de Estado: Verifica se o Parceiro falha ao enviar em estado 'Fechado'")
    void testeParticionamentoPorEstadoParceiro() throws IOException {
        // Sequência: Construtor -> adeus() -> receba()

        // 1. Transição de Estado: Aberto -> Fechado
        parceiroServidor.adeus(); // Fecha o lado do servidor

        // 2. Assertiva: Tentar enviar (receba) deve falhar (lançar exceção)
        assertThrows(java.net.SocketException.class, () -> {
            parceiroServidor.receba("Teste de estado fechado");
        });
    }

    @Test
    @DisplayName("Teste de Métodos: Verifica a troca de Strings (Receba/Envie)")
    void testeTrocaDeMensagensParceiro() throws Exception {
        String mensagemEnviada = "Teste de envio";

        // 1. Simula o Cliente enviando
        clienteTransmissor.writeUTF(mensagemEnviada);
        clienteTransmissor.flush();

        // 2. O Parceiro (Servidor) deve receber
        String mensagemRecebida = parceiroServidor.envie();

        // Assertiva
        assertEquals(mensagemEnviada, mensagemRecebida);
    }
}