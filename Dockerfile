FROM node:0.10.33-slim

COPY check.js /srv/check.js
EXPOSE 80

CMD ["node", "/srv/check.js"]
