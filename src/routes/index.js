import auth from './auth'
import users from './users'
import groups from './groups'
import members from './members'

export default app => {
    app.use('', auth),
    app.use('/users', users),
    app.use('/groups', groups),
    app.use('/members', members),
    app.use((req, res) => { res.status(404).send({ message: "Invalid url"  }) })
}