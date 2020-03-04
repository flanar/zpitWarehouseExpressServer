import auth from './auth'
import users from './users'

export default app => {
    app.use('', auth),
    app.use('/users', users),
    app.use((req, res) => { res.status(404).send({ message: "Invalid url"  }) })
}