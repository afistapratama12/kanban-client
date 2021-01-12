const router = require('express').Router()

const {
    auth, author
} = require('../middleware/auth')

const TaskController = require('../controller/taskController')
const errorHandler = require('../middleware/errorHandle')

// router.use(auth)

router.get('/',auth, TaskController.listTask, errorHandler)
router.post('/',auth, TaskController.addTask, errorHandler)

router.put('/:id',auth, author, TaskController.moveTask, errorHandler)
router.delete('/:id',auth, author, TaskController.deleteTask, errorHandler)


module.exports = router