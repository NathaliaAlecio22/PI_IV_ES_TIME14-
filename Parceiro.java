// Parceiro.java (Modificado para DataStream)
import java.net.Socket;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;

public class Parceiro {

    private Socket conexao;
    private DataInputStream receptor;
    private DataOutputStream transmissor;

    public Parceiro(Socket conexao) throws IOException {
        this.conexao = conexao;

        // Streams para dados primitivos
        this.transmissor = new DataOutputStream(conexao.getOutputStream());
        this.receptor = new DataInputStream(conexao.getInputStream());
    }

    // Método para enviar uma String
    public void receba(String texto) throws Exception {
        this.transmissor.writeUTF(texto);
        this.transmissor.flush();
    }

    // Método para receber uma String
    public String envie() throws Exception {
        return this.receptor.readUTF();
    }

    public void adeus() throws IOException {
        if (this.conexao != null) this.conexao.close();
        if (this.receptor != null) this.receptor.close();
        if (this.transmissor != null) this.transmissor.close();
    }
}