import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await axios.post("https://testzeus.com/hercules", { input });
      setResult(response.data.output);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TestZeus-Hercules Interface</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input">Enter Input:</label>
          <input
            id="input"
            type="text"
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <div className="loader"></div> : "Submit"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {result && (
          <section>
            <h2>Result</h2>
            <pre>{result}</pre>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
