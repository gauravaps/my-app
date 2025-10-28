# 📧 Google OAuth Task

This project is built as part of the assignment provided by **Indian App Guy**.  
It integrates **Google OAuth**, **Gmail API**, and **AI-based Email Classification** using Groq/OpenAI API.

---

## 🚀 Features

✅ **Google Authentication**
- Secure login using Google OAuth (NextAuth.js)
- User sessions managed safely with cookies

✅ **Fetch Gmail Emails**
- After login, the app fetches the user’s recent 15 emails using the Gmail API

✅ **AI-based Email Classification**
- Uses Groq/OpenAI model to automatically classify emails into relevant categories

✅ **Clean UI with TailwindCSS**
- Professional and responsive user interface for a smooth experience

---

## 🧩 Tech Stack

- **Next.js 14 (App Router)**
- **NextAuth.js (Google OAuth)**
- **Gmail API (googleapis package)**
- **Groq/OpenAI API (for classification)**
- **Tailwind CSS (for styling)**

---

## ⚙️ Setup Instructions (Run Locally)

Follow these steps to run the project on your local machine:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/gauravaps/google-oauth-task.git
cd google-oauth-task


2️⃣ Install Dependencies
npm install


3️⃣ Setup Environment Variables

Create a .env.local file in the root folder and add the following variables:

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000

# Groq/OpenAI Key
GROQ_API_KEY=your_groq_api_key


4️⃣ Run the App
npm run dev


Then open:
👉 http://localhost:3000  


How It Works

Login with Google → User authenticates using Google OAuth

Fetch Emails → Fetches recent emails from Gmail inbox

Classify Emails → AI classifies emails into categories like Promotions, Updates, Social, etc.

Display Results → Shows classification neatly on the dashboard  

Developer
Name: Gaurav Patel
Email: gauravpatel@example.com

GitHub: github.com/gauravaps


Note

Google has updated the OAuth verification process —
to test the Gmail integration, please add the following email as a test user in your Google Cloud Console:
📧 theindianappguy@gmail.com