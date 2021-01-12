const { Task } = require('../models')


class TaskController {
    static async listTask (req, res, next) {
        try {
            const data = await Task.findAll()

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static addTask (req, res, next) {
        let newTask = {
            title : req.body.title,
            category : req.body.category,
            description : req.body.description,
            UserId : req.loginUser.id
        }

        try {
            const data = await Task.create(newTask)

            res.status(201).json({
                msg : 'data successfull create',
                title : data.title,
                category : data.category,
                description : data.description
            })
        } catch (err) {
            next(err)
        }


    }

    static moveTask(req, res, next) {
        let taskId = +req.params.id
        let moveCategory = {
                category : req.body.category
            }

        try {
            const data = await Task.update(moveCategory, { where : {
                id : taskId
            }})

            if(!data) {
                next( { name : 'notFound'})
            } else {
                res.status(201).json({
                    msg: `susscesfull moving task to ${moveCategory.category}`
                })
            }

        } catch (err) {
            next(err)
        }

    }

    static deleteTask(req, res, next) {
        let taskId = +req.params.id

        try {
            const data = await Task.destroy({where :
                { id : taskId }
            })

            if(!data) {
                next({ name : 'notFound' })
            } else {
                res.status(200).json({
                    id : todoId,
                    message : 'Todo success to delete'
                })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController