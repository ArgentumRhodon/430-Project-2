import sendGet from "../utils/getter.js";

const handleLogout = (handler) => {
  sendGet("http://localhost:3000/logout", handler);
  return false;
};

const useLogout = () => handleLogout;

export default useLogout;
