// hooks/useRealtimeSessionAttendance.ts
import { realtimeService } from "@/api/realtimeService";
import { APPWRITE_DB_ID, SESSION_COLLECTION_ID, databases } from "@/config/appwriteConfig";
import { useSessionStore } from "@/store/sessions";
import { useEffect } from "react";

export function useRealtimeSessionAttendance() {
  const { currentSession, setCurrentSession } = useSessionStore();

  useEffect(() => {
    if (!currentSession) return;

    const unsubscribe = realtimeService.subscribeToSingleSession(
      currentSession.$id,
      async () => {
        try {
          const updated = await databases.getDocument(
            APPWRITE_DB_ID,
            SESSION_COLLECTION_ID,
            currentSession.$id
          );

          setCurrentSession({
            ...currentSession,
            attendeeIds: updated.attendeeIds || [],
          });
        } catch (error) {
          console.error("Failed to update session attendee count:", error);
        }
      }
    );

    return () => unsubscribe(); // clean up on unmount or session change
  }, [currentSession?.$id]);
}
