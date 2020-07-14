# pull official base image

FROM nginx:1.14.0
COPY build /usr/share/nginx/html
RUN find /usr/share/nginx/html -type d -exec chmod 755 {} +
RUN find /usr/share/nginx/html -type f -exec chmod 644 {} +