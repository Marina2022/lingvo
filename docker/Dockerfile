ARG APP_NODE_VERSION

### Development stage
FROM node:$APP_NODE_VERSION AS dev
WORKDIR /app
# ENV NODE_ENV=development
### Uncomment the line below if node_modules installing needed
### Or add `npm install` at the bottom of ENTRYPOINT directive
# RUN npm install
### node-sass requires rebuilding as the line below 
### due to binary incompatible with node:alpine linux image
ENTRYPOINT  npm rebuild node-sass && \
            npm start

### Production stage
FROM node:$APP_NODE_VERSION AS prod
WORKDIR /app
ADD . .
# ENV NODE_ENV=production
RUN npm install && \
    npm rebuild node-sass && \
    npm run build
