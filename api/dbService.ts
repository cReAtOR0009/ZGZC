import { APPWRITE_DB_ID, databases } from '@/config/appwriteConfig';

export const dbService = {
  listDocuments: async (collectionId: string, queries = []) => {
    return await databases.listDocuments(APPWRITE_DB_ID, collectionId, queries);
  },

  getDocument: async (collectionId: string, documentId: string) => {
    return await databases.getDocument(APPWRITE_DB_ID, collectionId, documentId);
  },

  createDocument: async (collectionId: string, data: any, id = 'unique()') => {
    return await databases.createDocument(APPWRITE_DB_ID, collectionId, id, data);
  },

  updateDocument: async (collectionId: string, documentId: string, data: any) => {
    return await databases.updateDocument(APPWRITE_DB_ID, collectionId, documentId, data);
  },

  deleteDocument: async (collectionId: string, documentId: string) => {
    return await databases.deleteDocument(APPWRITE_DB_ID, collectionId, documentId);
  },
};
