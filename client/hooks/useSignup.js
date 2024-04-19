import sendPost from "../utils/poster.js";

const handleSignup = (e) => {
  if (!e.email || !e.username || !e.password) {
    console.log("All fields required!");
    return false;
  }

  sendPost("http://localhost:3000/signup", e);
  return false;
};

const useSignup = () => handleSignup;

export default useSignup;
