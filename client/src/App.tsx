import { useEffect, useState } from "react";
import { connect } from "socket.io-client";
import { api } from "./lib/api";

import "./app.css";

interface Message {
  id: string;
  author: string;
  text: string;
}

export const socket = connect("http://localhost:3001");

function App() {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (author.length <= 0) {
      return alert("Author is required");
    }

    if (text.length <= 0) {
      return alert("Message is required");
    }

    socket.emit("send_message", { author: author, text: text });
    setText("");
  };

  const getData = async () => {
    api.get("/message").then((response) => {
      setMessages(response.data);
    });
  };

  useEffect(() => {
    socket.on("receive_message", () => {
      getData();
    });

    getData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Chat App</h1>
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </header>
      <main>
        <div className="messages">
          {messages.map((message) => {
            return (
              <p key={message.id}>
                {message.author}: {message.text}
              </p>
            );
          })}
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Your Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  );
}

export default App;
