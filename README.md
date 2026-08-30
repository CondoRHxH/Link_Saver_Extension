Link Saver

Link Saver is a browser extension + backend API for saving and organizing links. Log in, capture the page you're on, and attach a description, note, and tags — the backend auto-fetches page metadata from the URL so you don't have to fill everything in by hand.

## Features
- User authentication (login) with JWT-based sessions
- Passwords hashed with bcrypt
- Browser extension popup for quick saving
- Auto CRUD from URL fetching — scrapes page info via Cheerio when you save a link
- Description, note, and tag support per saved link
-  MongoDB storage for users and links

## Tech Stack
Node.js
Express
MongoDB (Mongoose)
Cheerio (URL/HTML scraping)
bcrypt (password hashing)
JWT (authentication)

## Project Structure

link-saver/
├── extension/       # Browser extension (popup UI, login/save screens)
├── middleware/       # Auth / request middleware
├── model/             # Mongoose models (User, Link, JWT handling)
├── routes/            # Express route handlers
├── utils/              # Helpers, incl. URL fetching / Cheerio scraping
├── server.js           # App entry point
├── package.json
└── .gitignore
## 🖥️ Screenshots
Login

<img width="385" height="353" alt="image" src="https://github.com/user-attachments/assets/af6df823-6c22-4d92-a9e5-15d677ce3eef" />

Popup login screen for the extension.

<img width="375" height="490" alt="image" src="https://github.com/user-attachments/assets/4b589e94-18a9-4319-a309-7462293a1be3" />

Logo

<img width="128" height="128" alt="icon-128" src="https://github.com/user-attachments/assets/84a77143-1941-4fe0-babc-63c6520e0cc8" />

## ⚙️ Installation
1. Clone the repo
bash
git clone https://github.com/CondoRHxH/link-saver
cd link-saver
2. Install dependencies
bash
npm install
3. Add environment variables

Create a .env file in the root:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
4. Run the server
bash
node server.js
5. Load the extension

In your browser, go to the extensions page, enable developer mode, and load the extension/ folder as an unpacked extension.

📌 Usage
Sign up or log in through the extension popup.
Browse to a page you want to save.
Open the extension, add a description, note, and tags.
Click Save This Link — the backend fetches page metadata automatically and stores the link in MongoDB.
📄 License

MIT
