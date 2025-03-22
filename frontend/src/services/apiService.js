import axios from "axios";
import config from "../config";

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const annotateNER = async (text, strategy = "simple") => {
  try {
    const response = await apiClient.post(`/annotate/ner?strategy=${strategy}`, { text });
    return response.data;
  } catch (error) {
    console.error("Error in NER annotation:", error);
    throw error;
  }
};

export const annotatePOS = async (text, strategy = "simple") => {
  try {
    const response = await apiClient.post(`/annotate/pos?strategy=${strategy}`, { text });
    return response.data;
  } catch (error) {
    console.error("Error in POS annotation:", error);
    throw error;
  }
};

export const analyzeSentiment = async (texts) => {
  try {
    const response = await apiClient.post(`/annotate/sentiment-analysis`, { texts });
    return response.data;
  } catch (error) {
    console.error("Error in sentiment analysis:", error);
    throw error;
  }
};
