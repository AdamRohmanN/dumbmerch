const { category } = require('../../models')

exports.addCategory = async (req, res) => {
    try {
        const createCategory = await category.create(req.body)

        const data = await category.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: { id: createCategory.id }
        })

        res.send({
            status: 'success',
            data: { category: data }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.allCategories = async (req, res) => {
    try {
        const data = await category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: { categories: data }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.oneCategory = async (req, res) => {
    try {
        const id = req.params.id
        const data = await category.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
            data: { category: data }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        await category.update(req.body, { where: {id} })

        const data = await category.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
            data: { category: data }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id

        const data = await category.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {id}
        })

        if (!data) {
            return res.send({
                message: `no data found`
            })
        }

        await category.destroy({ where: {id} })

        res.send({
            status: 'success',
            data: { id: id }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}