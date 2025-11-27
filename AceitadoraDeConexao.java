// AceitadoraDeConexao.java
import java.net.*;
import java.io.*;


public class AceitadoraDeConexao extends Thread {

    private ServerSocket servidor;

    public AceitadoraDeConexao(String porta) throws Exception {
        if (porta == null) {
            throw new Exception("Porta nula.");
        }

        try {
            // Tenta criar o ServerSocket na porta fornecida
            this.servidor = new ServerSocket(Integer.parseInt(porta));
        } catch (IOException e) {
            // Lança exceção se a porta for inválida ou já estiver em uso
            throw new Exception("Porta inválida ou ocupada.");
        }
    }

    public void run() {
        for(;;) {
            try {
                System.out.println("Servidor Chatbot ouvindo na porta " + servidor.getLocalPort() + "...");

                // Espera por uma conexão de cliente (Bloqueante)
                Socket conexao = this.servidor.accept();

                // Cria um Parceiro para a nova conexão
                Parceiro cliente = new Parceiro(conexao);

                // Inicia uma thread para cuidar do diálogo
                TratadoraDeCliente tratadora = new TratadoraDeCliente(cliente);
                tratadora.start();

            } catch (Exception e) {
                // Em caso de erro na aceitação, o loop continua.
                System.err.println("Erro ao aceitar conexão: " + e.getMessage());
            }
        }
    }
}