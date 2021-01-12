const { verifyToken } = require('../helper/jwt')


function auth (req, res, next) {

    const { access_token } = req.headers

    try {

        if( !access_token ) {
            next({ name : 'authError' } ) 
        } else {
            const decoded = verifyToken(access_token)

            req.loginUser = decoded

            const data = await User.findOne({ where :
                {id : decoded.id}
            })

            if(!data) {

                next({ name : 'authError' })
            } else {
                next()
            }
        }

    } catch (err) {
        next(err)
    }
}

function author (req, res, next) {

    let id = +req.params.id

    try {
        const todo = await TodoList.findByPk(id)

        if(todo) {
            if(todo.UserId == req.loginUser.id) {
                next()

            } else {
                next( { name : 'authError' })
            }
        } else {
            
            next({ name : 'notFound' })
        }

    } catch (err) {
        // console.log(err)
        next(err)
    }
}

module.exports = {
    auth, author
}