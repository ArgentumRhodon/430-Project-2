import React, { useState } from "react";
const { Sider, Content, Footer } = Layout;
import { Layout, Menu, Input } from "antd";
import useSocket from "./hooks/useSocket";

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

const servers = [
  {
    label: "Server 1",
    key: 0,
    channels: [
      { label: "General 1", key: 0, messages: [] },
      { label: "Help 1", key: 1, messages: [] },
    ],
  },
  {
    label: "Server 2",
    key: 1,
    channels: [
      { label: "General 2", key: 0, messages: [] },
      { label: "Help 2", key: 1, messages: [] },
    ],
  },
];

const Chat = () => {
  const socket = useSocket();

  const [server, setServer] = useState(servers[0]);
  const [channel, setChannel] = useState(servers[0].channels[0]);

  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("Message General 1");

  const onSend = (e) => {
    if (!e.target.value) return;

    if (e.code === "Enter") {
      socket.emit("message", message);
      setMessage("");
    }
  };

  // socket.on("message", (msg) => setMessages([...messages, msg]));

  const onServerSelect = (e) => {
    setServer(servers[e.key]);
    setChannel(server.channels[0]);
    setPlaceholder(`Message ${channel.label}`);
    setMessage("");
    socket.emit("room change", server.label);
    console.log(server, channel, e.key);
  };

  const onChannelSelect = (e) => {
    setChannel(server.channels[e.key]);
    setPlaceholder(`Message ${channel.label}`);
    console.log(server, channel, e.key);
  };

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Menu
          mode="vertical"
          defaultSelectedKeys={["0"]}
          items={servers}
          style={menuStyle}
          onSelect={onServerSelect}
        />
      </Sider>
      <Layout style={innerLayoutStyle}>
        <Sider>
          <Menu
            mode="vertical"
            defaultSelectedKeys={["0"]}
            items={server.channels}
            style={menuStyle}
            onSelect={onChannelSelect}
          />
        </Sider>
        <Content style={contentStyles}>
          {/* {serverMsgs[channelIndex].map((msg) => (
            <p>{msg}</p>
          ))} */}
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
