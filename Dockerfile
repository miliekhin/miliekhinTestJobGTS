FROM node:lts-alpine
WORKDIR /app
COPY package.json .
COPY . .
RUN npm update -g npm
RUN npm i
EXPOSE 8877
CMD ["npm", "run", "dev"]
