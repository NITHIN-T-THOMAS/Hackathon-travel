FROM node

# Working directory
WORKDIR /app

# Copy package.json files
COPY package.json ./
RUN npm install -g nodemon

# Install node packages
RUN npm install

# Copy all files
COPY . .

# Setting up port for app
EXPOSE 8026

# Command to start the application
CMD npm run dev