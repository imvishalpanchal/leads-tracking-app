#!/bin/bash
set -e
echo "Starting build process for LeadTracker Pro..."

echo "Generating environment variables..."
cat << 'EOF' > backend/.env
DATABASE_URL="file:./dev.db"
PORT=5001
JWT_SECRET="ubJi4n7j5O5wjW7imT9Anz47jB82nrln4DSKA2TSufT"
EOF

cat << 'EOF' > frontend/.env
VITE_API_URL="http://localhost:5001/api"
VITE_DEFAULT_EMAIL="admin@leadtech.com"
VITE_DEFAULT_PASSWORD="admin@12345678"
EOF

echo "Installing Backend dependencies..."
cd backend
npm install
echo "Generating Prisma Client..."
touch prisma/dev.db
npx prisma generate
echo "Applying database schema..."
npx prisma db push
echo "Seeding database..."
npx prisma db seed
echo "Installing Frontend dependencies..."
cd ../frontend
npm install
echo "Building Frontend..."
npm run build

echo "Deploying Frontend to Backend..."
rm -rf ../backend/public
cp -r dist ../backend/public

echo "Build process completed successfully!"
echo "Starting the application..."
cd ../backend
node src/server.js
