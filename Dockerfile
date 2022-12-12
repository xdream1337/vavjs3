FROM node:18.12.1

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/client
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app

# Install app dependencies
COPY client/package.json /usr/src/app/client
COPY server/package.json /usr/src/app/server
RUN cd /usr/src/app/client && npm install
RUN cd /usr/src/app/server && npm install

# Bundle app source
COPY /client /usr/src/app/client
COPY /server /usr/src/app/server

EXPOSE 8080

WORKDIR /usr/src/app/server
ENTRYPOINT [ "npm", "start" ]