FROM node:12 as builder
 
RUN mkdir -p /app
# Create app directory
WORKDIR /app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD ./ /app
 
# Install any needed packages
RUN npm install
 
 
# Stage 2 build for creating smaller image
# FROM node:carbon-alpine
# WORKDIR /usr/src/app
 
# COPY --from=builder /usr/src/app .
 
EXPOSE 3001
 
CMD [ "yarn", "start" ]
