
//const categoryListSchem = require('../models/categoryList');
const categoryListSchem = require('../models/userForm');

exports.getCategorty = function (req, res) {

    categoryListSchem.find({}, function (err, suc) {
        if (suc) {
            res.send({
                "message": "Request Completed Successfully",
                "data": {
                    "responseData": suc
                },
                "status": "SUCCESS"
            });
        } else {
            res.send(
                {
                    "message": "error",
                    "errors": {
                        "error": [
                            {
                                "code": "unable to get data from database",
                                "description": err
                            }
                        ]
                    }
                }
            );
        }

    }).sort({_id:-1}).limit(5);

};

exports.postCategorty = function (req, res) {
    categoryListSchem.create(req.body,
        function (err, suc) {
            if (err) {
                res.status(401).send({error:{message:err.message}});
            } else {
                
                res.status(200).json({ message: "Category added successfully"});
            }

        }
    );
};

