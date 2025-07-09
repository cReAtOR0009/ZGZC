# 📱 Church Convention Accreditation App

A robust mobile application built with **React Native (Expo)** and powered by **Appwrite**, designed to simplify and streamline the accreditation and attendance process during large church conventions or events.

## ✨ Features

- **QR Code Scanning for Accreditation**
  - Fast and reliable attendee check-in using QR codes.
  - Offline mode with queued sync when internet is unavailable.
  
- **Session Management**
  - Auto-select or manually assign current session.
  - Add attendees to sessions in real-time.
  
- **Real-Time Attendance**
  - Live sync of attendees per session.
  - Dynamic search and filtering by name, email, company, etc.

- **Attendee Profiles**
  - View full attendee details, photo, contact, and session attendance history.
  - Searchable, sortable list with pull-to-refresh.
  
- **Offline Support**
  - Queue scans when offline and sync once online.
  - Persistent offline storage using SecureStore and Zustand.

- **Role-Based Access (Planned)**
  - Admin/staff login system.
  - Secure access control.

- **Export Options (Planned)**
  - Export attendees or session participants as CSV or PDF.

---

## 🧠 Tech Stack

| Layer              | Tech                                         |
|-------------------|----------------------------------------------|
| Frontend UI       | React Native (Expo), TypeScript              |
| State Management  | Zustand with SecureStore + AsyncStorage      |
| Backend as a Service | Appwrite (Databases, Auth, Storage, Realtime) |
| QR Scanning       | Expo Camera                                  |
| Network Awareness | `@react-native-community/netinfo`            |
| Navigation        | Expo Router (React Navigation under the hood) |

---

## 🏗️ Project Structure




---

## 🧪 Setup & Development

### 🚀 Prerequisites

- Node.js & npm
- Expo CLI
- Appwrite instance (or use Appwrite Cloud)
- Android/iOS emulator or physical device

### ⚙️ Installation

```bash
git clone https://github.com/[yourusername]/church-accreditation-app.git
cd church-accreditation-app
npm install
```

### ⚙️ Starting app

```bash
npx expo start
```


###  Make sure to configure your .env or appwriteConfig.ts file with valid Appwrite credentials:

.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('<YOUR_PROJECT_ID>')
.setDevKey('<YOUR_API_KEY>')

export const APPWRITE_DB_ID = '<YOUR_DB_ID>';
export const ATTENDEE_COLLECTION_ID = '<COLLECTION_ID>';
export const SESSION_COLLECTION_ID = '<COLLECTION_ID>';

### 🔐 Authentication

-Zustand + Appwrite Auth is used for login/logout:
-Email/password-based login
-Session persistence via SecureStore
-Sessions are restored using account.get() on app load.


#### QR Scanning Flow
-Scan attendee's QR (matches against qrId).
-If offline, store to queue using Zustand.
-If online:
-Mark attendee as accredited.
-Add to current session’s attendeeIds.

#### Offline Sync Queue
-Scanned while offline? Stored in local queue (scanQueue).
-Automatically synced when online.
-Manual retry button (planned).

#### Upcoming Features
-Admin dashboard and role-based permissions
-Badge printing and certificate export
-Attendance heatmaps per session
-Push notifications for session updates
-Email/SMS confirmation to attendees

#### Security Notes
-Sensitive data is stored securely using expo-secure-store.
-Appwrite API key is scoped appropriately.
-Authentication is enforced via session token.


#### Contributing
We welcome pull requests and contributions!

```bash
   git checkout -b feature/your-feature-name
   npm run lint
   npm run test
```

Open a PR against main

License
MIT License ©Creator

#### Contact
For questions, support, or feature requests:

📧 Email: epidnugoairdrop@gmail.com

