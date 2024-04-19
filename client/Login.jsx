import React, { useState } from "react";
import { Layout, Flex, Card, Form, Input, Button } from "antd";
import useSignup from "./hooks/useSignup";
import useLogin from "./hooks/useLogin";
const { Content } = Layout;

const flexStyle = {
  height: "100vh",
};

const cardStyle = {
  textAlign: "center",
  width: "300px",
};

const buttonStyle = {
  width: "100%",
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "Not a valid email!",
  },
};

const SignupForm = () => {
  const signupHelper = useSignup();

  return (
    <Form
      layout="vertical"
      onFinish={signupHelper}
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={buttonStyle}>
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

const LoginForm = () => {
  const loginHelper = useLogin();

  return (
    <Form
      layout="vertical"
      onFinish={loginHelper}
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            required: "true",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={buttonStyle}>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

const Login = () => {
  const [displayLogin, setDisplayLogin] = useState(true);

  return (
    <Layout>
      <Content>
        <Flex
          justify="center"
          align="center"
          gap="middle"
          vertical
          style={flexStyle}
        >
          <Card title={displayLogin ? "Log In" : "Sign Up"} style={cardStyle}>
            {displayLogin ? <LoginForm /> : <SignupForm />}
            <a onClick={() => setDisplayLogin(!displayLogin)}>
              {displayLogin ? "Need an account?" : "Already have an account?"}
            </a>
          </Card>
        </Flex>
      </Content>
    </Layout>
  );
};

export default Login;
