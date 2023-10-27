FROM node:18

# Create app directory
WORKDIR C:\Users\Nick\Coding\JavaScript\4413


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install


# Bundle app source
COPY . .


EXPOSE 3001

