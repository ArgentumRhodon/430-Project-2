import React, { useEffect, useState } from "react";
const { Sider, Content, Footer } = Layout;
import { Layout, Menu, Input, Button, Flex } from "antd";
import useSocket from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "../hooks/useAuth";

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
  padding: "1rem",
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

const chats = [
  {
    label: "Chat 1",
    key: 0,
  },
  {
    label: "Chat 2",
    key: 1,
  },
  {
    label: "Chat 3",
    key: 2,
  },
];

const Chat = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const user = useUser();

  const [chat, setChat] = useState(chats[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [placeholder, setPlaceholder] = useState(`Message ${chats[0]}`);

  const onSend = (e) => {
    if (!e.target.value) return;

    if (e.code === "Enter") {
      socket.emit("send message", message);
      setMessage("");
    }
  };

  socket.on("incoming message", (incomingMessage) => {
    setMessages([...messages, incomingMessage]);
  });

  const onChatSelect = (e) => {
    setChat(chats[e.key]);
    setMessage("");
  };

  useEffect(() => {
    socket.emit("room change", chat.label);
    setPlaceholder(`Message ${chat.label}`);
    setMessages([]);
  }, [chat]);

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Menu
          mode="vertical"
          items={chats}
          defaultSelectedKeys={["0"]}
          style={menuStyle}
          onSelect={onChatSelect}
        />
      </Sider>
      <Layout style={innerLayoutStyle}>
        <Content style={contentStyles}>
          {messages.map((message) => (
            <p>{message}</p>
          ))}
        </Content>
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
  );
};

export default Chat;
