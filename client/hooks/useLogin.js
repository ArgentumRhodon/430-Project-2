/* Sends post requests to the server using fetch. Will look for various
   entries in the response JSON object, and will handle them appropriately.
*/

import sendPost from "../utils/poster.js";

// const sendDelete = async (url, data, handler) => {
//   const response = await fetch(url, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();

//   if (result.redirect) {
//     window.location = result.redirect;
//   }

//   if (result.error) {
//     handleError(result.error);
//   }

//   if (handler) {
//     handler(result);
//   }
// };

const handleLogin = (e) => {
  if (!e.email || !e.password) {
    console.log("Username or password is empty!");
    return false;
  }

  sendPost("http://localhost:3000/login", e);
  return false;
};

const useLogin = () => handleLogin;

export default useLogin;
