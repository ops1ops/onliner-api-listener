# Onliner api listener
## Description
Real time [onliner.by](https://onliner.by) price tracking system which saves every price change of tracked items to history. Also provides UI to make some actions (e. g. watch history chart, track any item and so on)
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
## Main scripts
`$ npm run dev` - runs application in development mode

`$ npm run start` - runs application in production mode

`$ npm run onliner-listener` - runs script, which tracks onliner price change
