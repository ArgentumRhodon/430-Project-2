import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

const buttonStyle = {
  width: "100%",
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "Not a valid email!",
  },
};

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();

  const onSignup = (res) => {
    console.log(res);

    if (!res.error) navigate("/app", { replace: true });
  };

  return (
    <Form
      layout="vertical"
      onFinish={(e) => signup(e, onSignup)}
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

export default SignupForm;
