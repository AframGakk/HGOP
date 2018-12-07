FROM node:dubnium
# Set the working directory to /code
WORKDIR /code
# Copies source package.json into the container
COPY package.json package.json
# Copies source database.js into the container
COPY database.js database.js
# Copies source app.js into the container
COPY app.js app.js
COPY context.js context.js
COPY server.js server.js
COPY lucky21.js lucky21.js
COPY deck.js deck.js
COPY dealer.js dealer.js
COPY random.js random.js
#  Install dependencies
RUN npm install --production
# Start the container command
CMD node app.js
