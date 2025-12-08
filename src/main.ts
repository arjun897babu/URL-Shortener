import Server from "@/config/app";
import ConnectDB from "./config/db";

const db = new ConnectDB();
const server = new Server(db);

server.startServer();
