FROM node:carbon as builder
 
# Create app directory
WORKDIR /app
 
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
 
# Install any needed packages
RUN npm install
 
# Bundle app source
COPY . /app
 
# Stage 2 build for creating smaller image
FROM node:carbon-alpine
WORKDIR /app
 
COPY --from=builder /app .
 
EXPOSE 3001
 
CMD [ "npm", "start" ]
