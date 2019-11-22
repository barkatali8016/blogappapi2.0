const mongoose = require('mongoose');

//ejob here a db name
mongoose.connect('mongodb://localhost:27017/ejob', {useNewUrlParser: true},(err) => {
    if(err) throw err;
    console.log('MongoDB is connected');
});