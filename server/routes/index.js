const router = require('express').Router()

const taskRoute = require('./task')
const userRoute = require('./user')

router.get('/', (req, res) => {
    res.status(200).json({
        msg : 'app get listen and jalan'
    })
})

router.use('/', userRoute)
router.use('/tasks', taskRoute)



module.exports = router