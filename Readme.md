# 🍕 PizzaDash

**PizzaDash** is a modern, full-stack web application built with **Next.js** that allows users to manage pizza orders with ease. It features **Google OAuth login**, **JWT-based authentication**, and a powerful **LLM-based chatbot** to assist users with order-related queries.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Google OAuth 2.0 login via **NextAuth.js**
  - JWT session handling for secure and stateless authentication

- 🤖 **AI Order Assistant**
  - Integrated LLM-based chatbot to query and manage your pizza orders
  - Supports natural language interaction

- 📦 **Order Dashboard**
  - Clean UI to track and manage orders
  - Built with Tailwind CSS and ShadCN components

---

## 🛠️ Tech Stack

- **Frontend & Routing:** Next.js (App Router or Pages Router)
- **Authentication:** NextAuth.js (Google OAuth + JWT)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI Integration:** LLM (e.g., OpenAI API or local model — implementation-dependent)

---

## 🧪 Getting Started (Development)

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/pizzaDash.git
cd pizzaDash

# 2. Install dependencies
npm install

# 3. Create a .env.local file with the following:
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OPENAI_API_KEY=your-api-key  # If using OpenAI

# 4. Run the app
npm run dev
