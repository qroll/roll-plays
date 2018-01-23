FROM node:8
WORKDIR /app
COPY package.json .
RUN npm install --quiet
COPY . .
RUN npm install -g nodemon
EXPOSE 9000
CMD [ "npm", "start" ]
