FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Copy the .env file to the working directory
COPY .env .env

# Bundle app source
COPY /src ./src/

# Expose the desired port (if needed)
EXPOSE 8585

# Define the command to run your Node.js application
CMD [ "node", "src/app.js" ]