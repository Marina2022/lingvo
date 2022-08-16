# 
app-init: 
  npm install --legacy-peer-deps

app-start:
  sudo docker run \
    --name lingvo-web-docker \
    -d \
    -p 3000:3000 \
    -v /home/mike/lingvoinsta/web:/app \
    -e TZ=Europe/Moscow \
    -e CHOKIDAR_USEPOLLING=true \
    -e APP_BACKEND_URL=https://dev.insta.lingvonavi.com/api/v1/ \
    --entrypoint 'npm rebuild node-sass && npm run start' \
    node:18-alpine3.16
    

app-stop:
  sudo docker stop lingvo-web-docker
