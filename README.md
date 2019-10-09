### SimpleStockTrader
###### a demo stock trading app that allows you to perform account opening, trading stocks, and monitoring a portfolio.


 **Note**
 Deployed application on heroku has timeout issues.
#### Prerequisites
- NodeJS
- NPM
- create-react-app
- MongoDB

#### Environmental Variables
- `DB_USER =      <database username>`place the database username here
- `DB_PW =        <database password>` place the database user's password here
- `DB_INFO =      <database-uri>` place the uri that will be used to connect to a mongo instance
- `COOKIE_SECRET= <secret-string> ` place any random string here; will be used to create sessions for users

#### Instructions
1. clone the repository
`git clone https://github.com/karkay/SimpleStockTrader.git`
2.  visit the directory and install dependencies and build
`cd SimpleStockTrader && npm run build-local`
3. start the application
`npm start`
