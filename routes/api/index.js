const router = require('express').Router()
//require user routes
const userRoutes = require('./userRoutes')

//require thought routes
const thoughtRoutes = require('./thoughtRoutes')

//route when accessing user information
router.use('/users', userRoutes)

//route when accessing thought information
router.use('/thoughts', thoughtRoutes)

module.exports = router