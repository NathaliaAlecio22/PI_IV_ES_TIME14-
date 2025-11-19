import NavBar from "../NavBar/NavBar";
import ChatBot from "../ChatBot/ChatBot";
import "./ChatBotPage.css";

const ChatBotPage = () => {
    return (
        <>
            <NavBar />
            <div className="chatbot-page-container">
                <ChatBot modoPagina={true} />
            </div>
        </>
    );
};

export default ChatBotPage;
