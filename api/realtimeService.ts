import { APPWRITE_DB_ID, appwriteClient, ATTENDEE_COLLECTION_ID } from '@/config/appwriteConfig';

type Callback = (payload: any) => void;

export const realtimeService = {
  /**
   * Subscribes to all attendee document changes
   */
  subscribeToAttendeeChanges: (callback: Callback) => {
    const unsubscribe = appwriteClient.subscribe(
      [`databases.${APPWRITE_DB_ID}.collections.${ATTENDEE_COLLECTION_ID}.documents`],
      (response) => {
        callback(response);
      }
    );

    return () => unsubscribe(); // cleanup
  },

  /**
   * Subscribes to all session document changes
   */
  subscribeToSessionChanges: (callback: Callback) => {
    const unsubscribe = appwriteClient.subscribe(
      [`databases.${APPWRITE_DB_ID}.collections.sessions.documents`],
      (response) => {
        callback(response);
      }
    );

    return () => unsubscribe(); // cleanup
  },

  /**
   * Subscribes to changes in a specific session document (by session ID)
   */
  subscribeToSingleSession: (sessionId: string, callback: Callback) => {
    const unsubscribe = appwriteClient.subscribe(
      [`databases.${APPWRITE_DB_ID}.collections.sessions.documents.${sessionId}`],
      (response) => {
        callback(response);
      }
    );

    return () => unsubscribe(); // cleanup
  },

  /**
   * Subscribes to changes in a specific attendee document (by attendee ID)
   */
  subscribeToSingleAttendee: (attendeeId: string, callback: Callback) => {
    const unsubscribe = appwriteClient.subscribe(
      [`databases.${APPWRITE_DB_ID}.collections.${ATTENDEE_COLLECTION_ID}.documents.${attendeeId}`],
      (response) => {
        callback(response);
      }
    );

    return () => unsubscribe(); // cleanup
  },
};
