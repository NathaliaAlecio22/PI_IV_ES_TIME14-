// TratadoraDeCliente.java
import java.io.IOException;
// Imports necessários para o MongoDB
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;

public class TratadoraDeCliente extends Thread {
    private Parceiro cliente;

    public TratadoraDeCliente(Parceiro cliente) {
        this.cliente = cliente;
    }

    // Método 'run' modificado para chamar o MongoDB
    public void run() {
        try {
            // 1. Recebe a Pergunta (como String)
            String pergunta = this.cliente.envie();
            String respostaTexto;


            // 2. Busca a resposta no MongoDB
            respostaTexto = buscarRespostaNoMongo(pergunta.toLowerCase());

            // 3. Envia a Resposta (como String)
            this.cliente.receba(respostaTexto);

        } catch (Exception erro) {
            System.err.println("Erro na comunicação com o Cliente: " + erro.getMessage());
        } finally {
            try {
                this.cliente.adeus(); // Fecha a conexão
            } catch (IOException e) {}
        }
    }

    /**
     * Busca a resposta no MongoDB com base em palavras-chave.
     */
    private String buscarRespostaNoMongo(String pergunta) {
        try {
            // 1. Obtém a coleção 'regras' do nosso Singleton de conexão
            MongoCollection<Document> colecao = MongoConnection.getConhecimentoCollection();

            String palavraChave = "default"; // Resposta padrão
            if (pergunta.contains("poda")) palavraChave = "poda";
            if (pergunta.contains("risco")) palavraChave = "risco";
            if (pergunta.contains("altura")) palavraChave = "altura";



            // 3. Busca o documento no Mongo que bate com a palavra-chave
            Document doc = colecao.find(Filters.eq("palavra_chave", palavraChave)).first();

            if (doc != null) {
                // Retorna o campo "resposta" do documento
                return doc.getString("resposta");
            } else {
                // Se não encontrar a palavra-chave (ex: "poda"), busca a resposta "default"
                Document defaultDoc = colecao.find(Filters.eq("palavra_chave", "default")).first();
                if (defaultDoc != null) return defaultDoc.getString("resposta");
            }

        } catch (Exception e) {
            System.err.println("Erro ao consultar MongoDB: " + e.getMessage());
            return "Ocorreu um erro interno no Chatbot ao acessar a base de conhecimento.";
        }

        // Fallback final se até o "default" falhar
        return "Desculpe, não entendi sua pergunta. Tente 'poda', 'risco' ou 'altura'.";
    }
}