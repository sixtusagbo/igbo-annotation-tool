import { Link } from "react-router-dom";
import config from "../config";

export default function HomePage() {
  const projectDescription =
    "An advanced annotation tool for the Igbo language, providing Named Entity Recognition (NER), Part of Speech (POS) tagging, and Sentiment Analysis capabilities.";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Igbo Annotation Tool
        </h1>
        <p className="text-xl text-gray-600">{projectDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          to="/ner"
          className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition-all">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
            Named Entity Recognition
          </h2>
          <p className="text-gray-600">
            Identify named entities like people, organizations, and locations in
            Igbo text.
          </p>
        </Link>

        <Link
          to="/pos"
          className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition-all">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
            Part of Speech Tagging
          </h2>
          <p className="text-gray-600">
            Analyze grammatical structure by identifying parts of speech in Igbo
            text.
          </p>
        </Link>

        <Link
          to="/sentiment"
          className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition-all">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
            Sentiment Analysis
          </h2>
          <p className="text-gray-600">
            Determine the sentiment and emotional tone of Igbo text.
          </p>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          About the Project
        </h2>
        <p className="text-gray-600 mb-4">
          This project provides an intuitive interface for natural language
          processing tasks in the Igbo language. Built with modern web
          technologies, it leverages state-of-the-art NLP models specifically
          trained for Igbo language analysis.
        </p>
        <p className="text-gray-600 mb-4">
          The tool is designed for researchers, linguists, and developers
          working with Igbo language data.
        </p>
        <p className="text-gray-600">
          This project was built as CSC 451 project assignment of Group 5.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Project Team
        </h2>
        <p className="text-gray-600 mb-6">
          Built with love by Group 5 members.
        </p>

        <div className="space-y-8">
          {Object.entries(config.teamMembers).map(
            ([chapter, members], index) => (
              <div
                key={chapter}
                className={
                  index !== Object.keys(config.teamMembers).length - 1
                    ? "border-b pb-6"
                    : ""
                }>
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                  {chapter}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {members.map((member, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 text-center">
                      <h4 className="text-lg font-medium text-gray-800">
                        {member.name}
                      </h4>
                      <p className="text-gray-600">Reg No: {member.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
