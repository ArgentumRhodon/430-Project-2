import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Layout, Flex, Card } from "antd";
import { LoginForm, SignupForm } from "../components";
const { Content } = Layout;

const flexStyle = {
  height: "100vh",
};

const cardStyle = {
  textAlign: "center",
  width: "300px",
};

const Login = () => {
  const [displayLogin, setDisplayLogin] = useState(true);
  const [login, signup] = useAuth();

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
            {displayLogin ? (
              <LoginForm login={login} />
            ) : (
              <SignupForm signup={signup} />
            )}
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
