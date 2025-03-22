/**
 * Utility functions for handling analysis results
 */

/**
 * Copy results data to clipboard
 * @param {Object} data - The data to be copied
 * @returns {Promise<boolean>} - True if copy was successful
 */
export const handleCopy = async (data, setCopied) => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};

/**
 * Download results data as a JSON file
 * @param {Object} data - The data to be downloaded
 * @param {string} filename - The name of the file to be downloaded
 */
export const handleDownload = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
