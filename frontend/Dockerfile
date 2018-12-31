FROM node:8 as build-deps
WORKDIR /srv/rollplays
RUN npm install -g serve
COPY package.json .
RUN npm install --no-progress
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "-l", "3000", "build"]
