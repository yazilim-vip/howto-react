# production environment
FROM node:14.15.4
RUN ["npm", "i", "-g", "serve"]
COPY ./build /build
ENTRYPOINT ["serve", "-l", "8080", "-s", "/build"]