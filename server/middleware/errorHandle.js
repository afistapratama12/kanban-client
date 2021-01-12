function errorHandler (err, req, res, next) {
    if(err) {
        const errMsg = {
            message : []
        }

        switch (err.name) {
            case 'SequelizeValidationError':
                errMsg.message = err.errors.map(err => err.message)
                res.status(400).json(errMsg)
                break

            case "SequelizeConstraintError":
                errMsg.message = err.errors.map(err => err.message)
                res.status(400).json(errMsg)
                break

            case "SequelizeUniqueConstraintError":
                errMsg.message = err.errors.map(err => err.message)
                res.status(400).json(errMsg)
                break
        
            case "notFound":
                errMsg.message.push("Not found.")
                res.status(404).json(errMsg)
                break
        
            case "authError":
                errMsg.message.push("Invalid email / password")
                res.status(401).json(errMsg)
                break
            
            default:
                errMsg.message.push("Error in internal server.")
                res.status(500).json(errMsg)
                break
        }
    }
}



module.exports = errorHandler