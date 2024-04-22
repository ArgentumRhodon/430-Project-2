import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { Chat, Login, Intro } from "./pages";

import { theme, ConfigProvider } from "antd";

const appTheme = {
  algorithm: theme.darkAlgorithm,
  components: {
    Menu: {
      itemSelectedBg: "rgba(255, 255, 255, 0.3)",
      itemSelectedColor: "fff",
    },
  },
};

const App = () => {
  return (
    <ConfigProvider theme={appTheme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/app" element={<Chat />} />
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
};

const init = () => {
  const domNode = document.getElementById("app");
  const root = createRoot(domNode);
  root.render(<App />);
};

window.onload = init;
