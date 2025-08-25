"use client";
import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [model, setModel] = useState("GPT-4");
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(100);
  const [response, setResponse] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [history, setHistory] = useState<
    { prompt: string; response: string }[]
  >([]);

  // Load theme from localStorage or system
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Save/apply theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Submit prompt to API
  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    try {
      const res = await fetch("/api/ai-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();
      setResponse(data.reply || "No response received.");
      setHistory((prev) => [...prev, { prompt, response: data.reply || "" }]);
    } catch (error) {
      console.error("Error calling API:", error);
      setResponse("❌ Error calling API.");
    }
  };

  // Clear prompt and response on New Chat
  const handleNewChat = () => {
    setPrompt("");
    setResponse("");
  };

  // Copy response text to clipboard
  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      alert("Response copied to clipboard!");
    }
  };

  // Download response text as file
  const handleDownload = () => {
    if (response) {
      const blob = new Blob([response], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nova-response.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Nova Chat</h2>

          <button
            onClick={handleNewChat}
            className="block w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded cursor-pointer"
          >
            ➕ New Chat
          </button>

          {/* History button with hover dropdown */}
          <div className="relative group">
            <button className="block w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
              📜 History
            </button>

            <div className="absolute left-0 top-full mt-1 w-72 max-h-64 overflow-y-auto bg-white dark:bg-gray-700 rounded shadow-lg p-3 text-sm z-20 hidden group-hover:block">
              {history.length === 0 ? (
                <p className="text-gray-500">No history</p>
              ) : (
                <ul className="space-y-3">
                  {history.map((item, idx) => (
                    <li
                      key={idx}
                      className="border-b border-gray-300 dark:border-gray-600 pb-2"
                    >
                      <p>
                        <strong>Q:</strong> {item.prompt}
                      </p>
                      <p className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        <strong>A:</strong> {item.response}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button className="block w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
            ⚙️ Settings
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-6 flex items-center gap-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded cursor-pointer"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-4 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Nova Chat</h1>
          <select
            className="border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 cursor-pointer"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option>GPT-4</option>
            <option>GPT-3.5</option>
            <option>Custom</option>
          </select>
        </div>

        {/* Prompt */}
        <div>
          <label className="block font-medium mb-1 text-center">
            Enter Prompt
          </label>
          <div className="relative">
            <textarea
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-800 mt-1 p-2 rounded h-24 pr-12 resize-none"
              placeholder="Ask Anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="absolute bottom-10 right-2 bg-black dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm shadow cursor-pointer"
            >
              <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
            </button>
          </div>
        </div>

        {/* Parameters */}
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <label className="block mb-1 font-medium">
              Temperature: {temperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-green-600 cursor-pointer"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Max Tokens: {maxTokens}
            </label>
            <input
              type="range"
              min="10"
              max="400"
              step="10"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full accent-green-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Output */}
        <div className="border bg-gray-50 dark:bg-gray-800 p-4 rounded min-h-[250px]">
          <pre className="whitespace-pre-wrap">{response}</pre>

          {response && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleCopy}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                📋 Copy Response
              </button>
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              >
                ⬇️ Download Response
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
