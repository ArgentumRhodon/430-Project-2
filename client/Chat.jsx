import React, { useEffect, useState } from "react";
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
      console.log("Hey");
      socket.emit("message", { message, channel });
      setMessage("");
    }
  };

  socket.on("message", ({ message, from }) => {
    console.log(from);

    setChannel({
      label: channel.label,
      key: channel.key,
      messages: [...channel.messages, message],
    });
  });

  const onServerSelect = (e) => {
    setServer(servers[parseInt(e.key)]);
    setMessage("");
  };

  const onChannelSelect = (e) => {
    setChannel(server.channels[parseInt(e.key)]);
    setMessage("");
  };

  useEffect(() => {
    setChannel(server.channels[0]);
    socket.emit("room change", server.label);
  }, [server]);

  useEffect(() => {
    setPlaceholder(`Message ${channel.label}`);
  }, [channel.label]);

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Menu
          mode="vertical"
          items={servers}
          defaultSelectedKeys={[server.key.toString()]}
          style={menuStyle}
          onSelect={onServerSelect}
        />
      </Sider>
      <Layout style={innerLayoutStyle}>
        <Sider>
          <Menu
            mode="vertical"
            items={server.channels}
            selectedKeys={[channel.key.toString()]}
            style={menuStyle}
            onSelect={onChannelSelect}
          />
        </Sider>
        <Content style={contentStyles}>
          {channel.messages.map((message) => (
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
