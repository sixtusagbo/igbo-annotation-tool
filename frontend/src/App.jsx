import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NERPage from "./pages/NERPage";
import POSPage from "./pages/POSPage";
import SentimentPage from "./pages/SentimentPage";

const GithubIcon = () => (
  <svg height="32" viewBox="0 0 16 16" width="32" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <a
          href="https://github.com/sixtusagbo/igbo-annotation-tool"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors transform rotate-12 hover:rotate-0 z-50"
          aria-label="View source on GitHub">
          <GithubIcon />
        </a>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ner" element={<NERPage />} />
          <Route path="/pos" element={<POSPage />} />
          <Route path="/sentiment" element={<SentimentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
