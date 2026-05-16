import { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  const addToHistory = (entry) => {
    // entry: { amount, fromCurrency, toCurrency, result, date }
    setHistory((prev) => [entry, ...prev]);
  };

  const clearHistory = () => setHistory([]);

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}