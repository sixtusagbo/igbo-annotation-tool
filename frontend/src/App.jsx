import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NERPage from "./pages/NERPage";
import POSPage from "./pages/POSPage";
import SentimentPage from "./pages/SentimentPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
