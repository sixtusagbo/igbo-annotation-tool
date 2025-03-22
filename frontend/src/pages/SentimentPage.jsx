import { useState } from "react";
import { Link } from "react-router-dom";
import { analyzeSentiment } from "../services/apiService";
import { handleCopy, handleDownload } from "../utils";

export default function SentimentPage() {
  const [texts, setTexts] = useState([""]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await handleCopy(results, setCopied);
  };

  const onDownload = () => {
    handleDownload(results, "igbo-sentiment-analysis.json");
  };

  const handleTextChange = (index, value) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  const handleRemoveText = (index) => {
    if (texts.length === 1) return;
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
  };

  const handleAddText = () => {
    setTexts([...texts, ""]);
  };

  const handleSubmit = async () => {
    const validTexts = texts.filter((text) => text.trim().length > 0);
    if (validTexts.length === 0) return;

    setLoading(true);
    try {
      const data = await analyzeSentiment(validTexts);
      setResults(data);
    } catch (error) {
      console.error("Error during sentiment analysis:", error);
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
          Sentiment Analysis
        </h1>
        <p className="text-gray-600">
          Analyze the sentiment or emotional tone of Igbo text.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-4">
          {texts.map((text, index) => (
            <div key={index} className="flex mb-3">
              <textarea
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder={`Enter Igbo text ${index + 1}...`}
                className="flex-grow bg-gray-50 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => handleRemoveText(index)}
                disabled={texts.length === 1}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 disabled:opacity-50 rounded-r">
                -
              </button>
            </div>
          ))}
          <button
            onClick={handleAddText}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded text-sm mr-2">
            Add Text
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || texts.every((text) => !text.trim())}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
          {loading ? "Processing..." : "Analyze Sentiment"}
        </button>
      </div>

      {results && (
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

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Text
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Label
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {texts[index] || ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result[0]?.label || ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result[0]?.score ? result[0].score.toFixed(4) : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Raw Results:
            </h3>
            <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
