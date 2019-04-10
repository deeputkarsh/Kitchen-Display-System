const { PORT, REPORTS_PATH, PUBLIC_PATH, MONGO_HOST, DBNAME } = process.env
const port = PORT
const reportsPath = REPORTS_PATH
const publicPath = PUBLIC_PATH
const mongoUrl = `mongodb://${MONGO_HOST}/${DBNAME}`
module.exports = {
  port,
  reportsPath,
  publicPath,
  mongoUrl
}
