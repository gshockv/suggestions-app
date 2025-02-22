import { Client, Databases, ID } from "appwrite";

const DB_ID = "67b9c15e002569ff03df";
const COLLECTION_ID = "67b9c188000f837d2641";

const client = new Client();
client.setProject('67b9b83a0022cb44cdd1');

export const databases = new Databases(client);
export { DB_ID, COLLECTION_ID, ID };
