import { Router } from 'express'
import { Link } from '../models/Link.js'

const router = Router()

router.get('/:code', async (req, res) => {
    const link = await Link.findOne({ code: req.params.code })
    if (!link) {
        return res.status(404).json({ message: 'Link not found' })
    }

    link.click++
    await link.save()
    return res.redirect(link.from)
})

export { router }
