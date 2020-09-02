# pull official base image

FROM nginx:1.14.0
COPY build /usr/share/nginx/html