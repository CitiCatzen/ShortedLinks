import { Router } from 'express'
import { Link } from '../models/Link.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import config from 'config'
import shortid from 'shortid'

const router = Router()

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json({ links })
    } catch (e) {
        res.status(500).json({ message: 'Something has been wrong...' })
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json({ link })
    } catch (e) {
        res.status(500).json({ message: 'Something has been wrong...' })
    }
})

router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body
        const code = shortid.generate()
        const existing = await Link.findOne({ from })
        if (existing) return res.json({ link: existing })

        const to = `${baseUrl}/t/${code}`
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()

        res.status(201).json({ link })
    } catch (e) {
        res.status(500).json({ message: 'Something has been wrong...' })
    }
})

export { router }
