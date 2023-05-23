//connect to mongoose
const { connect, connection, set} = require('mongoose');
set("strictQuery", false)

const connectionString = 'mongodb://localhost:27017/socialNetworkDB'
connect(connectionString, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})



module.exports = connection