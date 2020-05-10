# base image

FROM node:12.2.0-alpine AS build

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node-modules/.bin` to $PATH
ENV PATH /app/node-modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent


COPY . /app
RUN npm run build


# Nginx setting

FROM nginx:1.16.0-alpine as prod-stage
# Delete default settings and copy conf file
COPY default.conf /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html

# Open port 80 and execute nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#start app
