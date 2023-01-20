import express from 'express'
import config from 'config'
import mongoose from 'mongoose'
import { router as authRouter } from './routes/auth.routes.js'
import { router as linkRouter } from './routes/link.routes.js'
import { router as redirectRoter } from './routes/redirect.routes.js'

const PORT = config.get('port') || 5000
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)
app.use('/t', redirectRoter)

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
