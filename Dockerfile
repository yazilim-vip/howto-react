FROM node:14

RUN ["npm", "i", "-g", "@yazilim-vip/howto-script@0.10.0"]
RUN ["mkdir", "-p", "/howto"]

COPY init.sh ./
RUN ["chmod", "+x", "./init.sh"]
ENTRYPOINT [ "./init.sh"]