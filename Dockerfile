FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Build app
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

# Install dependencies
COPY package*.json ./

RUN npm install --omit=dev --ignore-scripts

# Expose port

EXPOSE 3000

# Run app

CMD ["node", "dist/main/server.js"]

