const appURL = 'https://s.neumatic.xyz' // https://s.neumatic.xyz

const port = 80 // for heroku, its process.env.PORT

const mongoConnectionStr = '' || process.env.MONGO_STR

module.exports = { appURL, port, mongoConnectionStr }