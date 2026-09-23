
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
ENV VITE_API_URL="http://localhost:5001/api"
ENV VITE_DEFAULT_EMAIL="admin@leadtech.com"
ENV VITE_DEFAULT_PASSWORD="admin@12345678"
RUN npm run build
FROM node:18-alpine
WORKDIR /app
ENV DATABASE_URL="file:./dev.db"
ENV PORT=5001
ENV JWT_SECRET="ubJi4n7j5O5wjW7imT9Anz47jB82nrln4DSKA2TSufT"
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install
COPY backend/prisma/ ./prisma/
RUN touch prisma/dev.db
RUN npx prisma generate
COPY backend/src/ ./src/
COPY backend/start.sh ./
RUN chmod +x ./start.sh
COPY --from=frontend-builder /app/frontend/dist ./public
EXPOSE 5001
CMD ["./start.sh"]
