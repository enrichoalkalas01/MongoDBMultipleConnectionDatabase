const Express = require('express')
const App = Express()
const Cors = require('cors')
const Morgan = require('morgan')
const Dotenv = require('dotenv')
const Path = require('path')
const PORT = process.env.PORT || 5900
const PORTDocker = 5900
const HOST = '0.0.0.0'
const CookieParser = require('cookie-parser')

Dotenv.config({ path: __dirname + '/configs/Config.env'})

App.use(Cors())
App.use(Express.json())
App.use(Express.urlencoded({ extended: false }))
App.use(Express.static('public'))
App.set('view engine', 'ejs')
App.use(Morgan('dev'))
App.use(CookieParser())

App.listen(PORTDocker, HOST, () => console.log(`Server is running in port : ${ PORTDocker }`))

const DynamicConnectionMongoDB = require('./models/MongoDB/DynamicConnection')
const connectionDB1 = DynamicConnectionMongoDB(process.env.MONGO_URI_CONN_1)
const connectionDB2 = DynamicConnectionMongoDB(process.env.MONGO_URI_CONN_2)
const UserModels = require('./models/MongoDB/Schema/User')

// connection1 & connection2 need await method cause the method of connection return Promise,
// and need to convert it from Promise into the object models structure from mongoDB

App.get('/', async (req, res) => {
    try {
        let getConnection1 = await connectionDB1
        let getConnection2 = await connectionDB2
        const UserModelsConn1 = UserModels(getConnection1)
        const UserModelsConn2 = UserModels(getConnection2)

        let models1 = await UserModelsConn1.find()
        let models2 = await UserModelsConn2.find()

        console.log(models1)
        console.log(models2)

        res.send('pl')
    } catch (error) {
        console.log(error.message)   
        res.status(500).send('error here')
    }
})

