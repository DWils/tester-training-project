# Pull the Node image from Docker Hub
FROM node:18-slim

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 5173

# Run the React app
CMD [ "npm", "run", "dev", "--host" ]