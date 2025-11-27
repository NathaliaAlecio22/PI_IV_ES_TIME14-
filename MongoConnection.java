// MongoConnection.java
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class MongoConnection {

    // --- 1. SUA STRING DE CONEXÃO DO ATLAS ---
    // (A mesma que você usou no application-secret.properties do Spring)
    private static final String CONNECTION_STRING =;

    // --- 2. OBJETOS ESTÁTICOS (SINGLETON) ---
    // Mantemos uma única instância do cliente para todo o servidor.
    private static MongoClient mongoClient = null;
    private static MongoDatabase database = null;

    /**
     * Inicializa o MongoClient e o Database.
     * Este método é chamado automaticamente na primeira vez que pedimos a coleção.
     */
    private static void initialize() {
        if (mongoClient == null) {
            try {
                // Cria o cliente de conexão
                mongoClient = MongoClients.create(CONNECTION_STRING);

                // Define o banco de dados que o Chatbot usará
                database = mongoClient.getDatabase("arborismo_chatbot_db");

                System.out.println("Conexão com o MongoDB Atlas estabelecida!");

            } catch (Exception e) {
                System.err.println("ERRO AO CONECTAR AO MONGODB ATLAS: " + e.getMessage());
                // Se a conexão falhar, o servidor de socket continuará rodando,
                // mas a lógica de busca do chatbot falhará.
            }
        }
    }

    /**
     * Este é o método que a TratadoraDeCliente usará para buscar os dados.
     * Retorna a coleção específica onde as regras de diálogo estão salvas.
     */
    public static MongoCollection<Document> getConhecimentoCollection() {
        if (database == null) {
            initialize(); // Conecta na primeira chamada
        }

        return database.getCollection("regras");
    }

}
