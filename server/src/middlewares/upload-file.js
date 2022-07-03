const multer = require('multer')

exports.uploadFile = (imageFile) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g,""))
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.fieldname === imageFile) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                req.fileValidationError = {
                    message: "this format is not compatible"
                }
                return cb(new Error("only image files are allowed"))
            }
            cb(null, true)
        }
    }

    const mega10 = 10 * 1024 * 1024 //megabytes, kilobytes, bytes

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: mega10
        }
    }).single(imageFile)

    return (req, res, next) => {
        upload(req, res, function(err) {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError)
            }
            if (!req.file && !err) {
                return res.status(400).send({
                    message: "please select file to upload"
                })
            }
            if (err) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).send({
                        message: "max file size is 10MB"
                    })
                }
            }
            return next()
        })
    }
}