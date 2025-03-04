import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [strategy, setStrategy] = useState("simple");
  const [annotations, setAnnotations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(annotations, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/annotate?strategy=${strategy}`,
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setAnnotations(response.data);
    } catch (error) {
      console.error("There was an error processing your request: " + error);
    }
    setLoading(false);
  };
  return (
    <div className="bg-red-700 min-h-screen flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold text-white mb-4">
        Igbo Annotation Tool
      </h1>
      <div className="flex items-center mb-4">
        <label className="text-white mb-2">Aggregation Strategy: &nbsp;</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="bg-white p-2 rounded">
          <option value="none">None</option>
          <option value="simple">Simple</option>
          <option value="first">First</option>
          <option value="average">Average</option>
          <option value="max">Max</option>
        </select>
      </div>
      <textarea
        value={text}
        cols="50"
        rows="4"
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Igbo Text..."
        className="mb-4 bg-white p-4"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? "Processing..." : "Annotate"}
      </button>

      {annotations && (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-white">Result</h1>
            <button
              onClick={handleCopy}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="bg-white p-4 rounded">
            {JSON.stringify(annotations, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
