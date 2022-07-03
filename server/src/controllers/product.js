const { user, product, category, categoryProduct } = require('../../models')

exports.addProduct = async (req, res) => {
    try {
        let newProduct = await product.create({
            ...req.body,
            image: req.file.filename,
            idUser: req.user.id
        })

        let productData = await product.findOne({
            where: {
                id: newProduct.id
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: categoryProduct,
                        as: "bridge",
                        attributes: []
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["idUser", "createdAt", "updatedAt"]
            }
        })

        productData = JSON.parse(JSON.stringify(productData))
        productData = {
            ...productData,
            image: process.env.FILE_PATH + productData.image
        }

        res.send({
            status: "success",
            data: {
                product: productData
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

exports.allProducts = async (req, res) => {
    try {
        let data = await product.findAll({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: categoryProduct,
                        as: "bridge",
                        attributes: []
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            }
        })

        data = JSON.parse(JSON.stringify(data))
        data = data.map((item) => {
            return {
                ...item,
                image: process.env.FILE_PATH + item.image
            }
        })

        res.send({
            status: 'success',
            data: { products: data }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}
exports.oneProduct = async (req, res) => {
    try {
        const id = req.params.id
        let data = await product.findOne({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: categoryProduct,
                        as: "bridge",
                        attributes: []
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            },
            where: {id}
        })

        if (!data) {
            return res.send({
                message: `no data found`
            })
        }

        data = JSON.parse(JSON.stringify(data))
        data = {
            ...data,
            image: process.env.FILE_PATH + data.image
        }

        res.send({
            status: 'success',
            data: { product: data }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        await product.update(req.body, { where: {id} })

        let data = await product.findOne({
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    }
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: categoryProduct,
                        as: "bridge",
                        attributes: []
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            },
            where: {id}
        })

        if (!data) {
            return res.send({
                message: `no data found`
            })
        }

        data = JSON.parse(JSON.stringify(data))
        data = {
            ...data,
            image: process.env.FILE_PATH + data.image
        }

        res.send({
            status: 'success',
            data: { product: data }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        
        await product.destroy({ where: {id} })

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