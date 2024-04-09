import React, { useState } from "react";
import { Layout, Flex, Card, Form, Input, Button } from "antd";
const { Content } = Layout;

const flexStyle = {
  height: "100vh",
};

const cardStyle = {
  width: "300px",
};

const SignupForm = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Nick Name" name="displayName">
        <Input />
      </Form.Item>
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

const LoginForm = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

const Login = () => {
  const [displayLogin, setDisplayLogin] = useState(false);

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
          </Card>
          <Button onClick={() => setDisplayLogin(!displayLogin)}>
            {displayLogin ? "Need an account?" : "Already have an account?"}
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default Login;
