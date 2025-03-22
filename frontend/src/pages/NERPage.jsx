import { useState } from "react";
import { Link } from "react-router-dom";
import { annotateNER } from "../services/apiService";
import { handleCopy, handleDownload } from "../utils";

export default function NERPage() {
  const [text, setText] = useState("");
  const [strategy, setStrategy] = useState("simple");
  const [annotations, setAnnotations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await handleCopy(annotations, setCopied);
  };

  const onDownload = () => {
    handleDownload(annotations, "igbo-ner-annotations.json");
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const data = await annotateNER(text, strategy);
      setAnnotations(data);
    } catch (error) {
      console.error("Error during NER annotation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="mb-8">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Home
        </Link>
      </nav>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Named Entity Recognition
        </h1>
        <p className="text-gray-600">
          Identify entities such as people, organizations, and locations in Igbo
          text.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Aggregation Strategy:
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full md:w-auto bg-gray-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="none">None</option>
            <option value="simple">Simple</option>
            <option value="first">First</option>
            <option value="average">Average</option>
            <option value="max">Max</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter Igbo Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Chinua Achebe bụ onye edemede Nigeria"
            className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
          {loading ? "Processing..." : "Annotate Text"}
        </button>
      </div>

      {annotations && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Results</h2>
            <div className="space-x-2">
              <button
                onClick={onCopy}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded text-sm">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={onDownload}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded text-sm">
                Download
              </button>
            </div>
          </div>
          <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(annotations, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
