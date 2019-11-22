const postQueries = require("../model/postmodel");

const postMethod = {
  addPost(req, res) {
    console.log(req.body)
    if (req.body.title != null && req.body.description != null) {
      postQueries
        .create({
          user_id: req.user._id,
          title: req.body.title,
          description: req.body.description
        })
        .then(result => {
          return res.json({
            data: [],
            success: 1,
            msg: "Post added successfully."
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return res.json({
        data: [],
        success: 0,
        msg: "Fill the above field"
      });
    }
  },
  viewPost(req, res) {
    postQueries
      .find({ user_id: req.user._id}).sort({_id:-1})
      .then(result => {
        if (result.length != 0) {
          return res.json({
            data: result,
            success: 1,
            msg: "Users all post displayed"
          });
        } else {
          return res.json({
            data: [],
            success: 0,
            msg: "no post found"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  viewPostId(req, res) {
    postQueries
      .find({ _id: req.body.id })
      .then(result => {
        if (result.length != 0) {
          return res.json({
            data: result,
            success: 1,
            msg: "Users perticular post with id displayed"
          });
        } else {
          return res.json({
            data: [],
            success: 0,
            msg: "no post found with this id"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  updatePost(req, res) {
    postQueries
      .find({ _id: req.body.id })
      .then(result => {
        if (result.length != 0) {
          postQueries
            .updateOne(
              { _id: req.body.id },
              {
                user_id: req.user._id,
                title: req.body.title,
                description: req.body.description
              }
            )
            .then(result => {
              return res.json({
                data: [],
                success: 1,
                msg: "Post update succesfully"
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return res.json({
            data: [],
            success: 0,
            msg: "no post found with this id"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  removePost(req, res) {
    postQueries
      .remove({ _id: req.body.id })
      .then(result => {
        return res.json({
          data: [],
          success: 1,
          msg: "Post deleted successfully"
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  viewAllPost(req, res) {
    postQueries
      .find({}).sort({user_id:-1})
      .then(result => {
        if (result.length != 0) {
          return res.json({
            data: result,
            success: 1,
            msg: "All Users posts founds"
          });
        } else {
          return res.json({
            data: [],
            success: 0,
            msg: "no post found with this id"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
module.exports = postMethod;
