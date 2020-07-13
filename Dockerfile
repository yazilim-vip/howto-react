# pull official base image
FROM node:12.18.2


RUN npx create-react-app my-app

# set working directory
WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY . ./
# RUN npm run-script build
# RUN ls
