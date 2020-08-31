FROM node:14.9.0-stretch-slim

LABEL Maintainer <gashaw.teshome@gmail.com>

# Open port
EXPOSE 3000

# Switch to unprivileged user
USER node

# Copy files into image
WORKDIR /home/node
COPY . .

# Run app
CMD ["node", "app.js"]