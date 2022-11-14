FROM node:lts

COPY package*.jason ./

RUN npm install

COPY . .

CMD ["npm", "start"]