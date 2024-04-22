const sendGet = async (url, handler) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (handler) handler(result);
};

export default sendGet;
