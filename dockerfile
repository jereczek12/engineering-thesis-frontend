# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Serve using lightweight http server
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist/checkers-simulator ./dist
EXPOSE 4200
CMD ["serve", "-s", "dist", "-l", "4200"]