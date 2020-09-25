FROM node:13

#create app directory
WORKDIR /usr/src/App

COPY package*.json ./

RUN npm install 

#bundle app source
COPY . .

EXPOSE 8080 3000
CMD ["npm", "start"]
