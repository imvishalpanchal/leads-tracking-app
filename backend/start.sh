#!/bin/sh
npx prisma generate
npx prisma db push
npx prisma db seed
echo "Starting backend server..."
node src/server.js
