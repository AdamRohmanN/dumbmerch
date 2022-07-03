const { user, profile } = require('../../models')

exports.addProfile = async (req, res) => {
    try {
        const data = await profile.create(req.body)

        res.send({
            status: 'success',
            added: data
        })
    } catch (error) {
        errorProcedure(error)
    }
}

exports.allProfile = async (req, res) => {
    try {
        const data = await profile.findAll({
            include: {
                model: user,
                as: "user",
                attributes: {
                    exclude: ['id', 'password', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['password', 'idUser', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            profiles: data
        })
    } catch (error) {
        errorProcedure(error)
    }
}
exports.oneProfile = async (req, res) => {
    try {
        const id = req.params.id
        const data = await profile.findOne({
            include: {
                model: user,
                as: "user",
                attributes: {
                    exclude: ['id', 'password', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['id', 'password', 'idUser', 'createdAt', 'updatedAt']
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
            profile: data
        })
    } catch (error) {
        errorProcedure(error)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const id = req.params.id
        await profile.update(req.body, { where: {id} })

        const data = await profile.findOne({ where: {id} })

        if (!data) {
            return res.send({
                message: `no data found`
            })
        }

        res.send({
            status: 'success',
            message: `profile with id of ${id} is updated`
        })
    } catch (error) {
        errorProcedure(error)
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        const id = req.params.id

        const data = await profile.findOne({ where: {id} })

        if (!data) {
            return res.send({
                message: `no data found`
            })
        }
        
        await profile.destroy({ where: {id} })

        res.send({
            status: 'success',
            message: `profile with id of ${id} is deleted`
        })
    } catch (error) {
        errorProcedure(error)
    }
}

function errorProcedure(error) {
    console.log(error)
    res.status({
        status: 'failed',
        message: 'server error'
    })
}