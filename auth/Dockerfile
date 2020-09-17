FROM node:13

#create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#bundle app source
COPY . .

EXPOSE 8080
CMD ["npm", "start"]


