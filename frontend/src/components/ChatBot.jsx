import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bot, Send, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 How can I assist you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = message;

    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/api/chatbot/chat`,
        {
          message: userInput,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={22} />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  AI Medical Assistant
                </h2>

                <p className="text-xs opacity-90">
                  Online • Ask your health queries
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white ml-auto rounded-br-md"
                      : "bg-white text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {/* Typing Loader */}
              {loading && (
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md w-fit shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>

            {/* Suggested Questions */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-white border-t">
              <button
                onClick={() =>
                  setMessage("I have fever and headache")
                }
                className="text-xs whitespace-nowrap bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
              >
                Fever
              </button>

              <button
                onClick={() =>
                  setMessage("Find a cardiologist")
                }
                className="text-xs whitespace-nowrap bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
              >
                Cardiologist
              </button>

              <button
                onClick={() =>
                  setMessage("Book appointment")
                }
                className="text-xs whitespace-nowrap bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
              >
                Appointment
              </button>
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />

              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-full hover:scale-105 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;