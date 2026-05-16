import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HistoryProvider } from "./context/HistoryContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import History from "./pages/History";
import About from "./pages/About";

export default function App() {
  return (
    <HistoryProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </HistoryProvider>
  );
}