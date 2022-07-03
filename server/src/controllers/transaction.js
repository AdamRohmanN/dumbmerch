const { user, transaction, product } = require('../../models')

exports.addTransaction = async (req, res) => {
    try {
        const newData = await transaction.create({
            ...req.body,
            status: "pending",
            idBuyer: req.user.id
        })

        let data = await transaction.findOne({
            where: {
                id: newData.id
            },
            attributes: {
                exclude: ['status', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                transaction: data
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

exports.allTransactions = async (req, res) => {
    try {
        const data = await transaction.findAll({
            include: [
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['price', 'qty', 'idUser', 'createdAt', 'updatedAt']
                    }
                },{
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['password', 'status', 'createdAt', 'updatedAt']
                    }
                },{
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['password', 'status', 'createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['idBuyer', 'idSeller', 'idProduct', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                transaction: data
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