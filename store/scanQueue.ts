import {
  ATTENDEE_COLLECTION_ID,
  databases,
  APPWRITE_DB_ID as DB_ID,
  SESSION_COLLECTION_ID,
} from "@/config/appwriteConfig";
import NetInfo from "@react-native-community/netinfo";
import { Query } from "appwrite";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Session } from "./sessions";

type Scan = {
  qrId: string;
  timestamp: number;
};

type ScanQueueState = {
  queue: Scan[];
  addToQueue: (scan: Scan) => void;
  syncQueue: (currentSession: Session) => Promise<void>;
  getQueue: () => Scan[];
};

export const useScanQueue = create(
  persist<ScanQueueState>(
    (set, get) => ({
      queue: [],

      addToQueue: (scan) => {
        set((state) => {
          const exists = state.queue.some((s) => s.qrId === scan.qrId);
          if (exists) return state; // do not add duplicate
          return { queue: [...state.queue, scan] };
        });
      },

      syncQueue: async (currentSession) => {
        const { queue } = get();
        const netInfo = await NetInfo.fetch();
        const updatedQueue: Scan[] = [];
        
        try {
          if (!netInfo.isConnected) throw new Error("No network connection");
          
          if (!currentSession || !currentSession.$id) {
            console.warn("No current session selected");
            return;
          }

          let updatedAttendeeIds = [...(currentSession.attendeeIds || [])];

          for (const scan of queue) {
            try {
              const res = await databases.listDocuments(
                DB_ID,
                ATTENDEE_COLLECTION_ID,
                [Query.equal("qrId", scan.qrId)]
              );

              const attendee = res.documents[0];

              if (!attendee) {
                console.warn(`Attendee not found for QR: ${scan.qrId}`);
                continue;
              }

              // Mark as accredited
              if (!attendee.accredited) {
                await databases.updateDocument(
                  DB_ID,
                  ATTENDEE_COLLECTION_ID,
                  attendee.$id,
                  { accredited: true }
                );
              }

              // Add to session if not already present
              if (!updatedAttendeeIds.includes(attendee.$id)) {
                updatedAttendeeIds.push(attendee.$id);
              }
            } catch (e) {
              console.error(`Failed to sync scan for qrId ${scan.qrId}:`, e);
              updatedQueue.push(scan); // retry later
            }
          }

          // Update the session with new attendeeIds if changed
          if (
            updatedAttendeeIds.length !==
            (currentSession.attendeeIds?.length || 0)
          ) {
            await databases.updateDocument(
              DB_ID,
              SESSION_COLLECTION_ID,
              currentSession.$id,
              {
                attendeeIds: updatedAttendeeIds,
              }
            );
          }
        } catch (err) {
          console.error("Error during syncQueue:", err);
        }

        set({ queue: updatedQueue });
      },

      getQueue: () => get().queue,
    }),
    {
      name: "scan-queue",
    }
  )
);