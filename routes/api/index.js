const router = require('express').Router()
//require user routes
const userRoutes = require('./userRoutes')

//route when accessing user data
router.use('/users', userRoutes)

//require thought routes
const thoughtRoutes = require('./thoughtRoutes')

//route when accessing thought data
router.use('/thoughts', thoughtRoutes)

module.exports = router