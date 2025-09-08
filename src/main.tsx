import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./App.css";

createRoot(document.getElementById("root")!).render(<App />);
const originalConsoleError = console.error;
console.error = function (...args) {
  if (typeof args[0] === "string" && args[0].includes("404 Error")) {
    // ignora os logs de rota inexistente
    return;
  }
  originalConsoleError.apply(console, args);
};
