import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error('Missing application root element "#root".');

createRoot(root).render(<StrictMode><App /></StrictMode>);
