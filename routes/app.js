const userDetailSchem = require('../models/userDetails');
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
exports.getUserdata = function (req, res) {
    userDetailSchem.find({}, function (err, suc) {
        res.send(suc);
    });
};

exports.postUserdata = function (req, res) {
    console.log(req.body)
    jwt.verify(req.token, 'securtykey', function (error, decoded) {
        if (error) { res.sendStatus(403) }
        else {
            userDetailSchem.insertMany(req.body,
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



