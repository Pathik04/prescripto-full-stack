import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/chatbot/chat",
        {
          message,
        }
      );

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);
    }

    setMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-xl p-4">
      <div className="h-80 overflow-y-auto mb-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <p className="bg-gray-100 inline-block p-2 rounded-lg">
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full p-2 rounded"
          placeholder="Ask something..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;