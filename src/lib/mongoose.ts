import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

declare global {
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

if (!global._mongoosePromise) {
  global._mongoosePromise = mongoose.connect(MONGO_URI, { dbName: "playbook" });
}

export default global._mongoosePromise!;
