FROM node:14

RUN ["npm", "i", "-g", "@yazilim-vip/howto-script@0.10.0", "http-server"]
RUN ["mkdir", "-p", "/howto"]

COPY init.sh ./
RUN ["chmod", "+x", "./init.sh"]
CMD [ "./init.sh"]