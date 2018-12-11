FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
# Copies all needed files
COPY . .
#  Install dependencies
RUN npm install --production
# Start the container command
#CMD node app.js

# Give postgres time to setup before we try to migrate.
CMD sleep 5 && npm run migratedb:pg && node app.js
