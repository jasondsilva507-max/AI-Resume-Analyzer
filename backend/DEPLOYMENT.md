# Railway / Render Deployment

## Option A: Railway

1. Push `backend/` to a GitHub repo
2. Go to railway.app → New Project → Deploy from GitHub
3. Select your repo
4. Set environment variables in Railway dashboard:
   - PORT=5000
   - NODE_ENV=production
   - MONGODB_URI=...
   - JWT_SECRET=...
   - ANTHROPIC_API_KEY=...
   - CLIENT_URL=https://your-frontend.vercel.app
5. Railway auto-detects Node.js and runs `npm start`

## Option B: Render

1. Create a new Web Service on render.com
2. Connect your GitHub repo (backend folder)
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Set environment variables in Render dashboard

## Option C: Self-hosted (VPS / Docker)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN mkdir -p uploads
EXPOSE 5000
CMD ["node", "src/index.js"]
```

Build & run:
```bash
docker build -t resume-api .
docker run -p 5000:5000 --env-file .env resume-api
```

## CORS

Make sure CLIENT_URL in your backend .env matches your deployed frontend URL exactly.
