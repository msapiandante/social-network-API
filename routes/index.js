const router = require('express').Router()
//require api routes
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
    return res.send("Uh-oh, please try again!")
})

module.exports = router