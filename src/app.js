import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import mountRoutes from './routes'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mountRoutes(app)

app.listen(8080, () => {
    console.log('Listen port 8080')
})