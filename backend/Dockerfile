FROM node:8
WORKDIR /app/server
COPY package.json .
RUN npm install --no-progress
COPY . .
EXPOSE 9000
RUN npm install bcrypt
CMD [ "npm", "run", "start:prod" ]
