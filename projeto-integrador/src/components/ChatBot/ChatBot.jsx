import { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";
import botIcon from "../../assets/Logo_username.png";
import sendIcon from "../../assets/mandar.png";

const ChatBot = () => {
    const [mensagem, setMensagem] = useState("");
    const [chat, setChat] = useState([]);
    const [digitando, setDigitando] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chat, digitando]);

    const enviarMensagem = async () => {
        if (!mensagem.trim()) return;

        const texto = mensagem;
        setMensagem("");

        setChat((prev) => [...prev, { autor: "user", texto }]);
        setDigitando(true);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                    "Authorization": `Bearer ${token}`  // 👈 OBRIGATÓRIO PARA NÃO DAR 403
                },
                body: texto,
            });

            if (!response.ok) {
                throw new Error("Erro do servidor");
            }

            const resposta = await response.text();
            setChat((prev) => [...prev, { autor: "bot", texto: resposta }]);
        } catch (error) {
            setChat((prev) => [
                ...prev,
                { autor: "bot", texto: "Erro ao conectar com o ChatBot." },
            ]);
        }

        setDigitando(false);
    };


    return (
        <div className={styles.chatPage}>
            <div className={styles.chatHeader}>
                <img src={botIcon} alt="Bot" className={styles.headerIcon} />
                <span>ChatBot Sentinela</span>
            </div>

            <div className={styles.chatBody} ref={chatRef}>
                {chat.map((msg, i) => (
                    <div
                        key={i}
                        className={msg.autor === "user" ? styles.msgUser : styles.msgBot}
                    >
                        {msg.texto}
                    </div>
                ))}
            </div>

            <div className={styles.chatInput}>
                <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && enviarMensagem()}
                />
                <button onClick={enviarMensagem}>
                    <img src={sendIcon} alt="Enviar" />
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
