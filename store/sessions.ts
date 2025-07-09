// store/session.ts
import { APPWRITE_DB_ID, databases, SESSION_COLLECTION_ID } from '@/config/appwriteConfig';
import { create } from 'zustand';

export type Session = {
  $id: string;
  name: string;
  dayTime: string;
  time: string;
   attendeeIds: (string | { $id: string })[];
};

type SessionState = {
  sessions: Session[];
  currentSession: Session | null;
  setCurrentSession: (session: Session) => void;
  fetchSessions: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  currentSession: null,
  setCurrentSession: (session) =>
  set({
    currentSession: {
      ...session,
      attendeeIds: session.attendeeIds.map((item: any) =>
        typeof item === 'string' ? item : item.$id
      ),
    },
  }),
  fetchSessions: async () => {
    const res = await databases.listDocuments(APPWRITE_DB_ID, SESSION_COLLECTION_ID);

    // console.log("sessions------", res)
    set({ sessions: res.documents as Session[] });
  },
}));
