const devURL = "http://localhost:3000";
const prodURL = "https://tempie-server-b490ad9cab9b.herokuapp.com";
const targetURL = devURL;

export const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (handler) handler(result);
};

export const sendGet = async (url, handler) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (handler) handler(result);

  return result;
};

const login = (e, handler) => {
  if (!e.email || !e.password) {
    return false;
  }

  sendPost(`${targetURL}/login`, e, handler);

  return false;
};

const signup = (e, handler) => {
  if (!e.email || !e.username || !e.password) {
    return false;
  }

  sendPost(`${targetURL}/signup`, e, handler);

  return false;
};

const logout = (handler) => {
  sendGet(`${targetURL}/logout`, handler);
  return false;
};

export const useAuth = () => [login, signup, logout];
export const useUser = () => sendGet(`${targetURL}/user`);
