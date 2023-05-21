//connect to mongoose
const { connect, connection, set} = require('mongoose');
set("strictQuery", false)

const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkDB'
connect(connectionString, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})



module.exports = connection