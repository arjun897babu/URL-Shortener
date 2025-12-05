import mongoose, { connect } from "mongoose";
export default class ConnectDB {
  async connect() {
    try {
      const connection = await connect("");
    } catch (error) {}
  }
}
