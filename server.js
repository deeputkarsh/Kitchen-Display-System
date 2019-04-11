require('dotenv').config()

/*
* Code to check if required enviroment variables are set to run the application
*/
let applicationEnvVars = [ 'APP_ENVIROMENT', 'PORT', 'APP_VERSION' ]
let mongoBasicEnvVars = [ 'MONGO_HOSTS', 'MONGO_DBNAME', 'MONGO_AUTHSOURCE' ]

applicationEnvVars = [ ...applicationEnvVars, ...mongoBasicEnvVars ]

let unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])

if (unusedEnvVars.length) throw new Error('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']')

const { initApp } = require('./api')

initApp().then(app => {
  app.listen(process.env.PORT, () => console.log(`Kitchen Display System running on port ${process.env.PORT}!`))
})
