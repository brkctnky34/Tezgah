FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/bot/package.json apps/bot/package.json

RUN npm install --workspaces

COPY . .
RUN npm run build --workspace @apps/api

EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "@apps/api"]
