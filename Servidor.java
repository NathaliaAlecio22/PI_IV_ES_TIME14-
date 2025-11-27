// Servidor.java
import java.util.*;

public class Servidor {
    public static String PORTA_PADRAO = "3000";



    public static void main (String[] args) {

        String porta = Servidor.PORTA_PADRAO;
        if (args.length > 0) {
            porta = args[0];
        }

        AceitadoraDeConexao aceitadoraDeConexao = null;
        try {
            // Tenta iniciar a Aceitadora (que começa a ouvir a porta)
            aceitadoraDeConexao = new AceitadoraDeConexao(porta);
            aceitadoraDeConexao.start();
        } catch (Exception erro) {
            System.err.println("Erro ao iniciar Servidor Socket: " + erro.getMessage());
            return;
        }

        // Loop para o comando de desligamento
        Scanner scanner = new Scanner(System.in);
        for(;;) {
            System.out.println("\nServidor Chatbot está ativo. Digite 'desativar' para encerrar.");
            System.out.print("> ");

            String comando = scanner.nextLine();

            if (comando.toLowerCase().equals("desativar")) {
                System.out.println("O servidor foi desativado (Parada Forçada).\n");
                System.exit(0);
            } else {
                System.err.println("Comando inválido!\n");
            }
        }
    }
}