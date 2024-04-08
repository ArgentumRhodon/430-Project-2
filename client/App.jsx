import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import io from "socket.io-client";

import { Layout, Menu, Input, theme, ConfigProvider } from "antd";
const { Sider, Content, Footer } = Layout;

// Socket Server Connection

const socket = io.connect("http://localhost:3001");

// Style objects
const siderStyle = {
  overflow: "auto",
  position: "fixed",
  height: "100vh",
  left: 0,
  top: 0,
  bottom: 0,
};

const innerLayoutStyle = {
  marginLeft: 200,
};

const contentStyles = {
  overflow: "initial",
  minHeight: "100vh",
};

const footerStyles = {
  position: "fixed",
  bottom: 0,
  left: 200,
  right: 0,
};

const menuStyle = {
  height: "100%",
};

const channels = [
  { label: "general", key: 0 },
  { label: "help", key: 1 },
];

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
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("Message #general");

  const onSend = (e) => {
    if (!e.target.value) return;

    if (e.code === "Enter") {
      console.log(message);
      socket.emit("message", message);
      setMessage("");
    }
  };

  const onMenuSelect = (e) => {
    const channel = channels.find((channel) => channel.key == e.key);
    setPlaceholder(`Message ${channel.label}`);
    setMessage("");
    socket.emit("room change", channel.label);
  };

  return (
    <ConfigProvider theme={appTheme}>
      <Layout>
        <Sider style={siderStyle}>
          <Menu
            mode="vertical"
            defaultSelectedKeys={["0"]}
            items={channels}
            style={menuStyle}
            onSelect={onMenuSelect}
          />
        </Sider>
        <Layout style={innerLayoutStyle}>
          <Content style={contentStyles}></Content>
          <Footer style={footerStyles}>
            <Input
              placeholder={placeholder}
              onInput={(e) => setMessage(e.target.value)}
              onKeyDown={onSend}
              value={message}
            />
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

const init = () => {
  const domNode = document.getElementById("app");
  const root = createRoot(domNode);
  root.render(<App />);
};

window.onload = init;
