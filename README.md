# ArogyaAI - Multilingual AI Doctor Assistant

A full-stack web application that allows users to input their symptoms via text or voice in multiple languages and receive an AI-generated preliminary assessment.

***Disclaimer: This AI assistant does not replace professional medical advice.***

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Zustand, Clerk.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), Winston, Helmet.
- **AI Integration**: Sarvam AI (Speech-to-Text & Translation), Google Gen AI (Gemini 2.5 Flash).

<!-- ## Setup Instructions

### 1. External Services Setup
1. **Clerk**: Create a Clerk application for authentication. Get your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
2. **MongoDB**: Have a local MongoDB instance running or create a MongoDB Atlas cluster.
3. **Sarvam AI**: Retrieve your API key from your Sarvam AI dashboard.
4. **Google Gen AI**: Retrieve an API key for Gemini.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Fill in the required credentials in your `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/arogyaai
   CLERK_SECRET_KEY=your_clerk_secret_key
   SARVAM_API_KEY=your_sarvam_api_key
   LLM_API_KEY=your_llm_api_key
   NODE_ENV=development
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Deployment Instructions

### Frontend (Vercel)
1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and create a new project.
3. Select the `frontend` folder as the Root Directory.
4. Set the Framework Preset to Next.js.
5. Add the Environment Variables (Next Public Clerk keys, Frontend Auth URLs, and your production API URL).
6. Click Deploy.

### Backend (Render / Railway)
1. Ensure your code is pushed to GitHub.
2. Connect your repo in Render or Railway as a Web Service.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Root Directory: `backend`
6. Add the needed Environment Variables natively in the dashboard (`MONGODB_URI`, `CLERK_SECRET_KEY`, `SARVAM_API_KEY`, etc.).

### Database (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Allow incoming IPs by configuring the Network Access.
3. Create a Database User.
4. Replace `MONGODB_URI` in the backend service variables with the Atlas connection string. -->
