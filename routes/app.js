const userDetailSchem = require('../models/userDetails');
const productDetailsSchem=require('../models/productDetails');
const companyDetailsSchem=require('../models/companyDetials');
const categoryListSchem=require('../models/categoryList');
const jwt = require('jsonwebtoken');

exports.veryfyToken = function (req, res, next) {
    const bearHeader = req.headers['authorization'];
    if (typeof bearHeader != 'undefined') {
        req.token = bearHeader;
        next();
    } else {
        res.json({ token: "Token is not Correct Now" });
    }
}


exports.getCategorty = function (req, res) {
    jwt.verify(req.token, 'securtykey', function (error, decoded) {
        if (error) {
            res.send({ Token: "token is not Set properlly", error: error.message })
        }
        else {
      //      console.log(decoded)
            categoryListSchem.find({user_id:decoded.user_id}, function (err, suc) {
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
                                        "description": "not found"
                                    }
                                ]
                            }
                        }
                    );
                }

            })

        }
    });

};

exports.postCategorty = function (req, res) {
    jwt.verify(req.token, 'securtykey', function (error, decoded) {
        if (error) {
            res.send({ Token: "token is not correct", error: error.message })
        }
        else {
       //     console.log(decoded,'ppppp')
            let obj={
                "name": req.body.name,
                "title": req.body.title,
                "username": decoded.username,
                "user_id": decoded.user_id
            }
            categoryListSchem.insertMany(obj,
                function (err, suc) {
                    if (suc) {
                        res.status(200).json({ message: "Category added successfully", decoded });
                    } else {
                        res.status(300).send({ message: "unable to save the User into database" });
                    }
                }
            );

        }
    });


};


// User.aggregate([
//     { $match: { _id: mongodb.ObjectID(req.user.position._id) } },//5
//     { $lookup: { from: "product", let: { user_id: "$_id" }, pipeline: [{ $match: { $expr: { $and: [{ $eq: ["$user", "$$user_id"] }] } } }], as: "product_details" } },
//     { $lookup: { from: "users", let: { position: "$_id" }, pipeline: [{ $match: { $expr: { $and: [{ $in: ["$position", "$$position"] }] } } }], as: "user" } },
//     { $unwind: "$user_detales" },
// ])
//--------------------------Product Details----------------------------

exports.getProduct=function(req,res){
    jwt.verify(req.token, 'securtykey', function (error, decoded) {
        if (error) {
            res.send({ Token: "token is not correct", error: error.message })
        }
        else {
            productDetailsSchem.find({}, function (err, suc) {
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
                                        "description": "not found"
                                    }
                                ]
                            }
                        }
                    );
                }

            });

        }
    });


};

exports.postProduct=function(req,res){
    jwt.verify(req.token, 'securtykey', function (error, decoded) {
        if (error) {
            res.send({ Token: "token is not correct", error: error.message })
        }
        else {
            productDetailsSchem.insertMany(req.body,
                function (err, suc) {
                    if (suc) {
                        res.status(200).json({ message: "Product added successfully", decoded });
                    } else {
                        res.status(300).send({ message: "unable to save the Product into database" });
                    }

                }
            );

        }
    });



};

//--------------------Company--------------------------
exports.getCompany = function (req, res) {
    jwt.verify(req.token, 'securtykey', function (error, decoded) {
        if (error) {
            res.send({ Token: "token is not correct", error: error.message })
        }
        else {
            companyDetailsSchem.find({}, function (err, suc) {
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
                                        "description": "not found"
                                    }
                                ]
                            }
                        }
                    );
                }

            }).populate("product")

        }
    });

};

exports.postCompany = function (req, res) {
    jwt.verify(req.token, 'securtykey', function (error, decoded) {
        if (error) {
            res.send({ Token: "token is not correct", error: error.message })
        }
        else {
            companyDetailsSchem.insertMany(req.body,
                function (err, suc) {
                    if (suc) {
                        res.status(200).json({ message: "User added successfully", decoded });
                    } else {
                        res.status(300).send({ message: "unable to save the User into database" });
                    }
                }
            );

        }
    });


};





// exports.getCategorty = function (req, res) {
//     jwt.verify(req.token, 'securtykey', function (error, decoded) {
//         if (error) {
//             res.send({ Token: "token is not correct", error: error.message })
//         }
//         else {
//             userDetailSchem.find({}, function (err, suc) {
//                 if (suc) {
//                     res.send({
//                         "message": "Request Completed Successfully",
//                         "data": {
//                             "responseData": suc
//                         },
//                         "status": "SUCCESS"
//                     });
//                 } else {
//                     res.send(
//                         {
//                             "message": "error",
//                             "errors": {
//                                 "error": [
//                                     {
//                                         "code": "unable to get data from database",
//                                         "description": "not found"
//                                     }
//                                 ]
//                             }
//                         }
//                     );
//                 }

//             }).populate("product").populate("company")

//         }
//     });

// };

// exports.postCategorty = function (req, res) {
//     jwt.verify(req.token, 'securtykey', function (error, decoded) {
//         if (error) {
//             res.send({ Token: "token is not correct", error: error.message })
//         }
//         else {
//             userDetailSchem.insertMany(req.body,
//                 function (err, suc) {
//                     if (suc) {
//                         res.status(200).json({ message: "User added successfully", decoded });
//                     } else {
//                         res.status(300).send({ message: "unable to save the User into database" });
//                     }
//                 }
//             );

//         }
//     });


// };
