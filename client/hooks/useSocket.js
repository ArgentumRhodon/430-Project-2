import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const useSocket = () => socket;

export default useSocket;
