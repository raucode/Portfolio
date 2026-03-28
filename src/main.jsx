import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/responsive.css";
import "./styles/utilities.css"

/* Components Stiles */
import "./styles/components/button.css";
import "./styles/components/card.css";
import "./styles/components/container.css";
import "./styles/components/language.css";
import "./styles/components/section-heading.css";
import "./styles/components/tag.css";

/* Sections Stiles */
import "./styles/sections/about.css";
import "./styles/sections/configs.css";
import "./styles/sections/contact.css";
import "./styles/sections/hero.css";
import "./styles/sections/cv.css"
import "./styles/sections/projects.css";
import "./styles/sections/stack.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);