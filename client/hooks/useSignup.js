import sendPost from "../utils/poster.js";

const handleSignup = (e, handler) => {
  if (!e.email || !e.username || !e.password) {
    console.log("All fields required!");
    return false;
  }

  sendPost("http://localhost:3000/signup", e, handler);
  return false;
};

const useSignup = () => handleSignup;

export default useSignup;
