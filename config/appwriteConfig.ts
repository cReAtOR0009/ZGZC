import Constants from 'expo-constants';
import { Account, Client, Databases, ID, Storage } from 'appwrite';

const {
  EXPO_PUBLIC_APPWRITE_ENDPOINT,
  EXPO_PUBLIC_APPWRITE_PROJECT,
  EXPO_PUBLIC_APPWRITE_DB_ID,
  EXPO_PUBLIC_ATTENDEE_COLLECTION_ID,
  EXPO_PUBLIC_SESSION_COLLECTION_ID,
  EXPO_PUBLIC_USER_COLLECTION_ID,
} = Constants.expoConfig?.extra || {};

const client = new Client()
  .setEndpoint(EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(EXPO_PUBLIC_APPWRITE_PROJECT!);

export const appwriteClient = client;
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const IDGen = ID;

// console.log('Appwrite Endpoint:', Constants.expoConfig?.extra?.EXPO_PUBLIC_APPWRITE_PROJECT);

export const APPWRITE_DB_ID = EXPO_PUBLIC_APPWRITE_DB_ID!;
export const ATTENDEE_COLLECTION_ID = EXPO_PUBLIC_ATTENDEE_COLLECTION_ID!;
export const SESSION_COLLECTION_ID = EXPO_PUBLIC_SESSION_COLLECTION_ID!;
export const USER_COLLECTION_ID = EXPO_PUBLIC_USER_COLLECTION_ID!;
