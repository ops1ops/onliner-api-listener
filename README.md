# Onliner api listener
https://onliner-api-listener.herokuapp.com

## Technologies
- Backend
  - NodeJS (Express)
  - Sequelize
  - MySQL
- Frontend
  - ReactJS
- Build
  - Webpack
  - Babel
## Installation
#### Clone the repo and install the dependencies.
```
$ git clone https://github.com/ops1ops/onliner-api-listener.git
$ cd onliner-api-listener
$ npm install
```
#### Copy .env.example to .env 
```
$ cp .env.example .env
```
#### Create DB and fill DB credentials in .env
```
DB_NAME=<name>
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_HOST=<host>
```
#### Fill JWT_SECRET with your own secret key
```
JWT_SECRET=<secret-key>
```
## Run application
- ### Dev mode
```
$ npm run dev
```
- ### Prod mode
```
$ npm start
```
