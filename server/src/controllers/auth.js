const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { user, profile } = require('../../models')

exports.register = async (req, res) => {
    const skema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().min(5).required(),
        password: joi.string().min(6).required()
    })

    const {error} = skema.validate(req.body)

    if (error) {
        return res.status(400).send({
            message: error.details[0].message 
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            status: "customer",
            password: hashedPassword,
        })

        const token = jwt.sign({newUser}, process.env.SECRET_KEY)

        res.status(201).send({
            status: "success",
            data: {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    token
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.login = async (req, res) => {
    const skema = joi.object({
        email: joi.string().email().min(5).required(),
        password: joi.string().min(6).required()
    })

    const {error} = skema.validate(req.body)

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        })
    }

    try {
        const userExist = await user.findOne({
            where: { email: req.body.email }
        })

        if (!userExist) {
            return res.status(400).send({
                status: "failed",
                message: "unregistered or wrong email"
            })
        }
        
        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isValid) {
            return res.status(400).send({
                status: "failed",
                message: "incorrect password"
            })
        }

        const token = jwt.sign({id: userExist.id}, process.env.SECRET_KEY)

        res.status(200).send({
            status: "success",
            data: {
                user: {
                    name: userExist.name,
                    email: userExist.email,
                    status: userExist.status,
                    token
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id

        const dataUser = await user.findOne({
            where: {id},
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        })

        if (!dataUser) {
            return res.status(400).send({
                message: "no data user found"
            })
        }

        res.status(200).send({
            status: "success",
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                    status: dataUser.status
                }
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.oneUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = await user.findOne({
            include: {
                model: profile,
                as: "profile",
                attributes: {
                    exclude: ['id', 'idUser', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['id', 'password', 'createdAt', 'updatedAt']
            },
            where: {id}
        })

        if (!data) {
            return res.send({
                message: `no data found`
            })
        }

        res.send({
            status: 'success',
            user: data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}