const Mongoose = require('mongoose')

const connectToDatabase = async (dbURI) => {
    try {
        Mongoose.set('strictQuery', false)
        const conn = await Mongoose.createConnection(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        return conn
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
        process.exit(1)
    }
}

module.exports = connectToDatabase