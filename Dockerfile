FROM node:14

WORKDIR /usr/src/app

# Installing dependencies
COPY ["package.json", "package-lock.json", "./"]

RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build
EXPOSE 5000

# Running the app
CMD ["npm", "run", "dev"]


