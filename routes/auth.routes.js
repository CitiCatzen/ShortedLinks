import { Router } from 'express'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Incorrect email...').isEmail(),
        check('password', 'Min password length is 6 symbol...')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: 'User already exist...' })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = new User({ email, password: hashedPassword })
            await user.save()

            res.status(201).json({ message: 'User has been created...' })
        } catch (e) {
            res.status(500).json({ message: 'Something has been wrong...' })
        }
    })

router.post(
    '/login',
    [
        check('email', 'Enter correct email...').normalizeEmail().isEmail(),
        check('password', 'Enter password...').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data...'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'User doesnt exist...' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password...' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })
        } catch (e) {
            res.status(500).json({ message: 'Something has been wrong...' })
        }
    })

export { router }
