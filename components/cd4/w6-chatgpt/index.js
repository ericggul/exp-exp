import { useState, useEffect } from "react";
import axios from "axios";

//call gpt from api/openai/gpt-4o

export default function ChatGPT() {
  const [systemContent, setSystemContent] = useState("");
  const [userContent, setUserContent] = useState("");
  const [response, setResponse] = useState("");

  async function fetchData() {
    if (systemContent && userContent) {
      try {
        const response = await axios.post("/api/openai/gpt-4o", {
          systemContent,
          userContent,
        });

        setResponse(response.data.text);
      } catch (error) {
        console.error("Failed to fetch data from OpenAI", error);
      }
    }
  }

  return (
    <div>
      <h1>Chat with GPT-4o</h1>
      <div>
        <label>
          System:
          <input type="text" value={systemContent} onChange={(e) => setSystemContent(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          User:
          <input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={fetchData}>Enter</button>
      </div>

      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
