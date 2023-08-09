FROM node:18.10-alpine AS build
WORKDIR /dist/src/app

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /dist/src/app/dist/rivalhub-client /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
