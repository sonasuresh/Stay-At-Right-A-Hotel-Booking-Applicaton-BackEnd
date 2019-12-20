const Config = require('../Models/Config');

function createConfig(req, res) {
    try {
         let newConfig = new Config({
           key:req.body.key,
           value:req.body.value
        })
        newConfig.save((saveError,saveData)=>{
               if (saveError) {
            res.json({
                success: false,
                message: 'Cannot book..!'
            })
        } 
        else{
            res.status(200).json({
                success: true,
                message: 'Booked Successfully!'
            })
        
        }
        })
    } catch (error) {
        res.status(500).send(error)
    }
}


function deleteConfig(req, res) {
    try {
        // booking -> delete -> config
        Config.remove({ _id: req.body._id }, (removeError, removeDocs) => {
        if (removeError) {
            res.json({
                success: false,
                message: 'Error in Deleting'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Deletion Successfull'
            })
        }
    })

    } catch (error) {
        res.status(500).send(error)
    }
}
function getConfig(req, res) {
    try {
        // config -> get by key
        Config.find({key:req.params.key}, (findError, findDocuments) => {
            if (findError) {
                res.json({
                    success: false,
                    message: 'Unable to retrive!'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: findDocuments
                })
            }
        })

    }

     catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
   createConfig,
   deleteConfig,
   getConfig
}

