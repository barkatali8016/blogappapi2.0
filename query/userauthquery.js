const userQueries = require('../model/usermodel');

const UserMethods = {
    profile(req, res) {
        userQueries.find({ _id:req.user._id })
            .then(result => {
                return res.json({
                    data: result,
                    success: 1,
                    msg: 'profile Details Generated'
                })
            })
            .catch(err => {
                console.log(err);
            });
    },

    profileUpdate(req, res) {
        userObj = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
        }
        userQueries.find({ email: userObj.email, _id: req.user._id })
            .then(result => {
                if (result.length != 0) {
                    userQueries.updateOne({ _id: req.user._id }, userQueries)
                        .then(result => {
                            return res.json({
                                data: [],
                                success: 1,
                                msg: 'Profile Update Successfully.'
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    userQueries.find({ email: userObj.email })
                        .then(result => {
                            if (result.length != 0) {
                                return res.json({
                                    data: [],
                                    success: 0,
                                    msg: 'Email-Id is already registered '
                                });
                            } else {
                                userQueries.updateOne({ _id: req.user._id }, userObj)
                                    .then(result => {
                                        return res.json({
                                            data: [],
                                            success: 1,
                                            msg: 'Profile Update Successfully.'
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports=UserMethods;