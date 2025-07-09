import 'dotenv/config';

export default {
  expo: {
    name: "Church Accreditation",
    slug: "church-accreditation",
    version: "1.0.0",
    extra: {
      EXPO_PUBLIC_APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
      EXPO_PUBLIC_APPWRITE_PROJECT: process.env.EXPO_PUBLIC_APPWRITE_PROJECT,
      EXPO_PUBLIC_APPWRITE_DB_ID: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
      EXPO_PUBLIC_ATTENDEE_COLLECTION_ID: process.env.EXPO_PUBLIC_ATTENDEE_COLLECTION_ID,
      EXPO_PUBLIC_SESSION_COLLECTION_ID: process.env.EXPO_PUBLIC_SESSION_COLLECTION_ID,
      EXPO_PUBLIC_USER_COLLECTION_ID: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
    },
  },
};
